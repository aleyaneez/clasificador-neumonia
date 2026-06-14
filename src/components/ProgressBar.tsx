interface Props {
  label?: string
  progress?: number
}

export default function ProgressBar({ label = 'Cargando modelo...', progress }: Props) {
  const isIndeterminate = progress === undefined

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto">
      <div className="relative w-full h-1.5 bg-surface-elevated rounded-full overflow-hidden">
        {isIndeterminate ? (
          <div
            className="absolute inset-0 rounded-full animate-[shimmer_1.5s_ease-in-out_infinite]"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.5) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
            }}
          />
        ) : (
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        )}
      </div>
      <p className="text-xs text-foreground-tertiary font-medium tracking-wide uppercase">
        {isIndeterminate ? label : `${label} ${Math.round(progress)}%`}
      </p>
    </div>
  )
}
