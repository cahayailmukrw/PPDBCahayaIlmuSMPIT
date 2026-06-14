'use client';

import { Card, CardContent } from '@/components/ui/card';

export default function Contact() {
  return (
    <section id="kontak" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Kontak Kami
        </h2>

        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-primary/20">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-6 text-primary">Informasi Kontak</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">📍</div>
                      <div>
                        <p className="font-semibold">Alamat</p>
                        <p className="text-gray-700">Jalan Dusun Krajan, Desa Cibalongsari, Kecamatan Klari, Kabupaten Karawang, Jawa Barat</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">📱</div>
                      <div>
                        <p className="font-semibold">WhatsApp</p>
                        <a href="https://wa.me/628212079917" className="text-primary hover:underline">
                          +62 821-2079-917
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">📧</div>
                      <div>
                        <p className="font-semibold">Email</p>
                        <a href="mailto:cahayailmukrw@gmail.com" className="text-primary hover:underline">
                          cahayailmukrw@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-6 text-primary">Jam Operasional</h3>
                  
                  <div className="space-y-3 text-gray-700">
                    <div className="flex justify-between">
                      <span>Senin - Kamis</span>
                      <span>07:00 - 15:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Jumat</span>
                      <span>07:00 - 11:30</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sabtu</span>
                      <span>08:00 - 12:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Minggu</span>
                      <span>Tutup</span>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Catatan:</strong> Untuk informasi PPDB, silakan hubungi kami melalui WhatsApp atau email di atas.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
