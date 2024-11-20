import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET() {
  const readerApiKey = process.env.WRITER_API_KEY

  try {
    const response = await axios.get('https://ipfs-api.bakiverse.com/docs/all', {
      headers: {
        'X-API-Key': readerApiKey,
      },
    });

    // Renvoyer les fichiers publics dans la réponse
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error while fetching public files:', error);
    return NextResponse.json({ error: 'Failed to fetch public files' }, { status: 500 });
  }
}
