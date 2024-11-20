import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(request: Request) {
  const readerApiKey = process.env.READER_API_KEY
  const { searchParams } = new URL(request.url)
  const cid = searchParams.get('cid')

  if (!cid) {
    return new NextResponse('CID manquant', { status: 400 })
  }

  try {
    const response = await axios.get(`http://ipfs-api.bakiverse.com/file?cid=${cid}`, {
      responseType: 'arraybuffer',
      headers: {
        'X-API-Key': readerApiKey,
      },
    })

    const mimeType = response.headers['content-type']
    const contentDisposition = response.headers['content-disposition']

    return new NextResponse(response.data, {
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': contentDisposition || '',
      },
    })
  } catch (error) {
    console.error('Error while getting file preview:', error)
    return new NextResponse('Error while getting file preview', {
      status: 500,
    })
  }
}
