'use client'

import { LuSave, LuServerOff } from 'react-icons/lu'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function GetFiles() {
  const router = useRouter()
  const [storeApiKey, setStoreApiKey] = useState<boolean>(false)
  const [apiKey, setApiKey] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const canBlurInput = apiKey.length > 0

  useEffect(() => {
    const storedApiKey = localStorage.getItem('apiKey')
    if (storedApiKey) {
      setApiKey(storedApiKey)
      router.push(`/user-files?api_key=${storedApiKey}`)
    }
  }, [router])
  const toggleStoreApiKey = () => {
    setStoreApiKey(!storeApiKey)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!apiKey) {
      setError('Please, enter an API Key.')
      return
    }

    if (storeApiKey) {
      localStorage.setItem('apiKey', apiKey)
    }

    setLoading(true)
    setError(null)

    try {
      router.push(`/user-files?api_key=${apiKey}`)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full mt-8 relative">
      <form
        className="flex items-center justify-center w-full"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="api_key">API Key</label>
          <input
          autoComplete="off"

            type="text"
            placeholder=""
            name="api_key"
            id="api_key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className={`p-2 border border-secondary rounded-lg w-full text-primary bg-transparent focus:outline-none  ${canBlurInput ? 'blur-sm focus:blur-none' : ''}`}
            autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          />
        </div>
        <button className="inline-block px-5 py-2 text-background rounded focus:outline-none bg-primary hover:bg-first-hover transition-one mt-6 ml-4">
          {loading ? 'Loading...' : 'Get files'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        type="button"
        className="absolute top-0 right-0"
        onClick={toggleStoreApiKey}
        title={storeApiKey ? 'Store API Key' : 'Use only 1 time'}
      >
        {storeApiKey ? <LuSave /> : <LuServerOff />}
      </button>
      <p className="text-sm text-gray-500 mt-8">
        To get your files we need an API Key.
      </p>
    </div>
  )
}
