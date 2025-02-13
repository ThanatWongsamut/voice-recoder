import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    // Get or create client ID
    const cookieStore = await cookies();
    let clientId = cookieStore.get('clientid')?.value;

    if (!clientId) {
      clientId = uuidv4();
      // Set cookie for 24 hours
      cookieStore.set('clientid', clientId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
      });
    }

    // Get passages
    const passages = [
      {
        id: '1',
        text: 'The quick brown fox jumps over the lazy dog.',
      }
    ];

    return NextResponse.json(
      { success: true, data: passages },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, must-revalidate',
        },
      }
    );
  } catch (error) {
    console.error('Error in GET /api/passages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch passages' },
      { status: 500 }
    );
  }
}