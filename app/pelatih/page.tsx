"use client";

import { useEffect, useState } from "react";

type Siswa = {
  ID?: string;
  id?: string;
  Nama?: string;
  nama?: string;
  Program?: string;
  program?: string;
  Grup?: string;
  grup?: string;
  Lokasi?: string;
  lokasi?: string;
  Level?: string | number;
  level?: string | number;
};

const kelompok = [
  ["Reguler", "Siswa kelas reguler"],
  ["Private", "Siswa kelas private"],
  ["Prestasi A", "Kelompok prestasi A"],
  ["Prestasi B", "Kelompok prestasi B"],
  ["Prestasi C", "Kelompok prestasi C"],
  ["Prestasi D", "Kelompok prestasi D"],
];

export default function PortalPelatihPage() {
  const [kelompokAktif, setKelompokAktif] = useState("");
  const [siswa, setSiswa] = useState<Siswa[]>([]);
  const [pencarian, setPencarian] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    ambilSiswa();
  }, []);

  async function ambilSiswa() {
    try {
      setLoading(true);
      const response = await fetch("/api/siswa", { cache: "no-store" });
      if (!response.ok) throw new Error("Gagal mengambil data siswa");

      const result = await response.json();
      const data = Array.isArray(result)
        ? result
        : Array.isArray(result.data)
        ? result.data
        : [];

      setSiswa(data);
    } catch (err) {
      console.error(err);
      setError("Tidak dapat mengambil data siswa.");
    } finally {
      setLoading(false);
    }
  }

  const siswaTampil = siswa.filter((item) => {
    if (!kelompokAktif) return false;

    const program = (item.Program || item.program || "").trim().toLowerCase();
    const grup = (item.Grup || item.grup || "").trim().toLowerCase();
    const cari = pencarian.trim().toLowerCase();
    const id = String(item.ID || item.id || "").toLowerCase();
    const nama = (item.Nama || item.nama || "").toLowerCase();

    let sesuai = false;

    if (kelompokAktif === "Reguler") {
      sesuai = program === "reguler";
    } else if (kelompokAktif === "Private") {
      sesuai = program === "private" || program === "privat";
    } else {
      sesuai = grup === kelompokAktif.toLowerCase();
    }

    return sesuai && (!cari || nama.includes(cari) || id.includes(cari));
  });

  return (
    <main className="min-h-screen bg-[#F7FFF9] px-4 py-8">
      <div className="mx-auto max-w-6xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0B6B32]">
            Portal Pelatih
          </h1>
          <p className="mt-1 text-gray-600">
            Pilih kelompok siswa yang ingin Anda cari.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {kelompok.map(([id, description]) => {
            const aktif = kelompokAktif === id;

            return (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setKelompokAktif(id);
                  setPencarian("");
                }}
                className={`group rounded-2xl border p-5 text-left transition-all duration-200 ${
                  aktif
                    ? "border-[#0B6B32] bg-[#0B6B32] text-white shadow-lg"
                    : "border-gray-200 bg-white hover:border-[#0B6B32] hover:bg-[#0B6B32] hover:text-white hover:shadow-lg"
                }`}
              >
                <div className="text-xl font-bold">{id}</div>
                <div
                  className={`mt-1 text-sm ${
                    aktif
                      ? "text-green-100"
                      : "text-gray-500 group-hover:text-green-100"
                  }`}
                >
                  {description}
                </div>
              </button>
            );
          })}
        </div>

        {kelompokAktif && (
          <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Siswa {kelompokAktif}
                </h2>
                <p className="text-sm text-gray-500">
                  Cari siswa berdasarkan nama atau ID.
                </p>
              </div>

              <input
                value={pencarian}
                onChange={(e) => setPencarian(e.target.value)}
                placeholder="🔎 Cari nama / ID siswa..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#0B6B32] md:w-80"
              />
            </div>

            {loading && (
              <div className="py-10 text-center text-gray-500">
                Memuat data siswa...
              </div>
            )}

            {error && (
              <div className="rounded-xl bg-red-50 p-4 text-red-600">
                {error}
              </div>
            )}

            {!loading && !error && siswaTampil.length === 0 && (
              <div className="rounded-xl bg-gray-50 p-8 text-center text-gray-500">
                Siswa tidak ditemukan.
              </div>
            )}

            <div className="space-y-3">
              {siswaTampil.map((item, index) => {
                const id = item.ID || item.id || "";

                return (
                  <div
                    key={`${id}-${index}`}
                    className="rounded-xl border border-gray-200 bg-white p-4 transition hover:border-[#0B6B32] hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-gray-800">
                          {item.Nama || item.nama || "-"}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          ID: {id || "-"}
                        </p>
                        {(item.Level || item.level) && (
                          <p className="mt-1 text-sm text-gray-500">
                            Level: {item.Level || item.level}
                          </p>
                        )}
                        <p className="mt-1 text-sm text-gray-500">
                          {item.Lokasi || item.lokasi || "-"}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (id) {
                            window.location.href = `/pelatih/siswa/${id}`;
                          }
                        }}
                        className="rounded-lg bg-[#0B6B32] px-4 py-2 font-semibold text-white hover:bg-[#04461F]"
                      >
                        Pilih
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}