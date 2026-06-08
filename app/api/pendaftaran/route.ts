import { NextResponse } from "next/server";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxGFM4YhUoqwgyvC1Dy6Z9zct8-uU9T6ooATrhULT9TkHRhC5F9GfTTUnXkokwOIwo/exec";

export async function GET() {
  try {
    const response = await fetch(
      SCRIPT_URL,
      {
        cache: "no-store",
      }
    );

    const data =
      await response.json();

    return NextResponse.json(
      data
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
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
      "updateStatus"
    );

    formData.append(
      "row",
      String(body.row)
    );

    formData.append(
      "status",
      body.status
    );

    formData.append(
      "id",
      body.id || ""
    );

    await fetch(SCRIPT_URL, {
      method: "POST",
      body: formData,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}