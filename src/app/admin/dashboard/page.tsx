'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { LogOut, Users, CheckCircle, XCircle, Clock, Save } from 'lucide-react';

interface Registration {
  id: number;
  registration_number: string;
  nama_lengkap: string;
  nisn: string;
  nik: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  agama: string;
  alamat: string;
  nama_sekolah_asal: string;
  status: string;
  created_at: string;
}

interface PPDBInfoForm {
  academic_year: string;
  quota: string;
  registration_period: string;
  status: string;
  requirements: string;
  registration_flow: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [ppdbForm, setPPDBForm] = useState<PPDBInfoForm>({
    academic_year: '',
    quota: '',
    registration_period: '',
    status: '',
    requirements: '',
    registration_flow: '',
  });
  const [savingPPDB, setSavingPPDB] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin/login');
      return;
    }
    fetchRegistrations();
    fetchPPDBInfo();
  }, [router]);

  const fetchRegistrations = async () => {
    try {
      const response = await fetch('/api/admin/registrations');
      const data = await response.json();
      if (data.success) {
        setRegistrations(data.registrations);
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPPDBInfo = async () => {
    try {
      const response = await fetch('/api/admin/ppdb-info');
      const data = await response.json();
      if (data.success) {
        setPPDBForm({
          academic_year: data.ppdbInfo?.academic_year || '',
          quota: data.ppdbInfo?.quota || '',
          registration_period: data.ppdbInfo?.registration_period || '',
          status: data.ppdbInfo?.status || '',
          requirements: data.ppdbInfo?.requirements || '',
          registration_flow: data.ppdbInfo?.registration_flow || '',
        });
      }
    } catch (error) {
      console.error('Error fetching PPDB info:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    router.push('/admin/login');
  };

  const handlePPDBSave = async () => {
    setSavingPPDB(true);
    try {
      const response = await fetch('/api/admin/ppdb-info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ppdbForm),
      });

      const data = await response.json();
      if (data.success) {
        setPPDBForm({
          academic_year: data.ppdbInfo?.academic_year || '',
          quota: data.ppdbInfo?.quota || '',
          registration_period: data.ppdbInfo?.registration_period || '',
          status: data.ppdbInfo?.status || '',
          requirements: data.ppdbInfo?.requirements || '',
          registration_flow: data.ppdbInfo?.registration_flow || '',
        });
      }
    } catch (error) {
      console.error('Error saving PPDB info:', error);
    } finally {
      setSavingPPDB(false);
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const response = await fetch('/api/admin/registrations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      const data = await response.json();
      if (data.success) {
        fetchRegistrations();
        setSelectedRegistration(null);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredRegistrations = registrations.filter(reg => 
    filter === 'all' ? true : reg.status === filter
  );

  const stats = {
    total: registrations.length,
    pending: registrations.filter(r => r.status === 'pending').length,
    approved: registrations.filter(r => r.status === 'approved').length,
    rejected: registrations.filter(r => r.status === 'rejected').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
              <p className="text-sm text-gray-600">PPDB SMPIT Cahaya Ilmu</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Keluar
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pendaftar</CardTitle>
              <Users className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Menunggu</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Diterima</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ditolak</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            </CardContent>
          </Card>
        </div>

        {/* PPDB Info Editor */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Kelola Informasi PPDB</CardTitle>
            <CardDescription>Ubah konten yang tampil di halaman depan publik</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="academic_year">Tahun Ajaran</Label>
                <Input
                  id="academic_year"
                  value={ppdbForm.academic_year}
                  onChange={(e) => setPPDBForm({ ...ppdbForm, academic_year: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quota">Kuota Siswa</Label>
                <Input
                  id="quota"
                  value={ppdbForm.quota}
                  onChange={(e) => setPPDBForm({ ...ppdbForm, quota: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registration_period">Periode Pendaftaran</Label>
                <Input
                  id="registration_period"
                  value={ppdbForm.registration_period}
                  onChange={(e) => setPPDBForm({ ...ppdbForm, registration_period: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Input
                  id="status"
                  value={ppdbForm.status}
                  onChange={(e) => setPPDBForm({ ...ppdbForm, status: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="requirements">Syarat Pendaftaran</Label>
              <Textarea
                id="requirements"
                rows={5}
                value={ppdbForm.requirements}
                onChange={(e) => setPPDBForm({ ...ppdbForm, requirements: e.target.value })}
                placeholder="Pisahkan setiap syarat dengan baris baru"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registration_flow">Alur Pendaftaran</Label>
              <Textarea
                id="registration_flow"
                rows={5}
                value={ppdbForm.registration_flow}
                onChange={(e) => setPPDBForm({ ...ppdbForm, registration_flow: e.target.value })}
                placeholder="Pisahkan setiap langkah dengan baris baru"
              />
            </div>
            <Button onClick={handlePPDBSave} disabled={savingPPDB} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {savingPPDB ? 'Menyimpan...' : 'Simpan Informasi'}
            </Button>
          </CardContent>
        </Card>

        {/* Filter */}
        <div className="mb-6">
          <div className="flex gap-2">
            {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
              <Button
                key={status}
                variant={filter === status ? 'default' : 'outline'}
                onClick={() => setFilter(status)}
                className="capitalize"
              >
                {status === 'all' ? 'Semua' : status === 'pending' ? 'Menunggu' : status === 'approved' ? 'Diterima' : 'Ditolak'}
              </Button>
            ))}
          </div>
        </div>

        {/* Registrations Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Pendaftar</CardTitle>
            <CardDescription>
              Menampilkan {filteredRegistrations.length} dari {registrations.length} pendaftar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">No. Pendaftaran</th>
                    <th className="text-left p-3 font-medium">Nama Lengkap</th>
                    <th className="text-left p-3 font-medium">NISN</th>
                    <th className="text-left p-3 font-medium">Sekolah Asal</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Tanggal</th>
                    <th className="text-left p-3 font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegistrations.map((reg) => (
                    <tr key={reg.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{reg.registration_number}</td>
                      <td className="p-3 font-medium">{reg.nama_lengkap}</td>
                      <td className="p-3">{reg.nisn}</td>
                      <td className="p-3">{reg.nama_sekolah_asal}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          reg.status === 'approved' ? 'bg-green-100 text-green-800' :
                          reg.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {reg.status === 'approved' ? 'Diterima' :
                           reg.status === 'rejected' ? 'Ditolak' : 'Menunggu'}
                        </span>
                      </td>
                      <td className="p-3 text-sm text-gray-600">
                        {new Date(reg.created_at).toLocaleDateString('id-ID')}
                      </td>
                      <td className="p-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedRegistration(reg)}
                        >
                          Detail
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredRegistrations.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Tidak ada data pendaftar
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Detail Modal */}
      {selectedRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Detail Pendaftar</h2>
                  <p className="text-gray-600">{selectedRegistration.registration_number}</p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedRegistration(null)}
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-6">
                {/* Data Siswa */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 border-b pb-2">Data Siswa</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Nama Lengkap</p>
                      <p className="font-medium">{selectedRegistration.nama_lengkap}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">NISN</p>
                      <p className="font-medium">{selectedRegistration.nisn}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">NIK</p>
                      <p className="font-medium">{selectedRegistration.nik}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tempat, Tanggal Lahir</p>
                      <p className="font-medium">{selectedRegistration.tempat_lahir}, {new Date(selectedRegistration.tanggal_lahir).toLocaleDateString('id-ID')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Jenis Kelamin</p>
                      <p className="font-medium">{selectedRegistration.jenis_kelamin}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Agama</p>
                      <p className="font-medium">{selectedRegistration.agama}</p>
                    </div>
                  </div>
                </div>

                {/* Alamat */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 border-b pb-2">Alamat</h3>
                  <p className="font-medium">{selectedRegistration.alamat}</p>
                </div>

                {/* Sekolah Asal */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 border-b pb-2">Sekolah Asal</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Nama Sekolah</p>
                      <p className="font-medium">{selectedRegistration.nama_sekolah_asal}</p>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 border-b pb-2">Status Pendaftaran</h3>
                  <div className="flex gap-3">
                    {selectedRegistration.status === 'pending' && (
                      <>
                        <Button
                          onClick={() => handleStatusChange(selectedRegistration.id, 'approved')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Terima
                        </Button>
                        <Button
                          onClick={() => handleStatusChange(selectedRegistration.id, 'rejected')}
                          variant="destructive"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Tolak
                        </Button>
                      </>
                    )}
                    {selectedRegistration.status === 'approved' && (
                      <Button
                        onClick={() => handleStatusChange(selectedRegistration.id, 'rejected')}
                        variant="destructive"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Ubah ke Ditolak
                      </Button>
                    )}
                    {selectedRegistration.status === 'rejected' && (
                      <Button
                        onClick={() => handleStatusChange(selectedRegistration.id, 'approved')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Ubah ke Diterima
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
