'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-cta">
          Oops! Page not found
        </h1>
        <p className="text-lg mb-2 text-threerd">
          It look like the page you&apos;re looking for doesn&apos;t exist.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="mr-4 px-4 py-2 bg-primary text-background rounded transition-all duration-300 hover:bg-first-hover"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
