// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dxrfbyfdiusjawpplzen.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4cmZieWZkaXVzamF3cHBsemVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzNzgxNDgsImV4cCI6MjA1MDk1NDE0OH0.buqfWTb3QbmudZPyIvpBfaIMkR0aFSaNNzLebSKwp6o";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);