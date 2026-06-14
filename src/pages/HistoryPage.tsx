import type { HistoryEntry } from '../types'
import HistoryList from '../components/HistoryList'

interface Props {
  history: HistoryEntry[]
  onDelete: (id: string) => void
  onSelect: (entry: HistoryEntry) => void
}

export default function HistoryPage({ history, onDelete, onSelect }: Props) {
  return (
    <div className="w-full max-w-3xl flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">
          Historial
        </h1>
        <p className="mt-1 text-sm text-muted">
          Predicciones recientes
        </p>
      </div>
      <HistoryList entries={history} onDelete={onDelete} onSelect={onSelect} />
      <p className="text-center pt-8 text-xs text-[var(--text-tertiary)]">
          El historial se borra al cerrar la página
      </p>
    </div>
  )
}
