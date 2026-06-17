import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const result = await pool.query(
      'SELECT * FROM registrations ORDER BY created_at DESC'
    );
    
    return NextResponse.json({ success: true, registrations: result.rows });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch registrations' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json();
    
    const result = await pool.query(
      'UPDATE registrations SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    
    return NextResponse.json({ success: true, registration: result.rows[0] });
  } catch (error) {
    console.error('Error updating registration status:', error);
    return NextResponse.json({ success: false, error: 'Failed to update registration' }, { status: 500 });
  }
}
