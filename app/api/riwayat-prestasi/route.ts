import { NextResponse } from "next/server";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxGFM4YhUoqwgyvC1Dy6Z9zct8-uU9T6ooATrhULT9TkHRhC5F9GfTTUnXkokwOIwo/exec";

export async function GET() {

  try {

    const res =
      await fetch(
        `${SCRIPT_URL}?action=getRiwayatPrestasi`,
        {
          cache: "no-store"
        }
      );

    const data =
      await res.json();

    return NextResponse.json(data);

  } catch {

    return NextResponse.json(
      {
        success: false
      },
      {
        status: 500
      }
    );

  }

}