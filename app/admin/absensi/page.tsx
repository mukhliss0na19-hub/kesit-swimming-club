"use client";

import { useEffect, useState } from "react";

export default function AbsensiPage() {

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbxGFM4YhUoqwgyvC1Dy6Z9zct8-uU9T6ooATrhULT9TkHRhC5F9GfTTUnXkokwOIwo/exec"
    );
    const json = await res.json();
    setData(json);
  };

  const kirimAbsensi = async (siswa: any, status: string) => {

    const formData = new URLSearchParams();
    formData.append("action", "absensi");
    formData.append("id", siswa.ID);
    formData.append("nama", siswa.Nama);
    formData.append("kelas", siswa.Program);
    formData.append("status", status);

    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbxGFM4YhUoqwgyvC1Dy6Z9zct8-uU9T6ooATrhULT9TkHRhC5F9GfTTUnXkokwOIwo/exec",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    alert(data.message);

    fetchData();
  };

  return (
    <div className="p-6">

      <h1 className="mb-4 text-2xl font-bold">
        Absensi Siswa
      </h1>

      <div className="overflow-auto rounded-lg border">

        <table className="w-full border-collapse">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Nama</th>
              <th className="p-2">Program</th>
              <th className="p-2">Status</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>

          <tbody>

            {data.map((siswa, i) => (

              <tr key={i} className="border-t">

                <td className="p-2">{siswa.Nama}</td>
                <td className="p-2">{siswa.Program}</td>
                <td className="p-2">{siswa.Status}</td>

                <td className="flex gap-2 p-2">

                  <button
                    onClick={() => kirimAbsensi(siswa, "Hadir")}
                    className="rounded bg-green-500 px-3 py-1 text-white"
                  >
                    Hadir
                  </button>

                  <button
                    onClick={() => kirimAbsensi(siswa, "Izin")}
                    className="rounded bg-yellow-500 px-3 py-1 text-white"
                  >
                    Izin
                  </button>

                  <button
                    onClick={() => kirimAbsensi(siswa, "Alpha")}
                    className="rounded bg-red-500 px-3 py-1 text-white"
                  >
                    Alpha
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}