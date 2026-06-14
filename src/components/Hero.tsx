'use client';

import { Button } from '@/components/ui/button';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative bg-primary text-white py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            PPDB SMPIT Cahaya Ilmu 2026/2027
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Sekolah Islam Terpadu yang membentuk generasi berakhlak, cerdas, dan mandiri.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => scrollToSection('pendaftaran')}
              className="bg-white text-primary hover:bg-gray-100 px-8 py-6 text-lg"
            >
              Daftar Sekarang
            </Button>
            <Button 
              onClick={() => window.open('https://wa.me/628212079917', '_blank')}
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
            >
              📱 Hubungi WhatsApp
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
