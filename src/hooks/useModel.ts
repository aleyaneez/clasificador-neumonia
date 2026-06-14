import { useEffect, useState } from 'react'
import { loadModel } from '../inference'
import type { InferenceProvider, ModelStatus } from '../types'

export function useModel() {
  const [status, setStatus] = useState<ModelStatus>('loading')
  const [loadPct, setLoadPct] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [provider, setProvider] = useState<InferenceProvider>('unknown')

  useEffect(() => {
    let cancelled = false

    loadModel(
      (pct) => {
        if (!cancelled) setLoadPct(pct)
      },
      (providerName) => {
        if (!cancelled) setProvider(providerName as InferenceProvider)
      },
    )
      .then(() => {
        if (!cancelled) setStatus('ready')
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setStatus('error')
          setError(err instanceof Error ? err.message : 'Failed to load model')
        }
      })

    return () => { cancelled = true }
  }, [])

  return {
    modelStatus: status,
    modelLoadPct: loadPct,
    modelError: error,
    isReady: status === 'ready',
    modelProvider: provider,
  }
}
