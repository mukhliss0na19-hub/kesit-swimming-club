import { NextResponse } from "next/server";
import crypto from "crypto";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxGFM4YhUoqwgyvC1Dy6Z9zct8-uU9T6ooATrhULT9TkHRhC5F9GfTTUnXkokwOIwo/exec";

function buatToken(
  idSiswa: string,
  namaSiswa: string
) {
  const payload = {
    idSiswa,
    namaSiswa,
    exp:
      Date.now() +
      1000 * 60 * 60 * 8,
  };

  const data =
    Buffer.from(
      JSON.stringify(payload)
    ).toString("base64url");

  const secret =
    process.env.PORTAL_SESSION_SECRET;

  if (!secret) {
    throw new Error(
      "PORTAL_SESSION_SECRET belum diatur"
    );
  }

  const signature =
    crypto
      .createHmac("sha256", secret)
      .update(data)
      .digest("base64url");

  return `${data}.${signature}`;
}

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const idSiswa =
      String(
        body.idSiswa || ""
      ).trim();

    const password =
      String(
        body.password || ""
      ).trim();

    if (!idSiswa || !password) {
      return NextResponse.json({
        success: false,
        message:
          "ID siswa dan password wajib diisi",
      });
    }

    const params =
      new URLSearchParams();

    params.append(
      "action",
      "loginOrangTua"
    );

    params.append(
      "idSiswa",
      idSiswa
    );

    params.append(
      "password",
      password
    );

  const url =
  `${SCRIPT_URL}?action=loginOrangTua` +
  `&idSiswa=${encodeURIComponent(idSiswa)}` +
  `&password=${encodeURIComponent(password)}`;

const res =
  await fetch(
    url,
    {
      method: "GET",
      cache: "no-store",
    }
  );

    const data =
      await res.json();

    if (!data.success) {
      return NextResponse.json(data);
    }

    const token =
      buatToken(
        data.data.idSiswa,
        data.data.namaSiswa
      );

    const response =
      NextResponse.json({
        success: true,
        message:
          "Login berhasil",
        data: {
          namaSiswa:
            data.data.namaSiswa,
        },
      });

    response.cookies.set(
      "portal_session",
      token,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "lax",
        path: "/",
        maxAge:
          60 * 60 * 8,
      }
    );

    return response;

  } catch (error) {

    console.error(
      "LOGIN ORANG TUA ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Terjadi kesalahan server",
      },
      {
        status: 500,
      }
    );
  }
}