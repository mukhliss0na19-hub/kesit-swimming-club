import { NextResponse } from "next/server";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxGFM4YhUoqwgyvC1Dy6Z9zct8-uU9T6ooATrhULT9TkHRhC5F9GfTTUnXkokwOIwo/exec";

export async function GET() {
  try {

    const res =
      await fetch(
        `${SCRIPT_URL}?action=getAbsensi`,
        {
          cache:
            "no-store",
        }
      );

    const data =
      await res.json();

    return NextResponse.json(
      data
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Gagal mengambil data",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: Request
) {
  try {

    const body =
      await request.json();

    const formData =
      new URLSearchParams();

    formData.append(
      "action",
      "absensi"
    );

    formData.append(
      "id",
      body.id
    );

    const res =
      await fetch(
        SCRIPT_URL,
        {
          method: "POST",
          body: formData,
        }
      );

    const data =
      await res.json();

    return NextResponse.json(
      data
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Gagal absensi",
      },
      {
        status: 500,
      }
    );
  }
}