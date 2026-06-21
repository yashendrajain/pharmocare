const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gbwcwnjkjltkofsxuefc.supabase.co';
const supabaseAnonKey = 'sb_publishable_4ccowT1IQf9pOkbw_Z98Ww_v4HN-ryC';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testRelationalQuery() {
  console.log("Testing relational query on bills and payments...");
  
  const { data: bills, error: billsError } = await supabase
    .from('bills')
    .select('id, grand_total, invoice_date, firms(firm_name)')
    .limit(1);
    
  console.log("Bills relational query result:", { data: bills, error: billsError });

  const { data: payments, error: paymentsError } = await supabase
    .from('payments')
    .select('id, payment_amount, payment_date, firms(firm_name)')
    .limit(1);
    
  console.log("Payments relational query result:", { data: payments, error: paymentsError });
}

testRelationalQuery();
