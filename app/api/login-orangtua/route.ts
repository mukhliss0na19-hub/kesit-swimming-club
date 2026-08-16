import { NextResponse } from "next/server";
import crypto from "crypto";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby0TDHNXEhyccK9l0-jMJr7QU9bDu7UD1QXZZoECj_uMx2vrm5puntiq3D0iszyEFec/exec";

function buatToken(
  idSiswa: string,
  namaSiswa: string
) {
  const payload = {
    idSiswa,
    namaSiswa,
    exp: Date.now() + 1000 * 60 * 60 * 8,
  };

  const data = Buffer
    .from(JSON.stringify(payload))
    .toString("base64url");

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

    // =================================================
    // AMBIL DATA DARI FORM LOGIN
    // =================================================

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


    // =================================================
    // VALIDASI
    // =================================================

    if (!idSiswa || !password) {

      return NextResponse.json({
        success: false,
        message:
          "ID siswa dan password wajib diisi",
      });

    }


    // =================================================
    // BUAT URL APPS SCRIPT
    // =================================================

    const params =
      new URLSearchParams({
        action: "loginOrangTua",
        idSiswa,
        password,
      });

    const url =
      `${SCRIPT_URL}?${params.toString()}`;


    console.log(
      "Login orang tua:",
      idSiswa
    );


    // =================================================
    // PANGGIL GOOGLE APPS SCRIPT
    // =================================================

    const res =
      await fetch(
        url,
        {
          method: "GET",
          cache: "no-store",
        }
      );


    // =================================================
    // CEK RESPONSE APPS SCRIPT
    // =================================================

    const text =
      await res.text();

    console.log(
      "Response Apps Script:",
      text
    );


    let data;

    try {

      data =
        JSON.parse(text);

    } catch {

      console.error(
        "Response Apps Script bukan JSON:",
        text
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Response dari server Google tidak valid",
        },
        {
          status: 500,
        }
      );

    }


    // =================================================
    // LOGIN GAGAL
    // =================================================

    if (!data.success) {

      return NextResponse.json(
        data,
        {
          status: 401,
        }
      );

    }


    // =================================================
    // VALIDASI DATA LOGIN
    // =================================================

    if (
      !data.data ||
      !data.data.idSiswa ||
      !data.data.namaSiswa
    ) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Data siswa dari server tidak lengkap",
        },
        {
          status: 500,
        }
      );

    }


    // =================================================
    // BUAT SESSION TOKEN
    // =================================================

    const token =
      buatToken(
        data.data.idSiswa,
        data.data.namaSiswa
      );


    // =================================================
    // RESPONSE
    // =================================================

    const response =
      NextResponse.json({

        success: true,

        message:
          "Login berhasil",

        data: {

          idSiswa:
            data.data.idSiswa,

          namaSiswa:
            data.data.namaSiswa,

          idAkun:
            data.data.idAkun || "",

        },

      });


    // =================================================
    // SIMPAN SESSION COOKIE
    // =================================================

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
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan server",
      },
      {
        status: 500,
      }
    );

  }
}