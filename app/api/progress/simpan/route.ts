import { NextResponse } from "next/server";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxGFM4YhUoqwgyvC1Dy6Z9zct8-uU9T6ooATrhULT9TkHRhC5F9GfTTUnXkokwOIwo/exec";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const url =
      `${SCRIPT_URL}?action=simpanProgress`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const text = await response.text();

    console.log("RESPON APPS SCRIPT:", text);

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
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(
      "SIMPAN PROGRESS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Gagal menyimpan progress siswa.",
      },
      {
        status: 500,
      }
    );
  }
}