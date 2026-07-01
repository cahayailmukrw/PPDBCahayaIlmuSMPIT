import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

const defaultPPDBInfo = {
  academic_year: '2026/2027',
  quota: '100 Siswa',
  registration_period: '1 Januari - 30 Juni 2026',
  status: 'Dibuka',
  requirements: 'Kartu Keluarga\nAkta Lahir\nPas Foto 3x4\nRapor SD/MI kelas 4-6\nSurat Keterangan Sehat',
  registration_flow: '1. Isi formulir pendaftaran online\n2. Upload dokumen yang diperlukan\n3. Dapatkan nomor pendaftaran\n4. Tunggu pengumuman hasil seleksi',
};

async function ensurePPDBInfoTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS ppdb_info (
      id SERIAL PRIMARY KEY,
      academic_year VARCHAR(50) NOT NULL DEFAULT '',
      quota VARCHAR(100) NOT NULL DEFAULT '',
      registration_period VARCHAR(255) NOT NULL DEFAULT '',
      status VARCHAR(100) NOT NULL DEFAULT '',
      requirements TEXT NOT NULL DEFAULT '',
      registration_flow TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    INSERT INTO ppdb_info (
      academic_year,
      quota,
      registration_period,
      status,
      requirements,
      registration_flow
    )
    SELECT $1, $2, $3, $4, $5, $6
    WHERE NOT EXISTS (SELECT 1 FROM ppdb_info)
  `, [
    defaultPPDBInfo.academic_year,
    defaultPPDBInfo.quota,
    defaultPPDBInfo.registration_period,
    defaultPPDBInfo.status,
    defaultPPDBInfo.requirements,
    defaultPPDBInfo.registration_flow,
  ]);
}

export async function GET() {
  try {
    await ensurePPDBInfoTable();

    const result = await pool.query(
      'SELECT * FROM ppdb_info ORDER BY id DESC LIMIT 1'
    );

    return NextResponse.json({
      success: true,
      ppdbInfo: result.rows[0] || { id: null, ...defaultPPDBInfo },
    });
  } catch (error) {
    console.error('Error fetching PPDB info:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch PPDB info' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await ensurePPDBInfoTable();

    const data = await request.json();
    const { academic_year, quota, registration_period, status, requirements, registration_flow } = data;

    const existing = await pool.query(
      'SELECT * FROM ppdb_info ORDER BY id DESC LIMIT 1'
    );

    const result = existing.rows[0]
      ? await pool.query(
          `
            UPDATE ppdb_info
            SET academic_year = $1,
                quota = $2,
                registration_period = $3,
                status = $4,
                requirements = $5,
                registration_flow = $6,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $7
            RETURNING *
          `,
          [
            academic_year ?? defaultPPDBInfo.academic_year,
            quota ?? defaultPPDBInfo.quota,
            registration_period ?? defaultPPDBInfo.registration_period,
            status ?? defaultPPDBInfo.status,
            requirements ?? defaultPPDBInfo.requirements,
            registration_flow ?? defaultPPDBInfo.registration_flow,
            existing.rows[0].id,
          ]
        )
      : await pool.query(
          `
            INSERT INTO ppdb_info (
              academic_year,
              quota,
              registration_period,
              status,
              requirements,
              registration_flow,
              updated_at
            )
            VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
            RETURNING *
          `,
          [
            academic_year ?? defaultPPDBInfo.academic_year,
            quota ?? defaultPPDBInfo.quota,
            registration_period ?? defaultPPDBInfo.registration_period,
            status ?? defaultPPDBInfo.status,
            requirements ?? defaultPPDBInfo.requirements,
            registration_flow ?? defaultPPDBInfo.registration_flow,
          ]
        );

    return NextResponse.json({ success: true, ppdbInfo: result.rows[0] });
  } catch (error) {
    console.error('Error updating PPDB info:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update PPDB info' },
      { status: 500 }
    );
  }
}
