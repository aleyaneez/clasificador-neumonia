import { useCallback } from 'react'

interface Props {
  onImageSelected: (img: HTMLImageElement, url: string) => void
}

interface Sample {
  src: string
  label: 'Normal' | 'Neumonía'
}

const SAMPLES: Sample[] = [
  { src: '/samples/normal-01.jpg', label: 'Normal' },
  { src: '/samples/normal-02.jpg', label: 'Normal' },
  { src: '/samples/normal-03.jpg', label: 'Normal' },
  { src: '/samples/normal-04.jpg', label: 'Normal' },
  { src: '/samples/neumonia-01.jpg', label: 'Neumonía' },
  { src: '/samples/neumonia-02.jpg', label: 'Neumonía' },
  { src: '/samples/neumonia-03.jpg', label: 'Neumonía' },
  { src: '/samples/neumonia-04.jpg', label: 'Neumonía' },
]

function SampleBadge({ label }: { label: Sample['label'] }) {
  const isNormal = label === 'Normal'
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide border ${
        isNormal
          ? 'bg-[var(--success-bg)] text-[var(--success-text)] border-[var(--success-border)]'
          : 'bg-[var(--danger-bg)] text-[var(--danger-text)] border-[var(--danger-border)]'
      }`}
    >
      {isNormal ? (
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      ) : (
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
      )}
      {label}
    </span>
  )
}

export default function SampleGallery({ onImageSelected }: Props) {
  const handleClick = useCallback((src: string) => {
    const img = new Image()
    img.onload = () => onImageSelected(img, src)
    img.src = src
  }, [onImageSelected])

  return (
    <div className="w-full animate-[fade-slide-up_0.4s_ease-out]">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-[var(--border-subtle)]" />
        <span className="text-xs font-medium tracking-widest uppercase text-[var(--text-tertiary)]">
          Imagenes de muestra
        </span>
        <div className="flex-1 h-px bg-[var(--border-subtle)]" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {SAMPLES.map((sample, index) => (
          <button
            key={sample.src}
            type="button"
            onClick={() => handleClick(sample.src)}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-left transition-all duration-200 hover:border-accent/40 hover:ring-2 hover:ring-accent/20 focus:outline-none focus:ring-2 focus:ring-accent/40"
          >
            <div className="aspect-square overflow-hidden bg-[var(--bg-elevated)]">
              <img
                src={sample.src}
                alt={`Radiografia de muestra ${index + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-2">
              <SampleBadge label={sample.label} />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
