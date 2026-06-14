'use client';

import { Card, CardContent } from '@/components/ui/card';

const programs = [
  {
    title: 'Tahfidz Qur\'an',
    description: 'Program menghafal Al-Qur\'an dengan target hafalan terukur',
    icon: '📖'
  },
  {
    title: 'BTQ',
    description: 'Baca Tulis Al-Qur\'an untuk kemampuan membaca yang baik',
    icon: '📚'
  },
  {
    title: 'Sholat Berjamaah',
    description: 'Pembiasaan sholat berjamaah setiap hari',
    icon: '🕌'
  },
  {
    title: 'Science Day',
    description: 'Kegiatan sains praktis untuk mengembangkan logika',
    icon: '🔬'
  },
  {
    title: 'Market Day',
    description: 'Kegiatan kewirausahaan untuk melatih kemandirian',
    icon: '🏪'
  },
  {
    title: 'Karakter Islami',
    description: 'Pembentukan karakter berbasis nilai-nilai Islam',
    icon: '⭐'
  },
  {
    title: 'Teknologi Dasar',
    description: 'Pengenalan teknologi komputer untuk era digital',
    icon: '💻'
  },
  {
    title: 'Bahasa Arab & Inggris',
    description: 'Penguasaan bahasa asing untuk bekal masa depan',
    icon: '🌍'
  }
];

export default function Program() {
  return (
    <section id="program" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Program Unggulan
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-2 border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{program.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-primary">{program.title}</h3>
                <p className="text-gray-600 text-sm">{program.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
