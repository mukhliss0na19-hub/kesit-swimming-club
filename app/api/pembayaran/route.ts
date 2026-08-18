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
          message: "ID siswa tidak ditemukan",
        },
        { status: 400 }
      );
    }

    const url =
      `${SCRIPT_URL}?action=getPembayaran&idSiswa=${encodeURIComponent(
        idSiswa
      )}`;

    const res = await fetch(url, {
  cache: "no-store",
});

const raw = await res.text();

console.log("PEMBAYARAN URL:", url);
console.log("PEMBAYARAN RAW:", raw);

const data = JSON.parse(raw);

return NextResponse.json(data);
  } catch (error) {
    console.error("API PEMBAYARAN:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data pembayaran",
      },
      { status: 500 }
    );
  }
}