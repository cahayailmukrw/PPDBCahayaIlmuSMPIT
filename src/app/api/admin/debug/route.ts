import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const result = await pool.query('SELECT id, username, created_at FROM admins');
    return NextResponse.json({ success: true, admins: result.rows });
  } catch (error) {
    console.error('Error fetching admins:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch admins' 
    }, { status: 500 });
  }
}
