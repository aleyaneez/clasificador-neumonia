export type Theme = 'light' | 'dark' | 'system'
export type View = 'upload' | 'result' | 'history'
export type ModelStatus = 'loading' | 'ready' | 'error'
export type AnalysisStatus = 'idle' | 'analyzing' | 'done'
export type InferenceProvider = 'webgpu' | 'webgl' | 'wasm' | 'unknown'

export interface HistoryEntry {
  id: string
  imageUrl: string
  label: string
  confidence: number
  inferenceTime: number
  timestamp: number
}

export interface Result {
  label: string
  confidence: number
  probabilities: number[]
  inferenceTime: number
}

export interface ResultPayload extends Pick<Result, 'label' | 'confidence' | 'inferenceTime'> {
  imageUrl: string
}
