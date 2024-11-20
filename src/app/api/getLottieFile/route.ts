// app/api/getLottieFile/route.ts

import { NextRequest, NextResponse } from 'next/server'
import axios, { AxiosError } from 'axios'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const cid = searchParams.get('cid')
  if (!cid) {
    return NextResponse.json({ error: 'Missing CID' }, { status: 400 })
  }

  const readerApiKey = process.env.READER_API_KEY
  if (!readerApiKey) {
    return NextResponse.json({ error: 'Missing API Key' }, { status: 500 })
  }

  try {
    const response = await axios.get(`https://ipfs-api.bakiverse.com/file/lottie`, {
      headers: {
        'X-API-Key': readerApiKey,
      },
      params: { cid },
      responseType: 'text', // Pour obtenir la réponse en texte brut
    })

    const contentType = response.headers['content-type'] || 'application/json'

    return new Response(response.data, {
      headers: {
        'Content-Type': contentType,
      },
    })
  } catch (error: unknown) {
    console.error(
      'Error while fetching Lottie file:',
      (error as AxiosError).response?.data || (error as AxiosError).message
    )
    return NextResponse.json(
      { error: 'Failed to fetch Lottie file' },
      { status: 500 }
    )
  }
}
