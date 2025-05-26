import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kewzlxvycligghyzttnh.supabase.co'; // ← skift til din Supabase URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtld3pseHZ5Y2xpZ2doeXp0dG5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NDg3MzQsImV4cCI6MjA1ODQyNDczNH0.cJQo2WoEFAUIn47dr2EPkho6wJe9yUDhujxUS2yOSGA'; // ← skift til din anon public key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
