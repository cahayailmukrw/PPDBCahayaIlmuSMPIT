import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    console.log('Starting database setup...');

    // Create admins table
    console.log('Creating admins table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Admins table created successfully');

    // Insert admin credentials
    console.log('Inserting admin credentials...');
    await pool.query(`
      INSERT INTO admins (username, password) 
      VALUES ('cahayailmukrw', 'camucaang')
      ON CONFLICT (username) DO UPDATE SET password = EXCLUDED.password
    `);
    console.log('Admin credentials inserted successfully');

    // Verify the table was created
    const checkResult = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'admins'
      )
    `);
    console.log('Table exists check:', checkResult.rows[0].exists);

    // Verify the admin user was inserted
    const adminCheck = await pool.query(`
      SELECT * FROM admins WHERE username = 'cahayailmukrw'
    `);
    console.log('Admin user check:', adminCheck.rows.length > 0 ? 'Found' : 'Not found');

    return NextResponse.json({
      success: true,
      message: 'Database setup completed',
      tableExists: checkResult.rows[0].exists,
      adminExists: adminCheck.rows.length > 0
    });
  } catch (error) {
    console.error('Error during setup:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Setup failed',
      details: error instanceof Error ? error.stack : 'No details'
    }, { status: 500 });
  }
}
