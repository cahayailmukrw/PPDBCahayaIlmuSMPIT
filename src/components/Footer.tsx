'use client';

import { Button } from '@/components/ui/button';

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">SMPIT Cahaya Ilmu</h3>
            <p className="text-white/80 mb-4">
              Membentuk generasi berakhlak, cerdas, dan mandiri.
            </p>
            <a
              href="https://wa.me/628212079917"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
            >
              <span>💬</span>
              <span>Hubungi WhatsApp</span>
            </a>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Link Cepat</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection('home')} className="text-white/80 hover:text-white transition-colors">
                  Beranda
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('profil')} className="text-white/80 hover:text-white transition-colors">
                  Profil
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('program')} className="text-white/80 hover:text-white transition-colors">
                  Program
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('ppdb')} className="text-white/80 hover:text-white transition-colors">
                  PPDB
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Admin</h4>
            <Button
              onClick={() => window.location.href = '/admin/login'}
              className="bg-white text-primary hover:bg-gray-100 w-full"
            >
              Login Admin
            </Button>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
          <p>© 2026 SMPIT Cahaya Ilmu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
