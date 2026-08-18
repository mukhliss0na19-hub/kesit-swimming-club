/* app/laporan/siswa/page.tsx */

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Siswa = {
  idSiswa: string;
  namaSiswa: string;
};

type Progress = {
  "ID Progress"?: string;
  "ID Siswa"?: string;
  Nama?: string;
  Program?: string;
  Level?: number | string;
  Tanggal?: string;
  Pelatih?: string;
  "Nilai Akhir"?: number | string;
  Keputusan?: string;
  Catatan?: string;
};

type DetailProgress = {
  [key: string]: string | number | undefined;
};

type MasterIndikator = {
  level: number | string;
  tujuan?: string;
  indikator: string;
};

export default function LaporanSiswaPage() {
  const router = useRouter();

  const [siswa, setSiswa] = useState<Siswa | null>(null);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [detailProgress, setDetailProgress] =
    useState<DetailProgress | null>(null);
  const [masterIndikator, setMasterIndikator] =
    useState<MasterIndikator[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // LOGIN PORTAL SISWA
  // =========================
  useEffect(() => {
    const raw = sessionStorage.getItem("portalSiswa");

    if (!raw) {
      router.replace("/");
      return;
    }

    try {
      const parsed = JSON.parse(raw);

      if (!parsed?.idSiswa) {
        throw new Error("Data siswa tidak lengkap.");
      }

      setSiswa({
        idSiswa: String(parsed.idSiswa),
        namaSiswa: String(parsed.namaSiswa || "Siswa"),
      });
    } catch {
      sessionStorage.removeItem("portalSiswa");
      router.replace("/");
    }
  }, [router]);

  // =========================
  // AMBIL PROGRESS
  // =========================
  useEffect(() => {
    if (!siswa?.idSiswa) return;

    async function loadProgress() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `/api/progress/riwayat?idSiswa=${encodeURIComponent(
            siswa.idSiswa
          )}`,
          { cache: "no-store" }
        );

        const json = await res.json();

        if (!res.ok || !json.success) {
          throw new Error(
            json.message || "Gagal mengambil progress siswa."
          );
        }

        setProgress(
          Array.isArray(json.data) ? json.data : []
        );
      } catch (err) {
        console.error("LOAD PROGRESS:", err);
        setProgress([]);
        setError(
          err instanceof Error
            ? err.message
            : "Gagal mengambil progress siswa."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProgress();
  }, [siswa]);

  // =========================
  // AMBIL MASTER LEVEL
  // =========================
  useEffect(() => {
    async function loadMaster() {
      try {
        const res = await fetch(
          "/api/progress/master",
          { cache: "no-store" }
        );

        const json = await res.json();

        if (!res.ok || !json.success) {
          throw new Error(
            json.message || "Gagal mengambil Master Level."
          );
        }

        setMasterIndikator(
          Array.isArray(json.data) ? json.data : []
        );
      } catch (err) {
        console.error("LOAD MASTER:", err);
      }
    }

    loadMaster();
  }, []);

  // =========================
  // AMBIL DETAIL PROGRESS
  // =========================
  const latestProgress =
    progress.length > 0 ? progress[0] : null;

  useEffect(() => {
    const idProgress =
      latestProgress?.["ID Progress"];

    if (!idProgress) {
      setDetailProgress(null);
      return;
    }

    async function loadDetail() {
      try {
        setLoadingDetail(true);

        const res = await fetch(
          `/api/progress/detail?idProgress=${encodeURIComponent(
            String(idProgress)
          )}`,
          { cache: "no-store" }
        );

        const json = await res.json();

        console.log(
          "DETAIL PROGRESS SISWA:",
          json
        );

        if (!res.ok || !json.success) {
          throw new Error(
            json.message ||
              "Gagal mengambil detail progress."
          );
        }

        const row =
          Array.isArray(json.data)
            ? json.data[0]
            : null;

        setDetailProgress(row || null);
      } catch (err) {
        console.error(
          "LOAD DETAIL PROGRESS:",
          err
        );
        setDetailProgress(null);
      } finally {
        setLoadingDetail(false);
      }
    }

    loadDetail();
  }, [latestProgress]);

  const currentLevel =
    latestProgress
      ? Number(latestProgress.Level || 0)
      : 0;

  const latestScore =
    latestProgress
      ? Number(
          latestProgress["Nilai Akhir"] || 0
        )
      : 0;

  // =========================
  // INDIKATOR
  // =========================
  const latestIndicators = useMemo(() => {
    if (!detailProgress || !currentLevel) {
      return [];
    }

    const master =
      masterIndikator.filter(
        (item) =>
          Number(item.level) ===
          currentLevel
      );

    return master.map(
      (item, index) => {
        const nomor = index + 1;

        /*
         * PENTING:
         * Detail Progress Anda sudah terbukti
         * mengembalikan:
         *
         * "Indikator 1": 100
         * "Indikator 2": 100
         * dst.
         *
         * Jadi nilai diambil langsung dari
         * Detail Progress.
         */
        const key =
          `Indikator ${nomor}`;

        const raw =
          detailProgress[key];

        const value =
          typeof raw === "number"
            ? raw
            : Number(raw ?? 0);

        return {
          nomor,
          indikator:
            item.indikator,
          tujuan:
            item.tujuan || "",
          nilai:
            Number.isFinite(value)
              ? Math.max(
                  0,
                  Math.min(100, value)
                )
              : 0,
        };
      }
    );
  }, [
    detailProgress,
    masterIndikator,
    currentLevel,
  ]);

  function formatTanggal(
    value?: string
  ) {
    if (!value) return "-";

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return value;
    }

    return date.toLocaleDateString(
      "id-ID",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  }

  function logout() {
    sessionStorage.removeItem(
      "portalSiswa"
    );

    router.push("/");
  }

  if (!siswa) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100">
        <div className="text-gray-500">
          Memuat portal siswa...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-4 md:p-6">

      <div className="max-w-5xl mx-auto space-y-5">

        {/* HEADER */}

        <section className="bg-white rounded-2xl shadow-md p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <p className="text-xs text-gray-500">
              Portal Orang Tua
            </p>

            <h1 className="text-2xl font-black text-green-700">
              {siswa.namaSiswa}
            </h1>

            <p className="text-sm text-gray-500">
              ID Siswa: {siswa.idSiswa}
            </p>
          </div>

          <button
            onClick={logout}
            className="border border-red-200 text-red-600 rounded-lg px-4 py-2 text-sm hover:bg-red-50"
          >
            Keluar
          </button>

        </section>

        {/* ERROR */}

        {error && (
          <section className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm">
            {error}
          </section>
        )}

        {/* PROGRESS */}

        <section>

          <div className="mb-3">
            <h2 className="text-xl font-black text-slate-900">
              🏊 Perkembangan Kemampuan
            </h2>

            <p className="text-sm text-gray-500">
              Perkembangan kemampuan siswa
            </p>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl shadow-md p-6 text-sm text-gray-500">
              Memuat data progress...
            </div>
          ) : latestProgress ? (

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              <div className="bg-white rounded-2xl shadow-md p-5">
                <p className="text-xs text-gray-500">
                  Level Saat Ini
                </p>

                <p className="text-3xl font-black text-green-700 mt-1">
                  {currentLevel || "-"}
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-5">
                <p className="text-xs text-gray-500">
                  Nilai Terakhir
                </p>

                <p className="text-3xl font-black text-blue-600 mt-1">
                  {latestScore}
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-5">
                <p className="text-xs text-gray-500">
                  Hasil Evaluasi
                </p>

                <p className="text-xl font-black text-slate-900 mt-2">
                  {latestProgress.Keputusan ||
                    "-"}
                </p>
              </div>

            </div>

          ) : (

            <div className="bg-white rounded-2xl shadow-md p-6 text-sm text-gray-500">
              Belum ada data progress siswa.
            </div>

          )}

        </section>

        {/* DETAIL KEMAMPUAN */}

        {latestProgress && (

          <section className="bg-white rounded-2xl shadow-md p-5">

            <div className="flex items-center justify-between mb-4">

              <div>
                <h2 className="text-lg font-black text-slate-900">
                  📊 Detail Kemampuan
                </h2>

                <p className="text-xs text-gray-500">
                  Indikator Level {currentLevel}
                </p>
              </div>

              {latestProgress.Tanggal && (
                <p className="text-xs text-gray-500">
                  {formatTanggal(
                    latestProgress.Tanggal
                  )}
                </p>
              )}

            </div>

            {loadingDetail ? (

              <div className="text-sm text-gray-500 py-4">
                Memuat detail kemampuan...
              </div>

            ) : latestIndicators.length > 0 ? (

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                {latestIndicators.map(
                  (item) => (

                    <div
                      key={`${item.nomor}-${item.indikator}`}
                      className="border border-gray-100 rounded-xl p-3"
                    >

                      <div className="flex items-center justify-between gap-3 mb-2">

                        <p className="text-xs font-semibold text-gray-700">
                          {item.nomor}.{" "}
                          {item.indikator}
                        </p>

                        <span className="shrink-0 text-sm font-black text-green-700">
                          {item.nilai}%
                        </span>

                      </div>

                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">

                        <div
                          className="h-full bg-green-600 rounded-full"
                          style={{
                            width:
                              `${item.nilai}%`,
                          }}
                        />

                      </div>

                      {item.tujuan && (
                        <p className="text-[10px] text-gray-400 mt-1 truncate">
                          {item.tujuan}
                        </p>
                      )}

                    </div>

                  )
                )}

              </div>

            ) : (

              <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-500">
                Detail indikator belum tersedia.
              </div>

            )}

          </section>

        )}

        {/* CATATAN */}

        {latestProgress && (

          <section className="bg-white rounded-2xl shadow-md p-5">

            <h2 className="text-lg font-black mb-2">
              📝 Catatan Pelatih
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed">
              {latestProgress.Catatan ||
                detailProgress?.Catatan ||
                "Belum ada catatan pelatih."}
            </p>

          </section>

        )}

      </div>

    </main>
  );
}