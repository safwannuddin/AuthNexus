import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wyymucpxpnynoqmrjbtb.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5eW11Y3B4cG55bm9xbXJqYnRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1Nzg3ODcsImV4cCI6MjA1ODE1NDc4N30.2CWXWJHIjasZEJPM7oTWHUYYzeqMhoVim85bv2GIPAk'

export const supabase = createClient(supabaseUrl, supabaseKey)