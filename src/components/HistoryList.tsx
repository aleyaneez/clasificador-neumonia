import type { HistoryEntry } from '../types'
import { IconButton } from './Button'

interface Props {
  entries: HistoryEntry[]
  onDelete: (id: string) => void
  onSelect: (entry: HistoryEntry) => void
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Ahora'
  if (mins < 60) return `Hace ${mins} min`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `Hace ${hours}h`
  const days = Math.floor(hours / 24)
  return `Hace ${days}d`
}

export default function HistoryList({ entries, onDelete, onSelect }: Props) {
  if (entries.length === 0) {
    return (
      <div className="animate-[fade-slide-up_0.4s_ease-out] flex flex-col items-center justify-center py-20 px-6">
        <div className="w-16 h-16 rounded-2xl bg-surface-elevated flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-foreground-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-foreground-secondary">Sin predicciones</p>
        <p className="mt-1 text-xs text-foreground-tertiary">
          Las radiografias que analices apareceran aqui
        </p>
      </div>
    )
  }

  return (
    <div className="animate-[fade-slide-up_0.4s_ease-out] flex flex-col gap-2">
      {entries.map((entry) => {
        const isPneumonia = entry.label === 'Neumonia detectada'
        const badgeColor = isPneumonia
          ? 'bg-danger text-danger-foreground'
          : 'bg-success text-success-foreground'

        return (
          <button
            key={entry.id}
            type="button"
            onClick={() => onSelect(entry)}
            className="flex items-center gap-3 p-3 rounded-xl bg-glass backdrop-blur-xl border border-border text-left hover:bg-hover transition-all duration-200 group"
          >
            <img
              src={entry.imageUrl}
              alt=""
              className="w-14 h-14 rounded-lg object-cover shrink-0 bg-surface-elevated"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold px-1.5 py-0.5 rounded-md ${badgeColor}`}>
                  {entry.label}
                </span>
                <span className="text-sm text-foreground-tertiary font-mono tabular-nums">
                  {Math.round(entry.confidence * 100)}%
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-foreground-tertiary">{timeAgo(entry.timestamp)}</span>
                <span className="text-sm text-foreground-tertiary">&middot;</span>
                <span className="text-sm text-foreground-tertiary font-mono">{entry.inferenceTime.toFixed(1)}ms</span>
              </div>
            </div>
            <IconButton
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(entry.id)
              }}
              className="opacity-0 group-hover:opacity-100"
              aria-label="Eliminar"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </IconButton>
          </button>
        )
      })}
    </div>
  )
}
