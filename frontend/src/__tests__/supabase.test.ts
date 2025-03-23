import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database'

describe('Supabase Integration Tests', () => {
  let testUserId: string

  test('should create a user', async () => {
    const testUser: Database['public']['Tables']['users']['Insert'] = {
      first_name: 'Test',
      last_name: 'User',
      email: `test${Date.now()}@example.com`,
      company: 'Test Co'
    }

    const { data, error } = await supabase
      .from('users')
      .insert([testUser])
      .select()
      .single()

    expect(error).toBeNull()
    expect(data).toBeTruthy()
    testUserId = data.id
  })

  test('should create verification record', async () => {
    const verificationData: Database['public']['Tables']['verification_records']['Insert'] = {
      user_id: testUserId,
      method: 'DOCUMENT',
      status: 'PENDING',
      metadata: {
        documentType: 'passport',
        timestamp: new Date().toISOString()
      }
    }

    const { data, error } = await supabase
      .from('verification_records')
      .insert([verificationData])
      .select()
      .single()

    expect(error).toBeNull()
    expect(data).toBeTruthy()
    expect(data.method).toBe('DOCUMENT')
  })

  // Cleanup after tests
  afterAll(async () => {
    if (testUserId) {
      await supabase.from('verification_records').delete().eq('user_id', testUserId)
      await supabase.from('users').delete().eq('id', testUserId)
    }
  })
})