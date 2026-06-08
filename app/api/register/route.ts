export async function POST(
  request: Request
) {
  try {

    const body =
      await request.json();

    console.log(
      "DATA MASUK:",
      body
    );

    const formData =
      new URLSearchParams();

    Object.entries(body)
      .forEach(
        ([key, value]) => {
          formData.append(
            key,
            String(value)
          );
        }
      );

    const response =
      await fetch(
        "https://script.google.com/macros/s/AKfycbxGFM4YhUoqwgyvC1Dy6Z9zct8-uU9T6ooATrhULT9TkHRhC5F9GfTTUnXkokwOIwo/exec",
        {
          method: "POST",
          body: formData,
        }
      );

    const text =
      await response.text();

    console.log(
      "GOOGLE RESPONSE:",
      text
    );

    return Response.json({
      success: true,
    });

  } catch (error) {

    console.error(
      "REGISTER ERROR:",
      error
    );

    return Response.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}