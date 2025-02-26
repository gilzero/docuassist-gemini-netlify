import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { convertDocToDocx } from '@/utils/documentConverter';
import { DropzoneContent } from './DropzoneContent';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

export const FileUpload = ({ onFileSelect, isProcessing }: FileUploadProps) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  const handleDocConversion = async (file: File) => {
    setIsConverting(true);
    try {
      const convertedFile = await convertDocToDocx(file);
      toast.success('Successfully converted .doc to .docx');
      return convertedFile;
    } catch (error) {
      toast.error('Failed to convert .doc file. Please try uploading a .docx file instead.');
      throw error;
    } finally {
      setIsConverting(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    const fileType = file.name.split('.').pop()?.toLowerCase();
    if (!['doc', 'docx', 'pdf'].includes(fileType || '')) {
      toast.error('Please upload a .doc, .docx, or .pdf file');
      return;
    }

    try {
      const finalFile = fileType === 'doc' ? await handleDocConversion(file) : file;
      onFileSelect(finalFile);
    } catch (error) {
      console.error('File processing error:', error);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: false
  });

  const isDisabled = isProcessing || isConverting;

  return (
    <div
      {...getRootProps()}
      className={`
        relative rounded-lg border-2 border-dashed p-8 transition-all duration-200
        ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 dark:border-gray-600'}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary/50'}
      `}
    >
      <input {...getInputProps()} disabled={isDisabled} />
      <div className="flex flex-col items-center gap-4 text-center">
        <DropzoneContent isProcessing={isProcessing} isConverting={isConverting} />
      </div>
    </div>
  );
};