'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    console.error('Captured Error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold text-red-500">
            Oops! There is an error..
          </h1>
          <p className="mt-4 text-lg">{error.message}</p>
          <div className="mt-6">
            <button
              onClick={() => reset()}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Retry
            </button>
            <button
              onClick={() => router.push('/')}
              className="ml-4 px-4 py-2 bg-gray-500 text-white rounded"
            >
             Back to Home
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
