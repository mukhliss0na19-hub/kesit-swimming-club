import { NextResponse } from "next/server";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby0TDHNXEhyccK9l0-jMJr7QU9bDu7UD1QXZZoECj_uMx2vrm5puntiq3D0iszyEFec/exec";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const idSiswa = searchParams.get("idSiswa");

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

    const url =
      `${SCRIPT_URL}?action=getProgressSiswa&idSiswa=${encodeURIComponent(
        idSiswa
      )}`;

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Apps Script HTTP ${response.status}`
      );
    }

    const text = await response.text();

    console.log(
      "RESPON RIWAYAT PROGRESS:",
      text
    );

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message:
            "Google Apps Script mengembalikan respon yang tidak valid.",
          raw: text,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error(
      "GET RIWAYAT PROGRESS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Gagal mengambil riwayat progress siswa.",
      },
      {
        status: 500,
      }
    );
  }
}