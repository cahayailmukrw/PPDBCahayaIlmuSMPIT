'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    // Data Siswa
    namaLengkap: '',
    nisn: '',
    nik: '',
    tempatLahir: '',
    tanggalLahir: '',
    jenisKelamin: '',
    agama: '',
    anakKe: '',
    jumlahSaudara: '',
    golonganDarah: '',
    tinggiBadan: '',
    beratBadan: '',
    riwayatPenyakit: '',
    hobi: '',
    citaCita: '',
    alamat: '',
    rt: '',
    rw: '',
    kelurahan: '',
    kecamatan: '',
    kabupaten: '',
    provinsi: '',
    kodePos: '',

    // Data Sekolah Asal
    namaSekolahAsal: '',
    alamatSekolahAsal: '',
    npsnSekolahAsal: '',
    tahunLulus: '',

    // Data Ayah
    namaAyah: '',
    nikAyah: '',
    tempatLahirAyah: '',
    tanggalLahirAyah: '',
    pekerjaanAyah: '',
    pendidikanAyah: '',
    penghasilanAyah: '',
    noHpAyah: '',
    alamatKantorAyah: '',

    // Data Ibu
    namaIbu: '',
    nikIbu: '',
    tempatLahirIbu: '',
    tanggalLahirIbu: '',
    pekerjaanIbu: '',
    pendidikanIbu: '',
    penghasilanIbu: '',
    noHpIbu: '',
    alamatKantorIbu: '',

    // Data Wali (opsional)
    punyaWali: false,
    namaWali: '',
    hubunganWali: '',
    pekerjaanWali: '',
    noHpWali: '',
    alamatWali: '',

    // Dokumen Upload
    kartuKeluarga: null as File | null,
    aktaKelahiran: null as File | null,
    raporSD: null as File | null,
    pasFoto: null as File | null,
    suratKeteranganSehat: null as File | null,
    ijazahSD: null as File | null,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Generate random registration number
      const regNum = 'SMPIT-' + Math.random().toString(36).substr(2, 9).toUpperCase();

      // Send data to API route
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registration_number: regNum,
          ...formData,
          kartuKeluarga: formData.kartuKeluarga?.name || null,
          aktaKelahiran: formData.aktaKelahiran?.name || null,
          raporSD: formData.raporSD?.name || null,
          pasFoto: formData.pasFoto?.name || null,
          suratKeteranganSehat: formData.suratKeteranganSehat?.name || null,
          ijazahSD: formData.ijazahSD?.name || null,
        }),
      });

      if (response.ok) {
        setRegistrationNumber(regNum);
        setIsSubmitted(true);
      } else {
        throw new Error('Failed to save registration');
      }
    } catch (error) {
      console.error('Error saving registration:', error);
      alert('Terjadi kesalahan saat menyimpan data. Silakan coba lagi.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file' && 'files' in e.target && e.target.files) {
      setFormData({
        ...formData,
        [name]: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      });
    }
  };

  if (isSubmitted) {
    return (
      <section id="pendaftaran" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-green-500">
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold mb-4 text-green-600">Pendaftaran Berhasil!</h2>
                <p className="text-gray-700 mb-6">Nomor Pendaftaran Anda:</p>
                <div className="bg-green-100 border-2 border-green-500 rounded-lg p-6 mb-6">
                  <p className="text-3xl font-bold text-green-700">{registrationNumber}</p>
                </div>
                <p className="text-gray-600">Simpan nomor ini untuk mengecek pengumuman hasil seleksi.</p>
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      namaLengkap: '',
                      nisn: '',
                      nik: '',
                      tempatLahir: '',
                      tanggalLahir: '',
                      jenisKelamin: '',
                      agama: '',
                      anakKe: '',
                      jumlahSaudara: '',
                      golonganDarah: '',
                      tinggiBadan: '',
                      beratBadan: '',
                      riwayatPenyakit: '',
                      hobi: '',
                      citaCita: '',
                      alamat: '',
                      rt: '',
                      rw: '',
                      kelurahan: '',
                      kecamatan: '',
                      kabupaten: '',
                      provinsi: '',
                      kodePos: '',
                      namaSekolahAsal: '',
                      alamatSekolahAsal: '',
                      npsnSekolahAsal: '',
                      tahunLulus: '',
                      namaAyah: '',
                      nikAyah: '',
                      tempatLahirAyah: '',
                      tanggalLahirAyah: '',
                      pekerjaanAyah: '',
                      pendidikanAyah: '',
                      penghasilanAyah: '',
                      noHpAyah: '',
                      alamatKantorAyah: '',
                      namaIbu: '',
                      nikIbu: '',
                      tempatLahirIbu: '',
                      tanggalLahirIbu: '',
                      pekerjaanIbu: '',
                      pendidikanIbu: '',
                      penghasilanIbu: '',
                      noHpIbu: '',
                      alamatKantorIbu: '',
                      punyaWali: false,
                      namaWali: '',
                      hubunganWali: '',
                      pekerjaanWali: '',
                      noHpWali: '',
                      alamatWali: '',
                      kartuKeluarga: null,
                      aktaKelahiran: null,
                      raporSD: null,
                      pasFoto: null,
                      suratKeteranganSehat: null,
                      ijazahSD: null,
                    });
                  }}
                  className="mt-6 bg-primary hover:bg-primary/90"
                >
                  Daftar Siswa Lain
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pendaftaran" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Formulir Pendaftaran
        </h2>

        <div className="max-w-3xl mx-auto">
          <Card className="border-2 border-primary/20">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Data Siswa */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary border-b-2 border-primary/20 pb-2">Data Siswa</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="namaLengkap">Nama Lengkap *</Label>
                      <Input
                        id="namaLengkap"
                        name="namaLengkap"
                        value={formData.namaLengkap}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nisn">NISN *</Label>
                      <Input
                        id="nisn"
                        name="nisn"
                        value={formData.nisn}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nik">NIK *</Label>
                      <Input
                        id="nik"
                        name="nik"
                        value={formData.nik}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tempatLahir">Tempat Lahir *</Label>
                      <Input
                        id="tempatLahir"
                        name="tempatLahir"
                        value={formData.tempatLahir}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tanggalLahir">Tanggal Lahir *</Label>
                      <Input
                        id="tanggalLahir"
                        name="tanggalLahir"
                        type="date"
                        value={formData.tanggalLahir}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="jenisKelamin">Jenis Kelamin *</Label>
                      <select
                        id="jenisKelamin"
                        name="jenisKelamin"
                        value={formData.jenisKelamin}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Pilih</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="agama">Agama *</Label>
                      <select
                        id="agama"
                        name="agama"
                        value={formData.agama}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Pilih</option>
                        <option value="Islam">Islam</option>
                        <option value="Kristen">Kristen</option>
                        <option value="Katolik">Katolik</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Buddha">Buddha</option>
                        <option value="Konghucu">Konghucu</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="anakKe">Anak Ke-</Label>
                      <Input
                        id="anakKe"
                        name="anakKe"
                        type="number"
                        value={formData.anakKe}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="jumlahSaudara">Jumlah Saudara *</Label>
                      <Input
                        id="jumlahSaudara"
                        name="jumlahSaudara"
                        type="number"
                        value={formData.jumlahSaudara}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="golonganDarah">Golongan Darah</Label>
                      <select
                        id="golonganDarah"
                        name="golonganDarah"
                        value={formData.golonganDarah}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Pilih</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="tinggiBadan">Tinggi Badan (cm)</Label>
                      <Input
                        id="tinggiBadan"
                        name="tinggiBadan"
                        type="number"
                        value={formData.tinggiBadan}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="beratBadan">Berat Badan (kg)</Label>
                      <Input
                        id="beratBadan"
                        name="beratBadan"
                        type="number"
                        value={formData.beratBadan}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="riwayatPenyakit">Riwayat Penyakit (jika ada)</Label>
                      <Input
                        id="riwayatPenyakit"
                        name="riwayatPenyakit"
                        value={formData.riwayatPenyakit}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hobi">Hobi</Label>
                      <Input
                        id="hobi"
                        name="hobi"
                        value={formData.hobi}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="citaCita">Cita-cita</Label>
                      <Input
                        id="citaCita"
                        name="citaCita"
                        value={formData.citaCita}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Alamat Siswa */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary border-b-2 border-primary/20 pb-2">Alamat Lengkap</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="alamat">Alamat Jalan *</Label>
                      <Input
                        id="alamat"
                        name="alamat"
                        value={formData.alamat}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="rt">RT</Label>
                      <Input
                        id="rt"
                        name="rt"
                        value={formData.rt}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="rw">RW</Label>
                      <Input
                        id="rw"
                        name="rw"
                        value={formData.rw}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="kelurahan">Kelurahan/Desa *</Label>
                      <Input
                        id="kelurahan"
                        name="kelurahan"
                        value={formData.kelurahan}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="kecamatan">Kecamatan *</Label>
                      <Input
                        id="kecamatan"
                        name="kecamatan"
                        value={formData.kecamatan}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="kabupaten">Kabupaten/Kota *</Label>
                      <Input
                        id="kabupaten"
                        name="kabupaten"
                        value={formData.kabupaten}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="provinsi">Provinsi *</Label>
                      <Input
                        id="provinsi"
                        name="provinsi"
                        value={formData.provinsi}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="kodePos">Kode Pos *</Label>
                      <Input
                        id="kodePos"
                        name="kodePos"
                        value={formData.kodePos}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Data Sekolah Asal */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary border-b-2 border-primary/20 pb-2">Data Sekolah Asal (SD/MI)</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="namaSekolahAsal">Nama Sekolah Asal *</Label>
                      <Input
                        id="namaSekolahAsal"
                        name="namaSekolahAsal"
                        value={formData.namaSekolahAsal}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="alamatSekolahAsal">Alamat Sekolah Asal *</Label>
                      <Input
                        id="alamatSekolahAsal"
                        name="alamatSekolahAsal"
                        value={formData.alamatSekolahAsal}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="npsnSekolahAsal">NPSN Sekolah Asal</Label>
                      <Input
                        id="npsnSekolahAsal"
                        name="npsnSekolahAsal"
                        value={formData.npsnSekolahAsal}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tahunLulus">Tahun Lulus *</Label>
                      <Input
                        id="tahunLulus"
                        name="tahunLulus"
                        type="number"
                        value={formData.tahunLulus}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Data Ayah */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary border-b-2 border-primary/20 pb-2">Data Ayah Kandung</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="namaAyah">Nama Ayah *</Label>
                      <Input
                        id="namaAyah"
                        name="namaAyah"
                        value={formData.namaAyah}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nikAyah">NIK Ayah *</Label>
                      <Input
                        id="nikAyah"
                        name="nikAyah"
                        value={formData.nikAyah}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tempatLahirAyah">Tempat Lahir Ayah</Label>
                      <Input
                        id="tempatLahirAyah"
                        name="tempatLahirAyah"
                        value={formData.tempatLahirAyah}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tanggalLahirAyah">Tanggal Lahir Ayah</Label>
                      <Input
                        id="tanggalLahirAyah"
                        name="tanggalLahirAyah"
                        type="date"
                        value={formData.tanggalLahirAyah}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pekerjaanAyah">Pekerjaan Ayah *</Label>
                      <Input
                        id="pekerjaanAyah"
                        name="pekerjaanAyah"
                        value={formData.pekerjaanAyah}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pendidikanAyah">Pendidikan Terakhir Ayah *</Label>
                      <select
                        id="pendidikanAyah"
                        name="pendidikanAyah"
                        value={formData.pendidikanAyah}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Pilih</option>
                        <option value="SD">SD</option>
                        <option value="SMP">SMP</option>
                        <option value="SMA">SMA</option>
                        <option value="D3">D3</option>
                        <option value="S1">S1</option>
                        <option value="S2">S2</option>
                        <option value="S3">S3</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="penghasilanAyah">Penghasilan Ayah *</Label>
                      <select
                        id="penghasilanAyah"
                        name="penghasilanAyah"
                        value={formData.penghasilanAyah}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Pilih</option>
                        <option value="< 1 Juta">&lt; 1 Juta</option>
                        <option value="1-3 Juta">1-3 Juta</option>
                        <option value="3-5 Juta">3-5 Juta</option>
                        <option value="5-10 Juta">5-10 Juta</option>
                        <option value="> 10 Juta">&gt; 10 Juta</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="noHpAyah">No. HP Ayah *</Label>
                      <Input
                        id="noHpAyah"
                        name="noHpAyah"
                        value={formData.noHpAyah}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="alamatKantorAyah">Alamat Kantor Ayah</Label>
                      <Input
                        id="alamatKantorAyah"
                        name="alamatKantorAyah"
                        value={formData.alamatKantorAyah}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Data Ibu */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary border-b-2 border-primary/20 pb-2">Data Ibu Kandung</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="namaIbu">Nama Ibu *</Label>
                      <Input
                        id="namaIbu"
                        name="namaIbu"
                        value={formData.namaIbu}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nikIbu">NIK Ibu *</Label>
                      <Input
                        id="nikIbu"
                        name="nikIbu"
                        value={formData.nikIbu}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tempatLahirIbu">Tempat Lahir Ibu</Label>
                      <Input
                        id="tempatLahirIbu"
                        name="tempatLahirIbu"
                        value={formData.tempatLahirIbu}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tanggalLahirIbu">Tanggal Lahir Ibu</Label>
                      <Input
                        id="tanggalLahirIbu"
                        name="tanggalLahirIbu"
                        type="date"
                        value={formData.tanggalLahirIbu}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pekerjaanIbu">Pekerjaan Ibu *</Label>
                      <Input
                        id="pekerjaanIbu"
                        name="pekerjaanIbu"
                        value={formData.pekerjaanIbu}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pendidikanIbu">Pendidikan Terakhir Ibu *</Label>
                      <select
                        id="pendidikanIbu"
                        name="pendidikanIbu"
                        value={formData.pendidikanIbu}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Pilih</option>
                        <option value="SD">SD</option>
                        <option value="SMP">SMP</option>
                        <option value="SMA">SMA</option>
                        <option value="D3">D3</option>
                        <option value="S1">S1</option>
                        <option value="S2">S2</option>
                        <option value="S3">S3</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="penghasilanIbu">Penghasilan Ibu *</Label>
                      <select
                        id="penghasilanIbu"
                        name="penghasilanIbu"
                        value={formData.penghasilanIbu}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Pilih</option>
                        <option value="< 1 Juta">&lt; 1 Juta</option>
                        <option value="1-3 Juta">1-3 Juta</option>
                        <option value="3-5 Juta">3-5 Juta</option>
                        <option value="5-10 Juta">5-10 Juta</option>
                        <option value="> 10 Juta">&gt; 10 Juta</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="noHpIbu">No. HP Ibu *</Label>
                      <Input
                        id="noHpIbu"
                        name="noHpIbu"
                        value={formData.noHpIbu}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="alamatKantorIbu">Alamat Kantor Ibu</Label>
                      <Input
                        id="alamatKantorIbu"
                        name="alamatKantorIbu"
                        value={formData.alamatKantorIbu}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Data Wali */}
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <input
                      type="checkbox"
                      id="punyaWali"
                      name="punyaWali"
                      checked={formData.punyaWali}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <label htmlFor="punyaWali" className="text-sm font-medium text-gray-700">
                      Siswa memiliki Wali (berbeda dengan orang tua kandung)
                    </label>
                  </div>

                  {formData.punyaWali && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="text-lg font-bold mb-4 text-primary">Data Wali</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="namaWali">Nama Wali *</Label>
                          <Input
                            id="namaWali"
                            name="namaWali"
                            value={formData.namaWali}
                            onChange={handleChange}
                            required={formData.punyaWali}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="hubunganWali">Hubungan dengan Siswa *</Label>
                          <Input
                            id="hubunganWali"
                            name="hubunganWali"
                            value={formData.hubunganWali}
                            onChange={handleChange}
                            required={formData.punyaWali}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="pekerjaanWali">Pekerjaan Wali *</Label>
                          <Input
                            id="pekerjaanWali"
                            name="pekerjaanWali"
                            value={formData.pekerjaanWali}
                            onChange={handleChange}
                            required={formData.punyaWali}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="noHpWali">No. HP Wali *</Label>
                          <Input
                            id="noHpWali"
                            name="noHpWali"
                            value={formData.noHpWali}
                            onChange={handleChange}
                            required={formData.punyaWali}
                            className="mt-1"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="alamatWali">Alamat Wali *</Label>
                          <Input
                            id="alamatWali"
                            name="alamatWali"
                            value={formData.alamatWali}
                            onChange={handleChange}
                            required={formData.punyaWali}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Upload Dokumen */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary border-b-2 border-primary/20 pb-2">Upload Dokumen Wajib</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="kartuKeluarga">Kartu Keluarga (KK) *</Label>
                      <Input
                        id="kartuKeluarga"
                        name="kartuKeluarga"
                        type="file"
                        onChange={handleChange}
                        required
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">Format: PDF, JPG, PNG (Max 2MB)</p>
                    </div>
                    <div>
                      <Label htmlFor="aktaKelahiran">Akta Kelahiran *</Label>
                      <Input
                        id="aktaKelahiran"
                        name="aktaKelahiran"
                        type="file"
                        onChange={handleChange}
                        required
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">Format: PDF, JPG, PNG (Max 2MB)</p>
                    </div>
                    <div>
                      <Label htmlFor="raporSD">Rapor SD/MI (Kelas 4-6) *</Label>
                      <Input
                        id="raporSD"
                        name="raporSD"
                        type="file"
                        onChange={handleChange}
                        required
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">Format: PDF, JPG, PNG (Max 5MB)</p>
                    </div>
                    <div>
                      <Label htmlFor="pasFoto">Pas Foto 3x4 *</Label>
                      <Input
                        id="pasFoto"
                        name="pasFoto"
                        type="file"
                        onChange={handleChange}
                        required
                        accept=".jpg,.jpeg,.png"
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">Format: JPG, PNG (Max 1MB)</p>
                    </div>
                    <div>
                      <Label htmlFor="suratKeteranganSehat">Surat Keterangan Sehat *</Label>
                      <Input
                        id="suratKeteranganSehat"
                        name="suratKeteranganSehat"
                        type="file"
                        onChange={handleChange}
                        required
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">Format: PDF, JPG, PNG (Max 2MB)</p>
                    </div>
                    <div>
                      <Label htmlFor="ijazahSD">Ijazah/SKL SD/MI *</Label>
                      <Input
                        id="ijazahSD"
                        name="ijazahSD"
                        type="file"
                        onChange={handleChange}
                        required
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">Format: PDF, JPG, PNG (Max 2MB)</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Catatan:</strong> Pastikan semua dokumen yang diupload jelas dan terbaca dengan baik. Dokumen yang tidak jelas dapat menyebabkan penundaan proses seleksi.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="agreement" required className="w-4 h-4" />
                  <label htmlFor="agreement" className="text-sm text-gray-700">
                    Saya menyatakan data yang diisi adalah benar dan dapat dipertanggungjawabkan.
                  </label>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-6 text-lg">
                  Kirim Pendaftaran
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
