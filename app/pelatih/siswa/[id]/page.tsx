"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Siswa = {
  ID?: string;
  Nama?: string;
  Program?: string;
  Grup?: string;
  Pelatih?: string;
  Lokasi?: string;
  Status?: string;
};

type MasterItem = {
  level: number;
  tujuan: string;
  indikator: string;
  no: number;
};

const LEVELS = [1, 2, 3, 4, 5, 6];

const SKOR = [
  { nilai: 0, keterangan: "Belum bisa" },
  { nilai: 1, keterangan: "Bisa dengan bantuan" },
  { nilai: 2, keterangan: "Bisa mandiri" },
  { nilai: 3, keterangan: "Bisa dengan baik dan konsisten" },
];

function teks(value: unknown): string {
  return String(value ?? "")
    .replace(/^\uFEFF/, "")
    .replace(/\u00A0/g, " ")
    .trim();
}

function ambilKolom(row: Record<string, unknown>, nama: string): string {
  const key = Object.keys(row).find(
    (k) => teks(k).toLowerCase() === nama.toLowerCase()
  );

  return key ? teks(row[key]) : "";
}

export default function DetailSiswaPage() {
  const params = useParams();
  const router = useRouter();

  const id = teks(params?.id);

  const [siswa, setSiswa] = useState<Siswa | null>(null);
  const [pelatihLogin, setPelatihLogin] = useState("");
  const [master, setMaster] = useState<MasterItem[]>([]);
  const [levelAktif, setLevelAktif] = useState(1);
  const [skor, setSkor] = useState<Record<string, number>>({});
  const [catatan, setCatatan] = useState("");
const [menyimpan, setMenyimpan] = useState(false);
const [pesanSimpan, setPesanSimpan] = useState("");
  const [loadingSiswa, setLoadingSiswa] = useState(true);
  const [loadingMaster, setLoadingMaster] = useState(true);
  const [errorSiswa, setErrorSiswa] = useState("");
  const [errorMaster, setErrorMaster] = useState("");

  // =========================
  // AMBIL SISWA
  // =========================
  useEffect(() => {
    if (!id) return;

    let aktif = true;
    const storedPelatih = sessionStorage.getItem("pelatih");

    if (storedPelatih) {
      try {
        const dataPelatih = JSON.parse(storedPelatih);

        if (aktif) {
          setPelatihLogin(
            teks(dataPelatih?.namaPelatih)
          );
        }
      } catch (error) {
        console.error(
          "DATA PELATIH LOGIN TIDAK VALID:",
          error
        );
      }
    }
    async function loadSiswa() {
      try {
        setLoadingSiswa(true);
        setErrorSiswa("");

        const response = await fetch("/api/siswa", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`API siswa HTTP ${response.status}`);
        }

        const json = await response.json();

        const data = Array.isArray(json)
          ? json
          : Array.isArray(json?.data)
          ? json.data
          : [];

        const ditemukan = data.find(
          (item: Siswa) =>
            teks(item.ID).toLowerCase() === id.toLowerCase()
        );

        if (!ditemukan) {
          throw new Error("Data siswa tidak ditemukan.");
        }

        if (aktif) setSiswa(ditemukan);
      } catch (error) {
        console.error("ERROR SISWA:", error);

        if (aktif) {
          setErrorSiswa(
            error instanceof Error
              ? error.message
              : "Gagal mengambil data siswa."
          );
        }
      } finally {
        if (aktif) setLoadingSiswa(false);
      }
    }

    loadSiswa();

    return () => {
      aktif = false;
    };
  }, [id]);

  // =========================
  // AMBIL MASTER LEVEL
  // =========================
  useEffect(() => {
    let aktif = true;

    async function loadMaster() {
      try {
        setLoadingMaster(true);
        setErrorMaster("");

        const response = await fetch("/api/progress/master", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            `API Master Level HTTP ${response.status}`
          );
        }

        const json = await response.json();

        console.log("MASTER API RESPONSE:", json);

        const rows: Record<string, unknown>[] =
          Array.isArray(json)
            ? json
            : Array.isArray(json?.data)
            ? json.data
            : [];

        console.log("MASTER ROWS:", rows);

        if (rows.length === 0) {
          throw new Error("Data Master Level kosong.");
        }

        let levelSekarang = 0;
        let tujuanSekarang = "";
        const nomor: Record<number, number> = {};
        const hasil: MasterItem[] = [];

        for (const row of rows) {
          const levelText =
            ambilKolom(row, "Level") ||
            ambilKolom(row, "level");

          const tujuanText =
            ambilKolom(row, "Tujuan") ||
            ambilKolom(row, "tujuan");

          const indikatorText =
            ambilKolom(row, "Indikator Penilaian") ||
            ambilKolom(row, "indikator penilaian") ||
            ambilKolom(row, "Indikator") ||
            ambilKolom(row, "indikator");

          // Jika baris mempunyai level, pindah ke level tersebut.
          if (levelText !== "") {
            const angka = Number.parseInt(levelText, 10);

            if (Number.isInteger(angka) && angka >= 1 && angka <= 6) {
              levelSekarang = angka;
              nomor[angka] = 0;

              if (tujuanText !== "") {
                tujuanSekarang = tujuanText;
              }
            }
          }

          // Tujuan tetap digunakan untuk baris indikator berikutnya.
          if (tujuanText !== "") {
            tujuanSekarang = tujuanText;
          }

          // Baris tanpa indikator tidak dimasukkan.
          if (levelSekarang === 0 || indikatorText === "") {
            continue;
          }

          nomor[levelSekarang] =
            (nomor[levelSekarang] || 0) + 1;

          hasil.push({
            level: levelSekarang,
            no: nomor[levelSekarang],
            tujuan: tujuanSekarang,
            indikator: indikatorText,
          });
        }

        console.log("MASTER HASIL FINAL:", hasil);
        console.log(
          "JUMLAH LEVEL:",
          LEVELS.map(
            (level) =>
              `Level ${level}: ${
                hasil.filter((x) => x.level === level).length
              } indikator`
          )
        );

        if (hasil.length === 0) {
          throw new Error(
            "Master terbaca, tetapi indikator tidak berhasil diproses."
          );
        }

        if (aktif) setMaster(hasil);
      } catch (error) {
        console.error("ERROR MASTER LEVEL:", error);

        if (aktif) {
          setErrorMaster(
            error instanceof Error
              ? error.message
              : "Gagal mengambil Master Level."
          );
        }
      } finally {
        if (aktif) setLoadingMaster(false);
      }
    }

    loadMaster();

    return () => {
      aktif = false;
    };
  }, []);

  const indikatorAktif = useMemo(
    () => master.filter((item) => item.level === levelAktif),
    [master, levelAktif]
  );

  const tujuanAktif = indikatorAktif[0]?.tujuan || "";

  const jumlahDinilai = indikatorAktif.filter(
  (_, index) =>
    skor[`${levelAktif}-${index}`] !== undefined
).length;

  const totalSkor = indikatorAktif.reduce(
  (total, _, index) =>
    total + (skor[`${levelAktif}-${index}`] ?? 0),
  0
);

  const nilaiAkhir =
    indikatorAktif.length > 0
      ? Math.round(
          (totalSkor / (indikatorAktif.length * 3)) * 100
        )
      : 0;

  const lengkap =
    indikatorAktif.length > 0 &&
    jumlahDinilai === indikatorAktif.length;

  const keputusan =
    !lengkap
      ? "Belum dinilai"
      : nilaiAkhir >= 80
      ? "Tercapai"
      : "Belum";

  function pilihSkor(no: number, nilai: number) {
    setSkor((sebelumnya) => ({
      ...sebelumnya,
      [`${levelAktif}-${no}`]: nilai,
    }));
  }
