interface Props {
  imageUrl: string
  alt?: string
}

export default function ImagePreview({ imageUrl, alt = 'Radiografía de tórax' }: Props) {
  return (
    <div className="animate-[fade-slide-up_0.4s_ease-out]">
      <div className="relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-2xl">
        <img
          src={imageUrl}
          alt={alt}
          className="w-full max-h-[520px] object-contain"
        />
        <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-[var(--border-color)]" />
      </div>
    </div>
  )
}
