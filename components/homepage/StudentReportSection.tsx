"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Siswa = {
  ID: string;
  Nama: string;
  Program?: string;
  Lokasi?: string;
  Status?: string;
};

export default function StudentReportSection() {
  const router = useRouter();

  const [siswa, setSiswa] = useState<Siswa[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [kelas, setKelas] = useState("Semua");

  useEffect(() => {
    async function loadSiswa() {
      try {
        const res = await fetch("/api/siswa", {
          cache: "no-store",
        });

        const result = await res.json();

        const data: Siswa[] = result.data || [];

        const siswaAktif = data.filter(
          (item) =>
            !item.Status ||
            item.Status.toLowerCase() === "aktif"
        );

        setSiswa(siswaAktif);
      } catch (error) {
        console.error(
          "Gagal mengambil data siswa:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadSiswa();
  }, []);

  // Membuat daftar kelas secara otomatis
  const daftarKelas = useMemo(() => {
    const kelasSet = new Set<string>();

    siswa.forEach((item) => {
      if (item.Program) {
        kelasSet.add(item.Program);
      }
    });

    return Array.from(kelasSet).sort();
  }, [siswa]);

  // Filter siswa berdasarkan kelas + nama
  const hasilPencarian = useMemo(() => {
    return siswa.filter((item) => {
      const cocokKelas =
        kelas === "Semua" ||
        item.Program === kelas;

      const cocokNama =
        item.Nama
          .toLowerCase()
          .includes(search.toLowerCase());

      return cocokKelas && cocokNama;
    });
  }, [siswa, kelas, search]);

  function bukaLaporan(item: Siswa) {
    router.push(
      `/laporan?id=${encodeURIComponent(
        item.ID
      )}&nama=${encodeURIComponent(
        item.Nama
      )}`
    );
  }

  return (
    <section
    id="laporan"
    className="scroll-mt-30 py-20 bg-green-50">
      <div className="max-w-5xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-10">

          <p className="text-green-700 font-bold uppercase tracking-wider">
            Portal Orang Tua
          </p>

          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">
            Laporan Siswa
          </h2>

          <p className="text-gray-500 mt-3">
            Pilih kelas renang dan cari nama siswa
            untuk melihat laporan.
          </p>

        </div>

        {/* FILTER */}
        <div className="bg-white rounded-2xl shadow-md p-5 mb-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* FILTER KELAS */}
            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kelas Renang
              </label>

              <select
                value={kelas}
                onChange={(e) =>
                  setKelas(e.target.value)
                }
                className="
                  w-full
                  border
                  border-gray-200
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:border-green-600
                  focus:ring-2
                  focus:ring-green-100
                "
              >

                <option value="Semua">
                  Semua Kelas
                </option>

                {daftarKelas.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}

              </select>

            </div>

            {/* PENCARIAN */}
            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cari Nama Siswa
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                  🔍
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Ketik nama siswa..."
                  className="
                    w-full
                    border
                    border-gray-200
                    rounded-xl
                    pl-11
                    pr-4
                    py-3
                    outline-none
                    focus:border-green-600
                    focus:ring-2
                    focus:ring-green-100
                  "
                />

              </div>

            </div>

          </div>

        </div>

        {/* JUMLAH HASIL */}
        {!loading && (
          <div className="mb-4 text-sm text-gray-500">
            Menampilkan{" "}
            <span className="font-bold text-green-700">
              {hasilPencarian.length}
            </span>{" "}
            siswa
          </div>
        )}

        {/* DATA */}
        {loading ? (

          <div className="text-center py-12 text-gray-500">
            Memuat data siswa...
          </div>

        ) : hasilPencarian.length === 0 ? (

          <div className="bg-white rounded-2xl p-10 text-center shadow-md">

            <div className="text-4xl mb-3">
              🔍
            </div>

            <h3 className="font-bold text-lg text-gray-800">
              Siswa tidak ditemukan
            </h3>

            <p className="text-gray-500 mt-2">
              Coba ubah kelas atau kata pencarian.
            </p>

          </div>

        ) : (

          <div className="space-y-3">

            {hasilPencarian.map((item) => (

              <button
                key={item.ID}
                onClick={() =>
                  bukaLaporan(item)
                }
                className="
                  w-full
                  text-left
                  bg-white
                  rounded-2xl
                  p-5
                  shadow-md
                  border
                  border-green-100
                  hover:shadow-xl
                  hover:border-green-400
                  hover:-translate-y-0.5
                  transition-all
                  group
                "
              >

                <div className="flex items-center gap-4">

                  {/* ICON */}
                  <div
                    className="
                      w-14
                      h-14
                      shrink-0
                      rounded-full
                      bg-green-100
                      flex
                      items-center
                      justify-center
                      text-2xl
                      group-hover:bg-green-700
                      transition
                    "
                  >
                    👤
                  </div>

                  {/* DATA */}
                  <div className="flex-1 min-w-0">

                    <h3 className="
                      font-bold
                      text-lg
                      text-gray-900
                      group-hover:text-green-700
                    ">
                      {item.Nama}
                    </h3>

                    {item.Program && (
                      <p className="text-sm text-gray-500">
                        Kelas: {item.Program}
                      </p>
                    )}

                    {item.Lokasi && (
                      <p className="text-xs text-gray-400 mt-1">
                        {item.Lokasi}
                      </p>
                    )}

                  </div>

                  {/* PANAH */}
                  <div className="
                    text-xl
                    text-gray-300
                    group-hover:text-green-700
                    transition
                  ">
                    →
                  </div>

                </div>

              </button>

            ))}

          </div>

        )}

      </div>
    </section>
  );
}