import { supabase } from '@/lib/supabase'
import type { VerificationMethod, VerificationRecord } from '@/types'

export async function createVerificationRecord(
  userId: string,
  method: VerificationMethod,
  metadata: Record<string, unknown>
): Promise<VerificationRecord> {
  try {
    const { data, error } = await supabase
      .from('verification_records')
      .insert([
        {
          user_id: userId,
          method,
          status: 'PENDING',
          metadata
        }
      ])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (err) {
    console.error('Error creating verification record:', err)
    throw err
  }
}