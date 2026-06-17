import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    console.log('Login attempt with username:', username);

    // First, check if user exists
    const userCheck = await pool.query(
      'SELECT * FROM admins WHERE username = $1',
      [username]
    );

    console.log('User check result:', userCheck.rows.length > 0 ? 'User found' : 'User not found');

    if (userCheck.rows.length === 0) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 401 });
    }

    const user = userCheck.rows[0];
    console.log('Stored password:', user.password);
    console.log('Provided password:', password);

    // Check password
    if (user.password !== password) {
      return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
    }

    return NextResponse.json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Login failed' }, { status: 500 });
  }
}
