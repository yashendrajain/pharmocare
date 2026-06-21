const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gbwcwnjkjltkofsxuefc.supabase.co';
const supabaseAnonKey = 'sb_publishable_4ccowT1IQf9pOkbw_Z98Ww_v4HN-ryC';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkColumns() {
  console.log("Checking columns of bills and payments...");
  
  // Let's try to query bills with different common column names to see what fails or succeeds
  const { data: billsData, error: billsError } = await supabase.from('bills').select('*').limit(1);
  console.log("Bills fetch:", { data: billsData, error: billsError });
  
  const { data: paymentsData, error: paymentsError } = await supabase.from('payments').select('*').limit(1);
  console.log("Payments fetch:", { data: paymentsData, error: paymentsError });

  // Let's check firms as well
  const { data: firmsData, error: firmsError } = await supabase.from('firms').select('*').limit(1);
  console.log("Firms fetch:", { data: firmsData, error: firmsError });
}

checkColumns();
