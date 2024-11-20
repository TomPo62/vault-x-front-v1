import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const email = await request.json();
    const response = await axios.post(
      "https://baki-main-api.bakiverse.com/api/gen-api-key-by-email",
      email,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data, { statusText: "API Key created successfully", status: 200 });
  } catch (e: unknown) {
    console.error("Error while creating API Key:", e);
    return NextResponse.json(
      {
        message: (e as AxiosError).message || "Error while creating API Key",
      },
      { status: (e as AxiosError).response?.status || 500 }
    );
  }
}
