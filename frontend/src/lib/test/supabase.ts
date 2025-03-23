import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

export const testSupabase = createClient<Database>(
  process.env.TEST_SUPABASE_URL ?? 'http://localhost:54321',
  process.env.TEST_SUPABASE_ANON_KEY ?? 'test-key'
)