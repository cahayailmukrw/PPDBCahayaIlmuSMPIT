'use client';

import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface PPDBInfoData {
  academic_year: string;
  quota: string;
  registration_period: string;
  status: string;
  requirements: string;
  registration_flow: string;
}

export default function PPDBInfo() {
  const [ppdbInfo, setPPDBInfo] = useState<PPDBInfoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPPDBInfo = async () => {
      try {
        const response = await fetch('/api/admin/ppdb-info');
        const data = await response.json();
        if (data.success) {
          setPPDBInfo(data.ppdbInfo);
        }
      } catch (error) {
        console.error('Error fetching PPDB info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPPDBInfo();
  }, []);

  const requirements = useMemo(() => {
    if (!ppdbInfo?.requirements) return [];
    return ppdbInfo.requirements.split('\n').filter(Boolean);
  }, [ppdbInfo]);

  const registrationFlow = useMemo(() => {
    if (!ppdbInfo?.registration_flow) return [];
    return ppdbInfo.registration_flow.split('\n').filter(Boolean);
  }, [ppdbInfo]);

  if (loading) {
    return (
      <section id="ppdb" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center text-gray-600">Memuat informasi PPDB...</div>
      </section>
    );
  }

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
              <p className="text-gray-700">{ppdbInfo?.academic_year || '—'}</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="font-bold mb-2 text-primary">Kuota Siswa</h3>
              <p className="text-gray-700">{ppdbInfo?.quota || '—'}</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="font-bold mb-2 text-primary">Pendaftaran</h3>
              <p className="text-gray-700">{ppdbInfo?.registration_period || '—'}</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-3">📋</div>
              <h3 className="font-bold mb-2 text-primary">Status</h3>
              <p className="text-green-600 font-semibold">{ppdbInfo?.status || '—'}</p>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto mt-12">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-primary/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-primary">Syarat Pendaftaran</h3>
                <ul className="space-y-2 text-gray-700">
                  {requirements.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-primary">Alur Pendaftaran</h3>
                <ol className="space-y-2 text-gray-700">
                  {registrationFlow.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
