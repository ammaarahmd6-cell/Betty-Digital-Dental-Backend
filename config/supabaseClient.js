import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.warn('Supabase credentials are missing. Add them to server/.env before using database features.');
}

export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', serviceRoleKey || 'placeholder-key', {
  auth: { persistSession: false }
});

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  serviceRoleKey &&
  !supabaseUrl.includes('your_') &&
  !serviceRoleKey.includes('your_') &&
  !serviceRoleKey.includes('placeholder')
);
