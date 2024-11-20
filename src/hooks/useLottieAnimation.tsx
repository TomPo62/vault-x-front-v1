// src/hooks/useLottieAnimation.ts

import { useState, useEffect } from 'react'
import axios, { AxiosError } from 'axios'

export default function useLottieAnimation(cid: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [animationData, setAnimationData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(!!cid)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!cid) return

    const fetchAnimation = async () => {
      try {
        const response = await axios.get(`/api/getLottieFile`, {
          params: { cid },
        })
        setAnimationData(response.data)
      } catch (err: unknown) {
        console.error('Error while fetching animation', err)
        setError((err as AxiosError).message || 'Error while fetching animation')
      } finally {
        setLoading(false)
      }
    }

    fetchAnimation()
  }, [cid])

  return { animationData, loading, error }
}
