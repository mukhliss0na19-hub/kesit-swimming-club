"use client";

import { useEffect, useState } from "react";

interface Siswa {
  Nama: string;
  Program: string;
  Status?: string;
  ID?: string;
  Lokasi: string;
}

export default function LaporanPage() {
  const [data, setData] = useState<Siswa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/pendaftaran")
      .then((res) => res.json())
      .then((result) => {
        const aktif = result.filter(
          (item: Siswa) => item.Status === "Aktif"
        );

        setData(aktif);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">
        Laporan Siswa Aktif
      </h1>

      <p className="text-gray-500 mb-6">
        Rekap siswa yang sedang aktif di Kesit Swimming Club
      </p>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Nama</th>
                <th className="p-4 text-left">Program</th>
                <th className="p-4 text-left">Lokasi</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center">
                    Loading...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    Belum ada siswa aktif
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-slate-50">
                    <td className="p-4 font-semibold text-blue-600">
                      {item.ID || "-"}
                    </td>
                    <td className="p-4">{item.Nama}</td>
                    <td className="p-4">{item.Program}</td>
                    <td className="p-4">{item.Lokasi}</td>
                    <td className="p-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        Aktif
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}