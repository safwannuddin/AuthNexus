import { supabase } from '@/lib/supabase'

describe('Verification Tests', () => {
  let testUserId: string

  // Run before all tests
  beforeAll(async () => {
    // Create test user
    const { data } = await supabase
      .from('users')
      .insert([{
        first_name: 'Test',
        last_name: 'User',
        email: `test${Date.now()}@example.com`,
        company: 'Test Co'
      }])
      .select()
      .single()

    testUserId = data?.id
  })

  // Clean up after all tests
  afterAll(async () => {
    if (testUserId) {
      await supabase.from('verification_records').delete().eq('user_id', testUserId)
      await supabase.from('users').delete().eq('id', testUserId)
    }
  })

  it('should create verification record', async () => {
    const verificationData = {
      user_id: testUserId,
      method: 'DOCUMENT' as const,
      status: 'PENDING' as const,
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
    expect(data?.method).toBe('DOCUMENT')
  })
})