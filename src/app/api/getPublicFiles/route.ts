import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '10';
  const readerApiKey = process.env.READER_API_KEY

  try {
    const response = await axios.get('https://ipfs-api.bakiverse.com/public-files', {
      headers: {
        'X-API-Key': readerApiKey,
      },
      params: {
        page,
        limit,
      },
    });

    // Renvoyer les fichiers publics dans la réponse
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error while fetching public files:', error);
    return NextResponse.json({ error: 'Failed to fetch public files' }, { status: 500 });
  }
}