async function simpanProgress() {
  if (!siswa) return;

  if (!lengkap) {
    setPesanSimpan(
      "Semua indikator harus diberi nilai terlebih dahulu."
    );
    return;
  }

  try {
    setMenyimpan(true);
    setPesanSimpan("");

    const indikator = indikatorAktif.map((item, index) => {
      const idIndikator = `${levelAktif}-${index}`;
      const nilai = skor[idIndikator];

      return {
        no: index + 1,
        indikator: item.indikator,
        skor: nilai,
        status: nilai >= 2 ? "Tercapai" : "Belum",
      };
    });

    const response = await fetch("/api/progress/simpan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idSiswa: siswa.ID,
        nama: siswa.Nama,
        program: siswa.Program,
        level: levelAktif,
        pelatih: pelatihLogin,
        nilaiAkhir,
        keputusan,
        catatan,
        indikator,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message || "Gagal menyimpan penilaian."
      );
    }

    setPesanSimpan(
      result.message || "Penilaian berhasil disimpan."
    );
  } catch (error) {
    console.error("ERROR SIMPAN PROGRESS:", error);

    setPesanSimpan(
      error instanceof Error
        ? error.message
        : "Gagal menyimpan penilaian."
    );
  } finally {
    setMenyimpan(false);
  }
}
  if (loadingSiswa) {
    return (
      <main className="min-h-screen bg-[#F7FFF9] p-6">
        <div className="mx-auto max-w-5xl py-16 text-center text-gray-500">
          Memuat data siswa...
        </div>
      </main>
    );
  }

  if (!siswa) {
    return (
      <main className="min-h-screen bg-[#F7FFF9] p-6">
        <div className="mx-auto max-w-5xl">
          <button
            onClick={() => router.back()}
            className="mb-5 font-semibold text-[#0B6B32] hover:underline"
          >
            ← Kembali
          </button>

          <div className="rounded-xl bg-red-50 p-5 text-red-600">
            {errorSiswa || "Data siswa tidak ditemukan."}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7FFF9] px-4 py-7">
      <div className="mx-auto max-w-5xl">

        <button
          onClick={() => router.back()}
          className="mb-5 text-sm font-semibold text-[#0B6B32] hover:underline"
        >
          ← Kembali ke daftar siswa
        </button>

        {/* IDENTITAS SISWA */}
        <section className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Data Siswa</p>

          <div className="mt-1 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#0B6B32]">
                {siswa.Nama || "-"}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                ID: {siswa.ID || "-"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              <Info label="Program" value={siswa.Program} />
              <Info label="Pelatih" value={siswa.Pelatih} />
              <Info label="Lokasi" value={siswa.Lokasi} />
              <Info label="Status" value={siswa.Status} />
            </div>
          </div>
        </section>

        {/* PROGRESS */}
        <section className="mt-5 rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800">
            Progress Siswa
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Pilih level kemudian berikan skor pada setiap indikator.
          </p>

          {/* PILIH LEVEL */}
          <div className="mt-5 grid grid-cols-3 gap-2 md:grid-cols-6">
            {LEVELS.map((level) => {
              const aktif = levelAktif === level;

              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setLevelAktif(level)}
                  className={`rounded-xl border px-3 py-2.5 text-sm font-bold transition ${
                    aktif
                      ? "border-[#0B6B32] bg-[#0B6B32] text-white shadow-sm"
                      : "border-gray-200 bg-white text-gray-800 hover:border-[#0B6B32] hover:bg-[#0B6B32] hover:text-white"
                  }`}
                >
                  Level {level}
                </button>
              );
            })}
          </div>

          {loadingMaster ? (
            <div className="mt-5 rounded-xl bg-gray-50 p-8 text-center text-sm text-gray-500">
              Memuat Master Level...
            </div>
          ) : errorMaster ? (
            <div className="mt-5 rounded-xl bg-red-50 p-5 text-sm text-red-600">
              {errorMaster}
            </div>
          ) : indikatorAktif.length === 0 ? (
            <div className="mt-5 rounded-xl bg-red-50 p-8 text-center text-sm text-red-600">
              Indikator Level {levelAktif} tidak ditemukan.
              <div className="mt-1 text-xs text-gray-500">
                Master Level berhasil diakses tetapi tidak ada indikator
                yang cocok dengan Level {levelAktif}.
              </div>
            </div>
          ) : (
            <>
              {/* TUJUAN */}
              <div className="mt-5 rounded-xl bg-green-50 px-4 py-3">
                <div className="text-sm font-bold text-[#0B6B32]">
                  Level {levelAktif}
                </div>

                <div className="mt-0.5 text-sm text-gray-700">
                  {tujuanAktif || "-"}
                </div>
              </div>

              {/* PETUNJUK */}
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-600">
                {SKOR.map((item) => (
                  <span
                    key={item.nilai}
                    className="rounded-lg bg-gray-50 px-2 py-1"
                  >
                    {item.nilai} = {item.keterangan}
                  </span>
                ))}
              </div>

              {/* RINGKASAN */}
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                <span className="rounded-lg bg-gray-50 px-3 py-1.5 text-gray-600">
                  Dinilai: {jumlahDinilai}/{indikatorAktif.length}
                </span>

                <span className="rounded-lg bg-gray-50 px-3 py-1.5 text-gray-600">
                  Nilai: {nilaiAkhir}%
                </span>

                <span
                  className={`rounded-lg px-3 py-1.5 font-semibold ${
                    keputusan === "Tercapai"
                      ? "bg-green-50 text-[#0B6B32]"
                      : "bg-gray-50 text-gray-500"
                  }`}
                >
                  {keputusan}
                </span>
              </div>

              {/* HEADER */}
              <div className="mt-3 hidden grid-cols-[40px_minmax(0,1fr)_180px_90px] gap-2 rounded-t-xl bg-gray-50 px-3 py-2 text-xs font-bold text-gray-500 md:grid">
                <div>No</div>
                <div>Indikator</div>
                <div className="text-center">Skor</div>
                <div className="text-center">Status</div>
              </div>

              {/* INDIKATOR */}
<div className="overflow-hidden rounded-xl border border-gray-200 md:rounded-t-none">
  {indikatorAktif.map((item, index) => {
    // ID UNIK UNTUK SETIAP INDIKATOR
    const idIndikator = `${levelAktif}-${index}`;

    // Ambil nilai khusus indikator ini
    const nilai = skor[idIndikator];

    const status =
      nilai === undefined
        ? "Belum dinilai"
        : nilai >= 2
        ? "Tercapai"
        : "Belum";

    return (
      <div
        key={idIndikator}
        className="border-b border-gray-100 px-3 py-2.5 last:border-b-0 hover:bg-gray-50"
      >
        <div className="grid gap-2 md:grid-cols-[40px_minmax(0,1fr)_180px_90px] md:items-center">

          {/* NOMOR */}
          <div className="text-sm font-semibold text-gray-400">
            {index + 1}
          </div>

          {/* INDIKATOR */}
          <div className="text-sm text-gray-800">
            {item.indikator}
          </div>

          {/* SKOR */}
          <div className="flex gap-1 md:justify-center">
            {SKOR.map((itemSkor) => {
              const aktif =
                nilai === itemSkor.nilai;

              return (
                <button
                  key={`${idIndikator}-${itemSkor.nilai}`}
                  type="button"
                  title={itemSkor.keterangan}
                  onClick={() => {
                    setSkor((sebelumnya) => ({
                      ...sebelumnya,
                      [idIndikator]: itemSkor.nilai,
                    }));
                  }}
                  className={`h-8 w-9 rounded-lg border text-xs font-bold transition ${
                    aktif
                      ? "border-[#0B6B32] bg-[#0B6B32] text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-[#0B6B32] hover:bg-green-50"
                  }`}
                >
                  {itemSkor.nilai}
                </button>
              );
            })}
          </div>

          {/* STATUS */}
          <div
            className={`text-center text-xs font-semibold ${
              status === "Tercapai"
                ? "text-[#0B6B32]"
                : "text-gray-400"
            }`}
          >
            {status}
          </div>

        </div>
      </div>
    );
  })}
</div>
              {/* CATATAN */}
              <div className="mt-4">
                <label className="text-sm font-semibold text-gray-700">
                  Catatan
                </label>

                <textarea
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  rows={3}
                  placeholder="Catatan pelatih..."
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#0B6B32]"
                />
              </div>

              {/* TOMBOL SIMPAN */}
              <div className="mt-4 flex justify-end">
                <button
  type="button"
  onClick={simpanProgress}
  disabled={menyimpan || !lengkap}
  className={`rounded-xl px-5 py-2.5 text-sm font-bold text-white transition ${
    menyimpan || !lengkap
      ? "cursor-not-allowed bg-gray-400"
      : "bg-[#0B6B32] hover:bg-[#04461F]"
  }`}
>
  {menyimpan ? "Menyimpan..." : "Simpan Penilaian"}
</button>
              </div>
              {pesanSimpan && (
  <div
    className={`mt-3 rounded-xl px-4 py-3 text-sm ${
      pesanSimpan.toLowerCase().includes("berhasil")
        ? "bg-green-50 text-[#0B6B32]"
        : "bg-red-50 text-red-600"
    }`}
  >
    {pesanSimpan}
  </div>
)}
            </>
          )}
        </section>
      </div>
    </main>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="min-w-[120px] rounded-xl bg-gray-50 px-3 py-2">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-0.5 text-sm font-bold text-gray-800">
        {value || "-"}
      </p>
    </div>
  );
}