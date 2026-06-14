'use client';

import { Card, CardContent } from '@/components/ui/card';

export default function Profile() {
  return (
    <section id="profil" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
            Profil Sekolah
          </h2>

          <Card className="border-2 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-primary">SMPIT Cahaya Ilmu</h3>
              
              <div className="space-y-3 text-gray-700 mb-8">
                <p>📍 Jalan Dusun Krajan, Desa Cibalongsari, Kecamatan Klari, Kabupaten Karawang, Jawa Barat</p>
                <p>🏫 Sekolah Swasta</p>
                <p>🏛️ Naungan Yayasan Cahaya Abah Ambu</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold mb-4 text-primary">Visi</h4>
                  <p className="text-gray-700">
                    Menjadi sekolah Islam terpadu yang unggul dalam akademik dan akhlak mulia.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold mb-4 text-primary">Misi</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Menyelenggarakan pendidikan berkualitas berbasis Islam</li>
                    <li>• Membentuk karakter siswa yang berakhlak mulia</li>
                    <li>• Mengembangkan potensi akademik dan non-akademik</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
