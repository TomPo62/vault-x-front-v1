// app/api/getPubFileByCID/route.ts
import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Récupérer le paramètre `cid` de la requête
    const { searchParams } = new URL(request.url);
    const cid = searchParams.get("cid");
    const apiKey = process.env.READER_API_KEY

    if (!cid) {
      return NextResponse.json({ error: "CID is required" }, { status: 400 });
    }

    // Effectuer la requête au backend avec l'API Key
    const response = await axios.get(
      "https://ipfs-api.bakiverse.com/file/public",
      {
        params: { cid },
        headers: {
          "X-API-Key": apiKey || "",
        },
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (e: unknown) {
    console.error("Error while fetching public file by CID:", e);

    return NextResponse.json(
      {
        error: (e as AxiosError).response?.data || "Error while fetching file",
      },
      { status: (e as AxiosError).response?.status || 500 }
    );
  }
}
