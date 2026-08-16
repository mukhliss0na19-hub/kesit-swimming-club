import { NextResponse } from "next/server";
import crypto from "crypto";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby0TDHNXEhyccK9l0-jMJr7QU9bDu7UD1QXZZoECj_uMx2vrm5puntiq3D0iszyEFec/exec";
function buatToken(
  idPelatih: string,
  namaPelatih: string
) {
  const payload = {
    idPelatih,
    namaPelatih,
    exp: Date.now() + 1000 * 60 * 60 * 8,
  };

  const data = Buffer.from(
    JSON.stringify(payload)
  ).toString("base64url");

  const secret =
    process.env.PELATIH_SESSION_SECRET ||
    process.env.PORTAL_SESSION_SECRET;

  if (!secret) {
    throw new Error(
      "PELATIΗ_SESSION_SECRET belum diatur"
    );
  }

  const signature = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("base64url");

  return `${data}.${signature}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const idPelatih = String(
      body.idPelatih || ""
    ).trim();

    const password = String(
      body.password || ""
    ).trim();

    if (!idPelatih || !password) {
      return NextResponse.json(
        {
          success: false,
          message:
            "ID Pelatih dan password wajib diisi.",
        },
        { status: 400 }
      );
    }

    const url =
      `${SCRIPT_URL}?action=loginPelatih` +
      `&idPelatih=${encodeURIComponent(idPelatih)}` +
      `&password=${encodeURIComponent(password)}`;

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(
        `Apps Script HTTP ${res.status}`
      );
    }

    const data = await res.json();

    if (!data.success) {
      return NextResponse.json(data);
    }

    const token = buatToken(
      data.data.idPelatih,
      data.data.namaPelatih
    );

    const response = NextResponse.json({
      success: true,
      message: "Login pelatih berhasil.",
      data: {
        idPelatih:
          data.data.idPelatih,
        namaPelatih:
          data.data.namaPelatih,
        status:
          data.data.status,
        spesialis:
          data.data.spesialis,
      },
    });

    response.cookies.set(
      "pelatih_session",
      token,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 8,
      }
    );

    return response;
  } catch (error) {
    console.error(
      "LOGIN PELATIH ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Tidak dapat terhubung ke server.",
      },
      { status: 500 }
    );
  }
}