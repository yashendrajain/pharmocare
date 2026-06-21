const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gbwcwnjkjltkofsxuefc.supabase.co';
const supabaseAnonKey = 'sb_publishable_4ccowT1IQf9pOkbw_Z98Ww_v4HN-ryC';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const billCols = [
  'id', 'user_id', 'firm_id', 'bill_number', 'invoice_number', 'date', 
  'bill_date', 'grand_total', 'amount', 'image_url', 'created_at', 
  'status', 'notes', 'outstanding_balance', 'gst_number'
];

const paymentCols = [
  'id', 'user_id', 'firm_id', 'payment_amount', 'amount', 'date', 
  'payment_date', 'payment_mode', 'reference', 'reference_number', 
  'image_url', 'created_at', 'status', 'notes', 'remarks'
];

const firmCols = [
  'id', 'user_id', 'firm_name', 'gst_number', 'phone', 'address', 
  'outstanding_balance', 'created_at', 'email'
];

async function probeColumns() {
  console.log("Probing columns for 'firms'...");
  for (const col of firmCols) {
    const { error } = await supabase.from('firms').select(col).limit(1);
    const exists = !error || error.code !== '42703';
    console.log(`  - firms.${col}: ${exists ? '✅ YES' : '❌ NO'} ${error ? `(code: ${error.code})` : ''}`);
  }

  console.log("\nProbing columns for 'bills'...");
  for (const col of billCols) {
    const { error } = await supabase.from('bills').select(col).limit(1);
    const exists = !error || error.code !== '42703';
    console.log(`  - bills.${col}: ${exists ? '✅ YES' : '❌ NO'} ${error ? `(code: ${error.code})` : ''}`);
  }

  console.log("\nProbing columns for 'payments'...");
  for (const col of paymentCols) {
    const { error } = await supabase.from('payments').select(col).limit(1);
    const exists = !error || error.code !== '42703';
    console.log(`  - payments.${col}: ${exists ? '✅ YES' : '❌ NO'} ${error ? `(code: ${error.code})` : ''}`);
  }
}

probeColumns();
