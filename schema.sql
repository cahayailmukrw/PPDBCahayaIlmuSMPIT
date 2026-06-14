-- Create tables for PPDB SMPIT Cahaya Ilmu

-- Table for student registrations
CREATE TABLE IF NOT EXISTS registrations (
    id SERIAL PRIMARY KEY,
    registration_number VARCHAR(20) UNIQUE NOT NULL,
    
    -- Data Siswa
    nama_lengkap VARCHAR(255) NOT NULL,
    nisn VARCHAR(20) NOT NULL,
    nik VARCHAR(20) NOT NULL,
    tempat_lahir VARCHAR(100) NOT NULL,
    tanggal_lahir DATE NOT NULL,
    jenis_kelamin VARCHAR(10) NOT NULL,
    agama VARCHAR(20) NOT NULL,
    anak_ke INTEGER,
    jumlah_saudara INTEGER NOT NULL,
    golongan_darah VARCHAR(5),
    tinggi_badan INTEGER,
    berat_badan INTEGER,
    riwayat_penyakit TEXT,
    hobi VARCHAR(255),
    cita_cita VARCHAR(255),
    
    -- Alamat
    alamat TEXT NOT NULL,
    rt VARCHAR(10),
    rw VARCHAR(10),
    kelurahan VARCHAR(100) NOT NULL,
    kecamatan VARCHAR(100) NOT NULL,
    kabupaten VARCHAR(100) NOT NULL,
    provinsi VARCHAR(100) NOT NULL,
    kode_pos VARCHAR(10) NOT NULL,
    
    -- Data Sekolah Asal
    nama_sekolah_asal VARCHAR(255) NOT NULL,
    alamat_sekolah_asal TEXT NOT NULL,
    npsn_sekolah_asal VARCHAR(20),
    tahun_lulus INTEGER NOT NULL,
    
    -- Data Ayah
    nama_ayah VARCHAR(255) NOT NULL,
    nik_ayah VARCHAR(20) NOT NULL,
    tempat_lahir_ayah VARCHAR(100),
    tanggal_lahir_ayah DATE,
    pekerjaan_ayah VARCHAR(100) NOT NULL,
    pendidikan_ayah VARCHAR(20) NOT NULL,
    penghasilan_ayah VARCHAR(50) NOT NULL,
    no_hp_ayah VARCHAR(20) NOT NULL,
    alamat_kantor_ayah TEXT,
    
    -- Data Ibu
    nama_ibu VARCHAR(255) NOT NULL,
    nik_ibu VARCHAR(20) NOT NULL,
    tempat_lahir_ibu VARCHAR(100),
    tanggal_lahir_ibu DATE,
    pekerjaan_ibu VARCHAR(100) NOT NULL,
    pendidikan_ibu VARCHAR(20) NOT NULL,
    penghasilan_ibu VARCHAR(50) NOT NULL,
    no_hp_ibu VARCHAR(20) NOT NULL,
    alamat_kantor_ibu TEXT,
    
    -- Data Wali (opsional)
    punya_wali BOOLEAN DEFAULT FALSE,
    nama_wali VARCHAR(255),
    hubungan_wali VARCHAR(50),
    pekerjaan_wali VARCHAR(100),
    no_hp_wali VARCHAR(20),
    alamat_wali TEXT,
    
    -- Dokumen paths (will store file paths/URLs)
    kartu_keluarga TEXT,
    akta_kelahiran TEXT,
    rapor_sd TEXT,
    pas_foto TEXT,
    surat_keterangan_sehat TEXT,
    ijazah_sd TEXT,
    
    -- Status
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_registrations_registration_number ON registrations(registration_number);
CREATE INDEX IF NOT EXISTS idx_registrations_nisn ON registrations(nisn);
CREATE INDEX IF NOT EXISTS idx_registrations_nik ON registrations(nik);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON registrations(status);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_registrations_updated_at BEFORE UPDATE ON registrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
