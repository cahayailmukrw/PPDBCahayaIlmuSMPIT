import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    // Read the schema.sql file
    const schemaPath = join(process.cwd(), 'schema.sql');
    const schema = readFileSync(schemaPath, 'utf-8');
    
    // Split by semicolon and execute each statement
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));
    
    for (const statement of statements) {
      if (statement.includes('CREATE TABLE') || statement.includes('INSERT INTO')) {
        await pool.query(statement);
      }
    }
    
    return NextResponse.json({ success: true, message: 'Database setup completed' });
  } catch (error) {
    console.error('Error during setup:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Setup failed' 
    }, { status: 500 });
  }
}
