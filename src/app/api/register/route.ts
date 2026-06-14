import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      registration_number,
      namaLengkap, nisn, nik, tempatLahir, tanggalLahir, jenisKelamin, agama,
      anakKe, jumlahSaudara, golonganDarah, tinggiBadan, beratBadan, riwayatPenyakit, hobi, citaCita,
      alamat, rt, rw, kelurahan, kecamatan, kabupaten, provinsi, kodePos,
      namaSekolahAsal, alamatSekolahAsal, npsnSekolahAsal, tahunLulus,
      namaAyah, nikAyah, tempatLahirAyah, tanggalLahirAyah, pekerjaanAyah, pendidikanAyah, penghasilanAyah, noHpAyah, alamatKantorAyah,
      namaIbu, nikIbu, tempatLahirIbu, tanggalLahirIbu, pekerjaanIbu, pendidikanIbu, penghasilanIbu, noHpIbu, alamatKantorIbu,
      punyaWali, namaWali, hubunganWali, pekerjaanWali, noHpWali, alamatWali,
      kartuKeluarga, aktaKelahiran, raporSD, pasFoto, suratKeteranganSehat, ijazahSD
    } = body;
    
    const query = `
      INSERT INTO registrations (
        registration_number,
        nama_lengkap, nisn, nik, tempat_lahir, tanggal_lahir, jenis_kelamin, agama,
        anak_ke, jumlah_saudara, golongan_darah, tinggi_badan, berat_badan, riwayat_penyakit, hobi, cita_cita,
        alamat, rt, rw, kelurahan, kecamatan, kabupaten, provinsi, kode_pos,
        nama_sekolah_asal, alamat_sekolah_asal, npsn_sekolah_asal, tahun_lulus,
        nama_ayah, nik_ayah, tempat_lahir_ayah, tanggal_lahir_ayah, pekerjaan_ayah, pendidikan_ayah, penghasilan_ayah, no_hp_ayah, alamat_kantor_ayah,
        nama_ibu, nik_ibu, tempat_lahir_ibu, tanggal_lahir_ibu, pekerjaan_ibu, pendidikan_ibu, penghasilan_ibu, no_hp_ibu, alamat_kantor_ibu,
        punya_wali, nama_wali, hubungan_wali, pekerjaan_wali, no_hp_wali, alamat_wali,
        kartu_keluarga, akta_kelahiran, rapor_sd, pas_foto, surat_keterangan_sehat, ijazah_sd
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,
        $17, $18, $19, $20, $21, $22, $23, $24,
        $25, $26, $27, $28,
        $29, $30, $31, $32, $33, $34, $35, $36, $37,
        $38, $39, $40, $41, $42, $43, $44, $45, $46,
        $47, $48, $49, $50, $51, $52,
        $53, $54, $55, $56, $57, $58
      )
    `;
    
    const values = [
      registration_number,
      namaLengkap, nisn, nik, tempatLahir, tanggalLahir, jenisKelamin, agama,
      anakKe || null, jumlahSaudara, golonganDarah || null, tinggiBadan || null, beratBadan || null, riwayatPenyakit || null, hobi || null, citaCita || null,
      alamat, rt || null, rw || null, kelurahan, kecamatan, kabupaten, provinsi, kodePos,
      namaSekolahAsal, alamatSekolahAsal, npsnSekolahAsal || null, tahunLulus,
      namaAyah, nikAyah, tempatLahirAyah || null, tanggalLahirAyah || null, pekerjaanAyah, pendidikanAyah, penghasilanAyah, noHpAyah, alamatKantorAyah || null,
      namaIbu, nikIbu, tempatLahirIbu || null, tanggalLahirIbu || null, pekerjaanIbu, pendidikanIbu, penghasilanIbu, noHpIbu, alamatKantorIbu || null,
      punyaWali, namaWali || null, hubunganWali || null, pekerjaanWali || null, noHpWali || null, alamatWali || null,
      kartuKeluarga || null, aktaKelahiran || null, raporSD || null, pasFoto || null, suratKeteranganSehat || null, ijazahSD || null
    ];
    
    await pool.query(query, values);
    
    return NextResponse.json({ success: true, registration_number });
  } catch (error) {
    console.error('Error saving registration:', error);
    return NextResponse.json({ success: false, error: 'Failed to save registration' }, { status: 500 });
  }
}
