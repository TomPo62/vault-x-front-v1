import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { apiKey, page = 1, limit = 10 } = body

    if (!apiKey) {
      return NextResponse.json({ error: 'Missing API Key' }, { status: 400 })
    }

    const response = await axios.get('https://ipfs-api.bakiverse.com/private-files', {
      headers: {
        'X-API-Key': apiKey,
      },
      params: {
        page,
        limit,
      },
    })

    return NextResponse.json(response.data)
  } catch (error) {
    console.error('Error while fetching private files:', error)
    return NextResponse.json(
      { error: 'Failed to fetch private files' },
      { status: 500 }
    )
  }
}
