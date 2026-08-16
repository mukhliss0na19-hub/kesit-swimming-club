import { NextResponse } from "next/server";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby0TDHNXEhyccK9l0-jMJr7QU9bDu7UD1QXZZoECj_uMx2vrm5puntiq3D0iszyEFec/exec";

export async function GET() {
  try {
    const res = await fetch(
      `${SCRIPT_URL}?action=getMasterLevel`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(
        `Apps Script HTTP ${res.status}`
      );
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(
      "GET MASTER LEVEL ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Gagal mengambil Master Level.",
      },
      {
        status: 500,
      }
    );
  }
}