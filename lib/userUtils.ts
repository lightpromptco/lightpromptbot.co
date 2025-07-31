import { supabase } from './supabaseClient'

export async function getUserTier(userId: string): Promise<'free' | 'paid'> {
  // Example: fetch from Supabase profile table
  const { data, error } = await supabase
    .from('profiles')
    .select('tier')
    .eq('id', userId)
    .single()
  if (error || !data) return 'free'
  return data.tier as 'free' | 'paid'
}