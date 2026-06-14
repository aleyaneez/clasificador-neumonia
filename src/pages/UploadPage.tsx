import { useCallback, useState } from 'react'
import { preprocessImage, predict } from '../inference'
import type { ResultPayload } from '../types'
import DropZone from '../components/DropZone'
import SampleGallery from '../components/SampleGallery'
import ImagePreview from '../components/ImagePreview'
import { PrimaryButton, GhostButton } from '../components/Button'
import ProgressBar from '../components/ProgressBar'

interface Props {
  onAnalysisComplete: (data: ResultPayload) => void
}

export default function UploadPage({ onAnalysisComplete }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analyzeError, setAnalyzeError] = useState<string | null>(null)

  const handleImageSelected = useCallback((img: HTMLImageElement, url: string) => {
    setImage(img)
    setImageUrl(url)
    setAnalyzeError(null)
  }, [])

  const handleReset = useCallback(() => {
    setImage(null)
    setImageUrl(null)
    setAnalyzeError(null)
  }, [])

  const handleAnalyze = useCallback(async () => {
    if (!image) return
    setAnalyzing(true)
    setAnalyzeError(null)

    try {
      const tensor = preprocessImage(image)
      const r = await predict(tensor)
      onAnalysisComplete({
        imageUrl: imageUrl!,
        label: r.label,
        confidence: r.confidence,
        inferenceTime: r.inferenceTime,
      })
    } catch {
      setAnalyzeError('Error al analizar la imagen. Intenta de nuevo.')
      setAnalyzing(false)
    }
  }, [image, imageUrl, onAnalysisComplete])

  return (
    <div className="w-full max-w-3xl flex flex-col items-center gap-8">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
          NeumonIA
        </h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Clasificación de radiografías de tórax entre normal y neumonía
        </p>
      </div>

      {!imageUrl && (
        <div className="w-full flex flex-col gap-6">
          <DropZone onImageSelected={handleImageSelected} />
          <SampleGallery onImageSelected={handleImageSelected} />
        </div>
      )}

      {imageUrl && <ImagePreview imageUrl={imageUrl} />}

      {imageUrl && !analyzing && !analyzeError && (
        <div className="flex items-center gap-4 animate-[fade-slide-up_0.3s_ease-out]">
          <PrimaryButton size="lg" onClick={handleAnalyze}>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
              />
            </svg>
            Analizar imagen
          </PrimaryButton>
          <GhostButton size="sm" onClick={handleReset}>
            Cancelar
          </GhostButton>
        </div>
      )}

      {imageUrl && analyzeError && !analyzing && (
        <div className="flex flex-col items-center gap-4 text-center animate-[fade-slide-up_0.3s_ease-out]">
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
          <p className="text-sm text-[var(--text-secondary)]">
            Error al analizar la imagen
          </p>
          <p className="text-xs text-[var(--text-tertiary)] max-w-sm">
            {analyzeError}
          </p>
          <div className="flex items-center gap-4">
            <PrimaryButton size="sm" onClick={handleAnalyze}>
              Reintentar
            </PrimaryButton>
            <GhostButton size="sm" onClick={handleReset}>
              Cancelar
            </GhostButton>
          </div>
        </div>
      )}

      {analyzing && (
        <div className="animate-[fade-slide-up_0.3s_ease-out]">
          <ProgressBar label="Analizando imagen" />
        </div>
      )}

      </div>
  )
}
