/**
 * Database type definitions for Supabase schema
 */
export type Database = {
    public: {
      Tables: {
        users: {
          Row: {
            id: string
            first_name: string
            last_name: string
            email: string
            company: string | null
            phone: string | null
            created_at: string
            updated_at: string
          }
          Insert: {
            first_name: string
            last_name: string
            email: string
            company?: string
            phone?: string
          }
          Update: {
            first_name?: string
            last_name?: string
            company?: string
            phone?: string
          }
        }
        verification_records: {
          Row: {
            id: string
            user_id: string
            method: 'DOCUMENT' | 'BIOMETRIC' | 'SELFIE'
            status: 'PENDING' | 'APPROVED' | 'REJECTED'
            metadata: { [key: string]: unknown }
            created_at: string
            updated_at: string
          }
          Insert: {
            user_id: string
            method: 'DOCUMENT' | 'BIOMETRIC' | 'SELFIE'
            status?: 'PENDING' | 'APPROVED' | 'REJECTED'
            metadata?: { [key: string]: unknown }
          }
          Update: {
            status?: 'PENDING' | 'APPROVED' | 'REJECTED'
            metadata?: { [key: string]: unknown }
          }
        }
      }
    }
  }
