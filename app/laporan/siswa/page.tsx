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

type DetailProgress = Record<
  string,
  string | number | undefined
>;

type MasterIndikator = {
  level: number | string;
  tujuan?: string;
  indikator: string;
};

type Kehadiran = {
  total: number;
  hadir: number;
  alpha: number;
  persentase: number;
};

type RiwayatPembayaran = {
  tanggal?: string;
  status?: string;
};

type PembayaranCurrent = {
  idSiswa?: string;
  nama?: string;
  program?: string;
  kuota?: string | number;
  status?: string;
  tanggalBayar?: string;
};

type Pembayaran = {
  current: PembayaranCurrent | null;
  history: RiwayatPembayaran[];
};

export default function LaporanSiswaPage() {
  const router = useRouter();

  const [siswa, setSiswa] = useState<Siswa | null>(null);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [detailProgress, setDetailProgress] =
    useState<DetailProgress | null>(null);
  const [masterIndikator, setMasterIndikator] =
    useState<MasterIndikator[]>([]);
  const [kehadiran, setKehadiran] =
    useState<Kehadiran | null>(null);
  const [pembayaran, setPembayaran] =
    useState<Pembayaran | null>(null);

  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [loadingKehadiran, setLoadingKehadiran] =
    useState(false);
  const [loadingPembayaran, setLoadingPembayaran] =
    useState(false);

  // =====================================================
  // SESSION
  // =====================================================

  useEffect(() => {
    const raw = sessionStorage.getItem("portalSiswa");

    if (!raw) {
      router.replace("/");
      return;
    }

    try {
      const data = JSON.parse(raw);

      if (!data?.idSiswa) {
        throw new Error("Data siswa tidak lengkap");
      }

      setSiswa({
        idSiswa: String(data.idSiswa),
        namaSiswa: String(data.namaSiswa || "Siswa"),
      });
    } catch (error) {
      console.error(error);
      sessionStorage.removeItem("portalSiswa");
      router.replace("/");
    }
  }, [router]);

  // =====================================================
  // PROGRESS
  // =====================================================

  useEffect(() => {
    if (!siswa?.idSiswa) return;

    async function load() {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/progress/riwayat?idSiswa=${encodeURIComponent(
            siswa.idSiswa
          )}`,
          { cache: "no-store" }
        );

        const json = await res.json();

        setProgress(
          json.success && Array.isArray(json.data)
            ? json.data
            : []
        );
      } catch (error) {
        console.error("PROGRESS:", error);
        setProgress([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [siswa]);

  // =====================================================
  // MASTER
  // =====================================================

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          "/api/progress/master",
          { cache: "no-store" }
        );

        const json = await res.json();

        setMasterIndikator(
          json.success && Array.isArray(json.data)
            ? json.data
            : []
        );
      } catch (error) {
        console.error("MASTER:", error);
      }
    }

    load();
  }, []);

  // =====================================================
  // SORT
  // =====================================================

  const sortedProgress = useMemo(() => {
    return [...progress].sort((a, b) => {
      return (
        new Date(b.Tanggal || "").getTime() -
        new Date(a.Tanggal || "").getTime()
      );
    });
  }, [progress]);

  const latestProgress =
    sortedProgress[0] || null;

  const currentLevel = Number(
    latestProgress?.Level || 0
  );

  const latestScore = Number(
    latestProgress?.["Nilai Akhir"] || 0
  );

  // =====================================================
  // DETAIL
  // =====================================================

  useEffect(() => {
    const idProgress =
      latestProgress?.["ID Progress"];

    if (!idProgress) {
      setDetailProgress(null);
      return;
    }

    async function load() {
      try {
        setLoadingDetail(true);

        const res = await fetch(
          `/api/progress/detail?idProgress=${encodeURIComponent(
            String(idProgress)
          )}`,
          { cache: "no-store" }
        );

        const json = await res.json();

        const data = Array.isArray(json.data)
          ? json.data[0]
          : json.data;

        setDetailProgress(
          json.success ? data || null : null
        );
      } catch (error) {
        console.error("DETAIL:", error);
        setDetailProgress(null);
      } finally {
        setLoadingDetail(false);
      }
    }

    load();
  }, [latestProgress]);

  // =====================================================
  // KEHADIRAN
  // =====================================================

  useEffect(() => {
    if (!siswa?.idSiswa) return;

    async function load() {
      try {
        setLoadingKehadiran(true);

        const res = await fetch(
          `/api/kehadiran/orangtua?idSiswa=${encodeURIComponent(
            siswa.idSiswa
          )}`,
          { cache: "no-store" }
        );

        const json = await res.json();
        const data = json.data;

        if (json.success) {
          setKehadiran({
            total: Number(data?.total) || 0,
            hadir: Number(data?.hadir) || 0,
            alpha: Number(data?.alpha) || 0,
            persentase:
              Number(data?.persentase) || 0,
          });
        }
      } catch (error) {
        console.error("KEHADIRAN:", error);
      } finally {
        setLoadingKehadiran(false);
      }
    }

    load();
  }, [siswa]);

  // =====================================================
  // PEMBAYARAN
  // =====================================================

  useEffect(() => {
    if (!siswa?.idSiswa) return;

    async function load() {
      try {
        setLoadingPembayaran(true);

        const res = await fetch(
          `/api/pembayaran?idSiswa=${encodeURIComponent(
            siswa.idSiswa
          )}`,
          { cache: "no-store" }
        );

        const json = await res.json();

        if (json.success) {
          setPembayaran({
            current: json.data?.current || null,
            history: Array.isArray(json.data?.history)
              ? json.data.history
              : [],
          });
        }
      } catch (error) {
        console.error("PEMBAYARAN:", error);
      } finally {
        setLoadingPembayaran(false);
      }
    }

    load();
  }, [siswa]);

  // =====================================================
  // INDIKATOR
  // =====================================================

  const indicators = useMemo(() => {
    if (!detailProgress || !currentLevel) {
      return [];
    }

    return masterIndikator
      .filter(
        (item) =>
          Number(item.level) === currentLevel
      )
      .map((item, index) => {
        const raw =
          detailProgress[`Indikator ${index + 1}`];

        const nilai = Math.max(
          0,
          Math.min(100, Number(raw) || 0)
        );

        return {
          nomor: index + 1,
          indikator: item.indikator,
          nilai,
        };
      });
  }, [
    detailProgress,
    masterIndikator,
    currentLevel,
  ]);

  // =====================================================
  // FORMAT TANGGAL
  // =====================================================

  function formatTanggal(value?: string) {
    if (!value) return "-";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  // =====================================================
  // LOGOUT
  // =====================================================

  function logout() {
    sessionStorage.removeItem("portalSiswa");
    router.push("/");
  }

  // =====================================================
  // LOADING
  // =====================================================

  if (!siswa) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f5f8f6]">
        <div className="w-7 h-7 border-3 border-[#0B6B32]/20 border-t-[#0B6B32] rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f8f6] text-slate-800">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="bg-[#0B6B32] text-white">
        <div className="max-w-3xl mx-auto px-4 py-4">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-[9px] uppercase tracking-[0.15em] text-white/60">
                Portal Orang Tua
              </p>

              <h1 className="text-lg font-bold mt-0.5">
                {siswa.namaSiswa}
              </h1>

              <p className="text-[10px] text-white/60">
                {siswa.idSiswa}
              </p>
            </div>

            <button
              onClick={logout}
              className="text-[10px] px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20"
            >
              Keluar
            </button>

          </div>

        </div>
      </header>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="max-w-3xl mx-auto px-4 py-3 space-y-3">

        {/* =================================================
            PEMBAYARAN + KEHADIRAN
        ================================================= */}

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          {/* PEMBAYARAN */}

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3.5">

            <div className="flex items-center justify-between mb-3">

              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center text-xs">
                  💳
                </span>

                <span className="text-xs font-bold">
                  Pembayaran
                </span>
              </div>

              <span
                className={`text-[9px] font-bold px-2 py-1 rounded-full ${
                  pembayaran?.current?.status
                    ?.toLowerCase()
                    .includes("lunas")
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {pembayaran?.current?.status?.toUpperCase() ||
                  "-"}
              </span>

            </div>

            {loadingPembayaran ? (
              <div className="h-10 bg-gray-50 rounded-lg animate-pulse" />
            ) : (
              <div className="grid grid-cols-2 gap-3">

                <div>
                  <p className="text-[9px] text-gray-400">
                    Program
                  </p>

                  <p className="text-xs font-semibold mt-0.5">
                    {pembayaran?.current?.program || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] text-gray-400">
                    Paket
                  </p>

                  <p className="text-xs font-semibold mt-0.5">
                    {pembayaran?.current?.kuota
                      ? `${pembayaran.current.kuota}x`
                      : "-"}
                  </p>
                </div>

              </div>
            )}

            {pembayaran?.current && (
              <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between">
                <span className="text-[9px] text-gray-400">
                  Bayar
                </span>

                <span className="text-[10px] font-semibold">
                  {pembayaran.current.tanggalBayar
                    ? formatTanggal(
                        pembayaran.current.tanggalBayar
                      )
                    : "-"}
                </span>
              </div>
            )}

            {pembayaran?.history &&
              pembayaran.history.length > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <p className="text-[9px] text-gray-400 mb-1">
                    Riwayat
                  </p>

                  {pembayaran.history
                    .slice(0, 3)
                    .map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-[9px] py-0.5"
                      >
                        <span className="text-gray-400">
                          {formatTanggal(
                            item.tanggal
                          )}
                        </span>

                        <span className="font-semibold">
                          {item.status || "-"}
                        </span>
                      </div>
                    ))}
                </div>
              )}

          </div>

          {/* KEHADIRAN */}

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3.5">

            <div className="flex items-center justify-between mb-3">

              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-xs">
                  🗓️
                </span>

                <span className="text-xs font-bold">
                  Kehadiran
                </span>
              </div>

              <span className="text-lg font-black text-[#0B6B32]">
                {kehadiran?.persentase || 0}%
              </span>

            </div>

            {loadingKehadiran ? (
              <div className="h-12 bg-gray-50 rounded-lg animate-pulse" />
            ) : (
              <div className="grid grid-cols-3 gap-2">

                <div className="text-center bg-gray-50 rounded-lg py-2">
                  <p className="text-[8px] text-gray-400">
                    Total
                  </p>
                  <p className="text-sm font-bold">
                    {kehadiran?.total || 0}
                  </p>
                </div>

                <div className="text-center bg-green-50 rounded-lg py-2">
                  <p className="text-[8px] text-green-600">
                    Hadir
                  </p>
                  <p className="text-sm font-bold text-green-700">
                    {kehadiran?.hadir || 0}
                  </p>
                </div>

                <div className="text-center bg-red-50 rounded-lg py-2">
                  <p className="text-[8px] text-red-500">
                    Alpha
                  </p>
                  <p className="text-sm font-bold text-red-600">
                    {kehadiran?.alpha || 0}
                  </p>
                </div>

              </div>
            )}

          </div>

        </section>

        {/* =================================================
            PERKEMBANGAN
        ================================================= */}

        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">

          <div className="flex items-center justify-between mb-3">

            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  🏊
                </span>

                <h2 className="text-xs font-bold">
                  Perkembangan
                </h2>
              </div>

              {latestProgress?.Tanggal && (
                <p className="text-[9px] text-gray-400 mt-1">
                  Evaluasi{" "}
                  {formatTanggal(
                    latestProgress.Tanggal
                  )}
                </p>
              )}
            </div>

            {latestProgress?.Keputusan && (
              <span className="text-[9px] font-bold text-green-700 bg-green-50 px-2 py-1 rounded-full">
                {latestProgress.Keputusan}
              </span>
            )}

          </div>

          {loading ? (
            <div className="h-16 bg-gray-50 rounded-lg animate-pulse" />
          ) : latestProgress ? (

            <>
              <div className="grid grid-cols-3 divide-x divide-gray-100">

                <div className="text-center">
                  <p className="text-[9px] text-gray-400">
                    Level
                  </p>
                  <p className="text-xl font-black text-[#0B6B32]">
                    {currentLevel || "-"}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-[9px] text-gray-400">
                    Nilai
                  </p>
                  <p className="text-xl font-black text-blue-600">
                    {latestScore}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-[9px] text-gray-400">
                    Pelatih
                  </p>
                  <p className="text-[10px] font-semibold mt-1.5 px-1 truncate">
                    {latestProgress.Pelatih || "-"}
                  </p>
                </div>

              </div>

              <div className="mt-3">
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0B6B32] rounded-full"
                    style={{
                      width: `${Math.max(
                        0,
                        Math.min(100, latestScore)
                      )}%`,
                    }}
                  />
                </div>
              </div>

            </>
          ) : (
            <p className="text-[10px] text-gray-400">
              Belum ada data perkembangan.
            </p>
          )}

        </section>

        {/* =================================================
            DETAIL KEMAMPUAN
        ================================================= */}

        {latestProgress && (
          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">

            <div className="flex justify-between items-center mb-3">

              <div>
                <h2 className="text-xs font-bold">
                  📊 Kemampuan Renang
                </h2>

                <p className="text-[9px] text-gray-400 mt-0.5">
                  Level {currentLevel}
                </p>
              </div>

              <span className="text-[9px] text-gray-400">
                {indicators.length} indikator
              </span>

            </div>

            {loadingDetail ? (
              <div className="space-y-3">
                {[1, 2, 3].map((x) => (
                  <div
                    key={x}
                    className="h-6 bg-gray-50 rounded animate-pulse"
                  />
                ))}
              </div>
            ) : indicators.length > 0 ? (

              <div className="space-y-3">

                {indicators.map((item) => (
                  <div key={item.nomor}>

                    <div className="flex justify-between items-center mb-1">

                      <div className="flex items-center gap-2 min-w-0">

                        <span className="w-5 h-5 rounded bg-green-50 text-[#0B6B32] text-[8px] font-bold flex items-center justify-center flex-shrink-0">
                          {String(item.nomor).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <span className="text-[10px] text-gray-600 truncate">
                          {item.indikator}
                        </span>

                      </div>

                      <span className="text-[9px] font-bold text-[#0B6B32] ml-2">
                        {item.nilai}%
                      </span>

                    </div>

                    <div className="ml-7 h-1 bg-gray-100 rounded-full overflow-hidden">

                      <div
                        className="h-full bg-[#0B6B32] rounded-full"
                        style={{
                          width: `${item.nilai}%`,
                        }}
                      />

                    </div>

                  </div>
                ))}

              </div>

            ) : (
              <p className="text-[10px] text-gray-400">
                Detail kemampuan belum tersedia.
              </p>
            )}

          </section>
        )}

        {/* =================================================
            CATATAN
        ================================================= */}

        {latestProgress && (
          <section className="bg-[#0B6B32] rounded-xl px-4 py-3 text-white">

            <div className="flex gap-3 items-start">

              <span className="text-sm">
                📝
              </span>

              <div>
                <p className="text-[9px] text-white/60 uppercase tracking-wide">
                  Catatan Pelatih
                </p>

                <p className="text-[10px] leading-5 mt-0.5 text-white/90">
                  {latestProgress.Catatan ||
                    detailProgress?.Catatan ||
                    "Belum ada catatan."}
                </p>
              </div>

            </div>

          </section>
        )}

        {/* =================================================
            RIWAYAT
        ================================================= */}

        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">

          <div className="flex items-center justify-between mb-3">

            <div>
              <h2 className="text-xs font-bold">
                📈 Riwayat Perkembangan
              </h2>

              <p className="text-[9px] text-gray-400">
                Evaluasi sebelumnya
              </p>
            </div>

            <span className="text-[9px] text-gray-400">
              {sortedProgress.length} data
            </span>

          </div>

          {loading ? (
            <p className="text-[10px] text-gray-400">
              Memuat...
            </p>
          ) : sortedProgress.length > 0 ? (

            <div className="divide-y divide-gray-100">

              {sortedProgress.map(
                (item, index) => (

                  <div
                    key={
                      item["ID Progress"] ||
                      `${item.Tanggal}-${index}`
                    }
                    className="flex items-center justify-between py-2"
                  >

                    <div className="flex items-center gap-2">

                      <span className="w-1.5 h-1.5 rounded-full bg-[#0B6B32]" />

                      <div>
                        <p className="text-[10px] font-semibold">
                          {formatTanggal(
                            item.Tanggal
                          )}
                        </p>

                        <p className="text-[8px] text-gray-400">
                          {item.Pelatih || "Pelatih"}
                        </p>
                      </div>

                    </div>

                    <div className="flex items-center gap-1.5">

                      <span className="px-1.5 py-1 rounded bg-green-50 text-[8px] font-bold text-green-700">
                        L{item.Level || "-"}
                      </span>

                      <span className="px-1.5 py-1 rounded bg-blue-50 text-[8px] font-bold text-blue-600">
                        {item["Nilai Akhir"] ?? "-"}
                      </span>

                    </div>

                  </div>

                )
              )}

            </div>

          ) : (
            <p className="text-[10px] text-gray-400">
              Belum ada riwayat.
            </p>
          )}

        </section>

        <p className="text-center text-[8px] text-gray-400 py-1">
          Kesit Swimming Club
        </p>

      </div>
    </main>
  );
}