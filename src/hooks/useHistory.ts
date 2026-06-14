import { useCallback, useState } from 'react'
import type { HistoryEntry, ResultPayload } from '../types'

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([])

  const addToHistory = useCallback((data: ResultPayload) => {
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      imageUrl: data.imageUrl,
      label: data.label,
      confidence: data.confidence,
      inferenceTime: data.inferenceTime,
      timestamp: Date.now(),
    }
    setHistory((prev) => [entry, ...prev].slice(0, 50))
  }, [])

  const deleteFromHistory = useCallback((id: string) => {
    setHistory((prev) => prev.filter((e) => e.id !== id))
  }, [])

  return { history, addToHistory, deleteFromHistory }
}
