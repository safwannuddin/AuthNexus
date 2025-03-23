import { createClient } from '@supabase/supabase-js'
import type { VerificationMethod, VerificationRecord } from '@/types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function createVerificationRecord(
  userId: string, 
  method: VerificationMethod
): Promise<{ data: VerificationRecord | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('verification_records')
      .insert([
        {
          user_id: userId,
          method,
          status: 'pending'
        }
      ])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error creating verification record:', error)
    return { data: null, error: error as Error }
  }
}

export async function getVerificationStatus(userId: string) {
  const { data, error } = await supabase
    .from('verification_records')
    .select()
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  return { data, error }
}