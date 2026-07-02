"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [siswa, setSiswa] = useState<any[]>([]);
  const [absensi, setAbsensi] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      // SISWA
      const resSiswa = await fetch("/api/siswa");
      const jsonSiswa = await resSiswa.json();

      // ABSENSI
      const resAbsensi = await fetch("/api/absensi");
      const jsonAbsensi = await resAbsensi.json();

      setSiswa(Array.isArray(jsonSiswa?.data) ? jsonSiswa.data : []);
      setAbsensi(Array.isArray(jsonAbsensi?.data) ? jsonAbsensi.data : []);

    } catch (err) {
      console.error(err);
      setSiswa([]);
      setAbsensi([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard Admin
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {/* TOTAL SISWA */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">
            Total Siswa
          </h2>
          <p className="text-3xl font-bold">
            {loading ? "..." : siswa.length}
          </p>
        </div>

        {/* PENDAFTARAN */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">
            Data Siswa
          </h2>
          <p className="text-3xl font-bold">
            {loading ? "..." : siswa.length}
          </p>
        </div>

        {/* ABSENSI */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">
            Total Absensi
          </h2>
          <p className="text-3xl font-bold">
            {loading ? "..." : absensi.length}
          </p>
        </div>

      </div>
    </div>
  );
}