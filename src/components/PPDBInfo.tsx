'use client';

import { Card, CardContent } from '@/components/ui/card';

export default function PPDBInfo() {
  return (
    <section id="ppdb" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Informasi PPDB
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <Card className="border-2 border-primary/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-3">📅</div>
              <h3 className="font-bold mb-2 text-primary">Tahun Ajaran</h3>
              <p className="text-gray-700">2026/2027</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="font-bold mb-2 text-primary">Kuota Siswa</h3>
              <p className="text-gray-700">100 Siswa</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="font-bold mb-2 text-primary">Pendaftaran</h3>
              <p className="text-gray-700">1 Januari - 30 Juni 2026</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-3">📋</div>
              <h3 className="font-bold mb-2 text-primary">Status</h3>
              <p className="text-green-600 font-semibold">Dibuka</p>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto mt-12">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-primary/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-primary">Syarat Pendaftaran</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Kartu Keluarga</li>
                  <li>• Akta Lahir</li>
                  <li>• Pas Foto 3x4</li>
                  <li>• Rapor SD/MI kelas 4-6</li>
                  <li>• Surat Keterangan Sehat</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-primary">Alur Pendaftaran</h3>
                <ol className="space-y-2 text-gray-700">
                  <li>1. Isi formulir pendaftaran online</li>
                  <li>2. Upload dokumen yang diperlukan</li>
                  <li>3. Dapatkan nomor pendaftaran</li>
                  <li>4. Tunggu pengumuman hasil seleksi</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
