/* Ganti seluruh isi:
   app/laporan/siswa/progress/page.tsx
*/

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

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
  "ID Progress"?: string;
  "ID Siswa"?: string;
  Level?: number | string;
  "Indikator 1"?: number | string;
  "Indikator 2"?: number | string;
  "Indikator 3"?: number | string;
  "Indikator 4"?: number | string;
  "Indikator 5"?: number | string;
  "Indikator 6"?: number | string;
  "Indikator 7"?: number | string;
  "Nilai Akhir"?: number | string;
  Catatan?: string;
};

type MasterIndicator = {
  level: number;
  tujuan?: string;
  indikator: string;
};

function ProgressSiswaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [siswa, setSiswa] = useState<Siswa | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [detail, setDetail] = useState<DetailProgress | null>(null);
  const [master, setMaster] = useState<MasterIndicator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const idProgressParam = searchParams.get("idProgress");

  useEffect(() => {
    const data = sessionStorage.getItem("portalSiswa");

    if (!data) {
      router.replace("/");
      return;
    }

    try {
      const parsed = JSON.parse(data);

      if (!parsed?.idSiswa) throw new Error();

      setSiswa({
        idSiswa: String(parsed.idSiswa),
        namaSiswa: parsed.namaSiswa || "Siswa",
      });
    } catch {
      sessionStorage.removeItem("portalSiswa");
      router.replace("/");
    }
  }, [router]);

  useEffect(() => {
    const currentSiswa = siswa;

    if (!currentSiswa?.idSiswa) return;

    const idSiswa: string = currentSiswa.idSiswa;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const progressRes = await fetch(
          `/api/progress/riwayat?idSiswa=${encodeURIComponent(idSiswa)}`,
          { cache: "no-store" }
        );

        const progressJson = await progressRes.json();

        if (!progressRes.ok || !progressJson.success) {
          throw new Error(
            progressJson.message || "Gagal mengambil progress."
          );
        }

        const rows: Progress[] = Array.isArray(progressJson.data)
          ? progressJson.data
          : [];

        let selected =
          idProgressParam
            ? rows.find(
                (row) =>
                  String(row["ID Progress"] || "") ===
                  String(idProgressParam)
              ) || null
            : null;

        if (!selected) selected = rows[0] || null;

        setProgress(selected);

        const [masterRes, detailRes] = await Promise.all([
          fetch("/api/progress/master", { cache: "no-store" }),
          selected?.["ID Progress"]
            ? fetch(
                `/api/progress/detail?idProgress=${encodeURIComponent(
                  String(selected["ID Progress"])
                )}`,
                { cache: "no-store" }
              )
            : Promise.resolve(null),
        ]);

        const masterJson = await masterRes.json();

        if (masterRes.ok && masterJson.success) {
          setMaster(
            Array.isArray(masterJson.data) ? masterJson.data : []
          );
        }

        if (detailRes) {
          const detailJson = await detailRes.json();

          console.log("DETAIL PROGRESS:", detailJson);

          if (
            detailRes.ok &&
            detailJson.success &&
            Array.isArray(detailJson.data)
          ) {
            setDetail(detailJson.data[0] || null);
          } else {
            setDetail(null);
          }
        } else {
          setDetail(null);
        }
      } catch (err) {
        console.error("LOAD PROGRESS:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Gagal mengambil data progress."
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [siswa, idProgressParam]);

  const indicators = useMemo(() => {
    if (!progress || !detail) return [];

    const level = Number(progress.Level || detail.Level || 0);

    const masterLevel = master.filter(
      (item) => Number(item.level) === level
    );

    return masterLevel.map((item, index) => {
      const key = `Indikator ${index + 1}` as keyof DetailProgress;

      const value = Number(detail[key] ?? 0);

      return {
        nomor: index + 1,
        name: item.indikator,
        tujuan: item.tujuan || "",
        value: Number.isFinite(value)
          ? Math.max(0, Math.min(100, value))
          : 0,
      };
    });
  }, [progress, detail, master]);

  function formatDate(value: unknown) {
    if (!value) return "-";

    const date = new Date(String(value));

    if (Number.isNaN(date.getTime())) return String(value);

    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  function logout() {
    sessionStorage.removeItem("portalSiswa");
    router.push("/");
  }

  if (!siswa) {
    return (
      <main className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Memuat...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 px-4 py-5 sm:px-6">
      <div className="mx-auto w-full max-w-4xl">

        <header className="mb-4 flex items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-md">
          <div>
            <p className="text-xs text-gray-500">Portal Orang Tua</p>
            <h1 className="text-xl font-extrabold text-green-700 sm:text-2xl">
              {siswa.namaSiswa}
            </h1>
            <p className="text-xs text-gray-500">
              ID Siswa: {siswa.idSiswa}
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
          >
            Keluar
          </button>
        </header>

        <button
          onClick={() => router.push("/laporan/siswa")}
          className="mb-3 text-xs font-semibold text-green-700"
        >
          ← Kembali ke Laporan
        </button>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl bg-white p-8 text-center text-sm text-gray-500 shadow-md">
            Memuat detail progress...
          </div>
        ) : !progress ? (
          <div className="rounded-2xl bg-white p-8 text-center text-sm text-gray-500 shadow-md">
            Belum ada data progress siswa.
          </div>
        ) : (
          <>
            <section className="mb-3">
              <h2 className="text-xl font-extrabold text-gray-900">
                📊 Detail Perkembangan
              </h2>
              <p className="text-xs text-gray-500">
                Hasil evaluasi kemampuan siswa
              </p>
            </section>

            <section className="mb-4 rounded-2xl bg-white px-4 py-4 shadow-md">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <p className="text-[11px] text-gray-500">Level</p>
                  <p className="text-2xl font-extrabold text-green-600">
                    {progress.Level ?? "-"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-gray-500">Nilai Akhir</p>
                  <p className="text-2xl font-extrabold text-blue-600">
                    {progress["Nilai Akhir"] ?? "-"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-gray-500">Program</p>
                  <p className="mt-1 text-sm font-bold text-gray-800">
                    {progress.Program || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-gray-500">Tanggal</p>
                  <p className="mt-1 text-sm font-bold text-gray-800">
                    {formatDate(progress.Tanggal)}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 border-t border-gray-100 pt-3 text-xs">
                <span>
                  <b>Hasil:</b>{" "}
                  <span className="font-semibold text-green-700">
                    {progress.Keputusan || "-"}
                  </span>
                </span>
                <span>
                  <b>Pelatih:</b> {progress.Pelatih || "-"}
                </span>
                <span>
                  <b>ID Progress:</b> {progress["ID Progress"] || "-"}
                </span>
              </div>
            </section>

            <section className="mb-4 rounded-2xl bg-white px-4 py-4 shadow-md">
              <div className="mb-3">
                <h3 className="text-sm font-bold text-gray-900">
                  Detail Indikator Level {progress.Level}
                </h3>
                <p className="text-xs text-gray-500">
                  Pencapaian setiap kemampuan yang dinilai
                </p>
              </div>

              {!detail ? (
                <div className="rounded-xl bg-yellow-50 px-3 py-4 text-xs text-yellow-700">
                  Detail penilaian belum berhasil dimuat.
                </div>
              ) : indicators.length === 0 ? (
                <div className="rounded-xl bg-gray-50 px-3 py-4 text-xs text-gray-500">
                  Indikator untuk level ini belum tersedia.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
                  {indicators.map((item) => (
                    <div key={`${item.nomor}-${item.name}`}>
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <p className="truncate text-xs text-gray-700">
                          {item.nomor}. {item.name}
                        </p>
                        <span className="shrink-0 text-xs font-bold text-green-700">
                          {item.value}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-green-500 transition-all"
                          style={{ width: `${item.value}%` }}
                        />
                      </div>

                      {item.tujuan && (
                        <p className="mt-1 truncate text-[10px] text-gray-400">
                          {item.tujuan}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-2xl bg-white px-4 py-3 shadow-md">
              <div className="mb-1 flex items-center gap-2">
                <span className="text-lg">📝</span>
                <h3 className="text-sm font-bold text-gray-900">
                  Catatan Pelatih
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-gray-600">
                {progress.Catatan ||
                  detail?.Catatan ||
                  "Belum ada catatan pelatih."}
              </p>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

export default function ProgressSiswaPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center text-sm text-gray-500">
          Memuat...
        </main>
      }
    >
      <ProgressSiswaContent />
    </Suspense>
  );
}