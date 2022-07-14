// @TODO: Hide env variables in your preferable way (.env.local?)

import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://zaouunfprfpzdnddgkln.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inphb3V1bmZwcmZwemRuZGRna2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM5MDM0NDUsImV4cCI6MTk2OTQ3OTQ0NX0.Lk7n6b-mGVVLClp5aUOWygRwr4OErewcmd_NJPwJv2E'
);
/* table realtime_stats
id, created_at, total_minted 
*/
export const getTotalMintedCount = async () => {
  // get total number of mints from mint_stats table
  const { data, error } = await supabase
    .from('mint_stats')
    .select('id')
    .single();
  console.log(`returned mint stats:: ${data}`);
  return data;
};

// order_in_minting: yields the number of tokends minted so far: eg. cryptoPunk # 10
export const addMintStat = async (walletAddress, tokenId, orderInMinting) => {
  // await supabase
  //   .from("mint_stats")
  //   .insert({
  //     wallet_address: wallet_address,
  //     token_id: token_id,
  //     order_in_minting, order_in_minting,
  //   });

  const { data, error } = await supabase.from('mint_stats').insert([
    {
      wallet_address: walletAddress,
      token_id: tokenId,
      order_in_minting: orderInMinting
    }
  ]);
};

/* table mint_attempts
id, created_at, mint_status, minter, 
*/
export const getAllMintStats = () => {
  supabase.from('all_stats').select('mint_status');
};
