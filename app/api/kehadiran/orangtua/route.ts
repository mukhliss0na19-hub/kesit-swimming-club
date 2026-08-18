import { NextResponse } from "next/server";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby0TDHNXEhyccK9l0-jMJr7QU9bDu7UD1QXZZoECj_uMx2vrm5puntiq3D0iszyEFec/exec";

// =====================================================
// AMBIL FIELD DARI OBJECT DENGAN AMAN
// =====================================================

function getField(row: any, field: string) {
  const key = Object.keys(row).find(
    (k) =>
      k.trim().toLowerCase() ===
      field.trim().toLowerCase()
  );

  return key ? row[key] : "";
}

// =====================================================
// GET RINGKASAN KEHADIRAN ORANG TUA
// =====================================================

export async function GET(request: Request) {
  try {
    // =================================================
    // AMBIL ID SISWA
    // =================================================

    const { searchParams } =
      new URL(request.url);

    const idSiswa =
      searchParams.get("idSiswa")?.trim();

    if (!idSiswa) {
      return NextResponse.json(
        {
          success: false,
          message: "ID siswa wajib diisi.",
        },
        {
          status: 400,
        }
      );
    }

    // =================================================
    // AMBIL RIWAYAT REGULER / PRIVAT
    // =================================================

    const resReguler =
      await fetch(
        `${SCRIPT_URL}?action=getRiwayat`,
        {
          cache: "no-store",
        }
      );

    if (!resReguler.ok) {
      throw new Error(
        "Gagal mengambil data Riwayat Absensi."
      );
    }

    const jsonReguler =
      await resReguler.json();

    const dataReguler =
      jsonReguler?.success &&
      Array.isArray(jsonReguler.data)
        ? jsonReguler.data
        : [];

    // =================================================
    // AMBIL RIWAYAT PRESTASI
    // =================================================

    const resPrestasi =
      await fetch(
        `${SCRIPT_URL}?action=getRiwayatPrestasi`,
        {
          cache: "no-store",
        }
      );

    if (!resPrestasi.ok) {
      throw new Error(
        "Gagal mengambil data Riwayat Prestasi."
      );
    }

    const jsonPrestasi =
      await resPrestasi.json();

    const dataPrestasi =
      jsonPrestasi?.success &&
      Array.isArray(jsonPrestasi.data)
        ? jsonPrestasi.data
        : [];

    // =================================================
    // FILTER REGULER / PRIVAT
    // =================================================

    const absensiReguler =
      dataReguler.filter(
        (row: any) =>
          String(
            getField(row, "ID")
          ).trim() === idSiswa
      );

    // =================================================
    // FILTER PRESTASI
    // =================================================

    const absensiPrestasi =
      dataPrestasi.filter(
        (row: any) =>
          String(
            getField(row, "ID")
          ).trim() === idSiswa
      );

    // =================================================
    // GABUNGKAN DATA
    // =================================================

    const semuaKehadiran = [
      ...absensiReguler,
      ...absensiPrestasi,
    ];

    // =================================================
    // HITUNG KEHADIRAN
    // =================================================

    let hadir = 0;
    let alpha = 0;

    semuaKehadiran.forEach(
      (row: any) => {
        const status =
          String(
            getField(row, "Status")
          )
            .trim()
            .toLowerCase();

        if (status === "hadir") {
          hadir++;
        }

        if (status === "alpha") {
          alpha++;
        }
      }
    );

    // =================================================
    // TOTAL
    // =================================================

    const total =
      semuaKehadiran.length;

    // =================================================
    // PERSENTASE
    // =================================================

    const persentase =
      total > 0
        ? Math.round(
            (hadir / total) * 100
          )
        : 0;

    // =================================================
    // RESPONSE
    // =================================================

    return NextResponse.json({
      success: true,

      data: {
        total,
        hadir,
        alpha,
        persentase,
      },
    });

  } catch (error) {

    console.error(
      "API KEHADIRAN ORANG TUA:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Gagal mengambil ringkasan kehadiran.",
      },
      {
        status: 500,
      }
    );
  }
}