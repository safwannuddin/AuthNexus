import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { documentId } = await request.json();

    // Create initial verification record
    const { data, error: verificationError } = await supabase
      .from('verifications')
      .insert([
        {
          document_id: documentId,
          status: 'pending',
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (verificationError) {
      throw verificationError;
    }

    return NextResponse.json({
      success: true,
      data: {
        id: data.id,
        status: data.status,
        document_id: data.document_id,
        created_at: data.created_at
      }
    });

  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Verification initiation failed' },
      { status: 500 }
    );
  }
}
