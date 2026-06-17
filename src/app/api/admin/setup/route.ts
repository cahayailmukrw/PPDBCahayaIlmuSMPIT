import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Create admins table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert admin credentials
    await pool.query(`
      INSERT INTO admins (username, password) 
      VALUES ('cahayailmukrw', 'camucaang')
      ON CONFLICT (username) DO UPDATE SET password = EXCLUDED.password
    `);

    return NextResponse.json({ success: true, message: 'Database setup completed' });
  } catch (error) {
    console.error('Error during setup:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Setup failed'
    }, { status: 500 });
  }
}
