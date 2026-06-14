import type { InferenceProvider, ModelStatus } from '../types'
import { GhostButton } from '../components/Button'
import ProgressBar from '../components/ProgressBar'

interface Props {
  status: ModelStatus
  loadPct: number
  error: string | null
  provider: InferenceProvider
}

const PROVIDER_CONFIG: Record<InferenceProvider, { label: string; color: string }> = {
  webgpu: { label: 'GPU (WebGPU)', color: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
  webgl: { label: 'GPU (WebGL)', color: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20' },
  wasm: { label: 'CPU (WASM)', color: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20' },
  unknown: { label: 'Proveedor desconocido', color: 'bg-gray-500/15 text-gray-600 dark:text-gray-400 border-gray-500/20' },
}

function ProviderBadge({ provider }: { provider: InferenceProvider }) {
  if (provider === 'unknown') return null
  const config = PROVIDER_CONFIG[provider]
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {config.label}
    </span>
  )
}

export default function ModelLoader({ status, loadPct, error, provider }: Props) {
  return (
    <div className="w-full max-w-2xl flex flex-col items-center gap-8 mt-12">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          NeumonIA
        </h1>
      </div>

      {status === 'loading' && (
        <div className="flex flex-col items-center gap-4 w-full">
          <ProgressBar
            label="Cargando modelo"
            progress={loadPct > 0 ? loadPct : undefined}
          />
          <ProviderBadge provider={provider} />
        </div>
      )}

      {status === 'ready' && (
        <div className="flex flex-col items-center gap-4 animate-[fade-in_0.3s_ease-out]">
          <ProviderBadge provider={provider} />
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col items-center gap-4 text-center">
          <svg
            className="w-12 h-12 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
          <p className="text-sm text-foreground-secondary">
            Error al cargar el modelo
          </p>
          <p className="text-xs text-foreground-tertiary max-w-sm">
            {error}
          </p>
          <GhostButton
            size="sm"
            onClick={() => window.location.reload()}
            className="text-accent hover:text-accent-light"
          >
            Reintentar
          </GhostButton>
        </div>
      )}
    </div>
  )
}
