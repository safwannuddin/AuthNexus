import { supabase } from '@/lib/supabase'

describe('Verification Flow Tests', () => {
  const uniqueEmail = `test${Date.now()}@example.com`
  
  test('should create new user', async () => {
    const testUser = {
      first_name: 'Test',
      last_name: 'User',
      email: uniqueEmail,
      company: 'Test Co',
      phone: '+1234567890'
    }

    const { data, error } = await supabase
      .from('users')
      .insert([testUser])
      .select()
      .single()

    expect(error).toBeNull()
    expect(data).toBeTruthy()
    expect(data.email).toBe(uniqueEmail)
  })

  test('should create verification record', async () => {
    // Get the user first
    const { data: user } = await supabase
      .from('users')
      .select()
      .eq('email', uniqueEmail)
      .single()

    const verificationData = {
      user_id: user.id,
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

  // Clean up after tests
  afterAll(async () => {
    const { data: userData } = await supabase.from('users').select('id').eq('email', uniqueEmail).single()
    if (!userData) throw new Error('User not found')
    
    await supabase
      .from('verification_records')
      .delete()
      .eq('user_id', userData.id)

    await supabase
      .from('users')
      .delete()
      .eq('email', uniqueEmail)
  })
})