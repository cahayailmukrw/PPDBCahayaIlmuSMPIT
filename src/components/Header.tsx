'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SI</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">SMPIT Cahaya Ilmu</h1>
              <p className="text-xs text-gray-600">Sekolah Islam Terpadu</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-primary transition-colors">
              Beranda
            </button>
            <button onClick={() => scrollToSection('profil')} className="text-gray-700 hover:text-primary transition-colors">
              Profil
            </button>
            <button onClick={() => scrollToSection('program')} className="text-gray-700 hover:text-primary transition-colors">
              Program
            </button>
            <button onClick={() => scrollToSection('ppdb')} className="text-gray-700 hover:text-primary transition-colors">
              PPDB
            </button>
            <button onClick={() => scrollToSection('kontak')} className="text-gray-700 hover:text-primary transition-colors">
              Kontak
            </button>
            <Button onClick={() => scrollToSection('pendaftaran')} className="bg-primary hover:bg-primary/90">
              Daftar Sekarang
            </Button>
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <button onClick={() => scrollToSection('home')} className="block w-full text-left text-gray-700 hover:text-primary transition-colors">
              Beranda
            </button>
            <button onClick={() => scrollToSection('profil')} className="block w-full text-left text-gray-700 hover:text-primary transition-colors">
              Profil
            </button>
            <button onClick={() => scrollToSection('program')} className="block w-full text-left text-gray-700 hover:text-primary transition-colors">
              Program
            </button>
            <button onClick={() => scrollToSection('ppdb')} className="block w-full text-left text-gray-700 hover:text-primary transition-colors">
              PPDB
            </button>
            <button onClick={() => scrollToSection('kontak')} className="block w-full text-left text-gray-700 hover:text-primary transition-colors">
              Kontak
            </button>
            <Button onClick={() => scrollToSection('pendaftaran')} className="w-full bg-primary hover:bg-primary/90">
              Daftar Sekarang
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
