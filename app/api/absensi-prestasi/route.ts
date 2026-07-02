import { NextResponse } from "next/server";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxGFM4YhUoqwgyvC1Dy6Z9zct8-uU9T6ooATrhULT9TkHRhC5F9GfTTUnXkokwOIwo/exec";

export async function POST(request: Request) {
  try {

    const body =
      await request.json();

    const params =
      new URLSearchParams();

    params.append(
      "action",
      "absensiPrestasi"
    );

    Object.entries(body).forEach(
      ([key, value]) => {

        params.append(
          key,
          String(value)
        );

      }
    );

    const res =
      await fetch(
        SCRIPT_URL,
        {
          method: "POST",
          body: params
        }
      );

    const data =
      await res.json();

    return NextResponse.json(
      data
    );

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message:
          "Server Error"
      },
      {
        status: 500
      }
    );

  }
}