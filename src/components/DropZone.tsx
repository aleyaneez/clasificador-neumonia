import { useCallback, useRef, useState } from 'react'

interface Props {
  onImageSelected: (img: HTMLImageElement, url: string) => void
}

export default function DropZone({ onImageSelected }: Props) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) return
      const reader = new FileReader()
      reader.onload = () => {
        const img = new Image()
        img.onload = () => onImageSelected(img, reader.result as string)
        img.src = reader.result as string
      }
      reader.readAsDataURL(file)
    },
    [onImageSelected],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile],
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleClick = useCallback(() => {
    inputRef.current?.click()
  }, [])

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`
        relative cursor-pointer rounded-2xl border-2 border-dashed p-12
        transition-all duration-300 ease-out bg-dropzone
        ${isDragging
          ? 'border-accent bg-accent/10 scale-[1.01] shadow-[0_0_24px_rgba(59,130,246,0.2)]'
          : 'border-dropzone-border hover:border-foreground-tertiary hover:bg-hover'
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      <div className="flex flex-col items-center gap-4">
        <svg
          className={`w-12 h-12 transition-colors duration-300 ${isDragging ? 'text-accent' : 'text-foreground-tertiary'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
          />
        </svg>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            {isDragging
              ? 'Suelta la imagen aqui'
              : 'Arrastra una radiografia de torax o haz clic'}
          </p>
          <p className="mt-1 text-xs text-foreground-tertiary">
            PNG, JPG o DICOM convertido a imagen
          </p>
        </div>
      </div>
    </div>
  )
}
