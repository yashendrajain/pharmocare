import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gbwcwnjkjltkofsxuefc.supabase.co';
const supabaseAnonKey = 'sb_publishable_4ccowT1IQf9pOkbw_Z98Ww_v4HN-ryC';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
