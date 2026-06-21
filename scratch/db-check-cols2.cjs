const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gbwcwnjkjltkofsxuefc.supabase.co';
const supabaseAnonKey = 'sb_publishable_4ccowT1IQf9pOkbw_Z98Ww_v4HN-ryC';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkInvoiceDate() {
  const { error } = await supabase.from('bills').select('invoice_date').limit(1);
  const exists = !error || error.code !== '42703';
  console.log(`bills.invoice_date exists: ${exists ? '✅ YES' : '❌ NO'} ${error ? `(code: ${error.code})` : ''}`);
}

checkInvoiceDate();
