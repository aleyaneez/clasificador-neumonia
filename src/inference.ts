import * as ort from "onnxruntime-web/all";

let session: ort.InferenceSession | null = null;
let activeProvider: string | null = null;

type ProviderId = "webgpu" | "webgl" | "wasm";

const CLASSES = ["Sin neumonia", "Neumonia detectada"];

function detectProviderSupport(): ProviderId[] {
  const available: ProviderId[] = [];

  if ("gpu" in navigator) {
    available.push("webgpu");
  }

  try {
    const canvas = document.createElement("canvas");
    if (canvas.getContext("webgl2") || canvas.getContext("webgl")) {
      available.push("webgl");
    }
  } catch {
    // canvas not supported, no WebGL
  }

  available.push("wasm");
  return available;
}

export async function loadModel(
  onProgress?: (pct: number) => void,
  onProvider?: (provider: string) => void,
): Promise<void> {
  if (session) return;

  onProgress?.(10);

  const providers = detectProviderSupport();

  for (const ep of providers) {
    try {
      session = await ort.InferenceSession.create("/best.onnx", {
        executionProviders: [ep],
      });
      activeProvider = ep;
      onProvider?.(ep);
      break;
    } catch {
      // fall back to the next execution provider
    }
  }

  if (!session) {
    throw new Error("No compatible execution provider found");
  }

  onProgress?.(100);
}

export function isModelLoaded(): boolean {
  return session !== null;
}

export function getActiveProvider(): string {
  return activeProvider ?? "unknown";
}

export function getClasses(): readonly string[] {
  return CLASSES;
}

export function preprocessImage(img: HTMLImageElement): ort.Tensor {
  const canvas = document.createElement("canvas");
  canvas.width = 224;
  canvas.height = 224;
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, 224, 224);
  const imageData = ctx.getImageData(0, 0, 224, 224);
  const pixels = imageData.data;

  const ch = 224 * 224;
  const tensorData = new Float32Array(1 * 3 * 224 * 224);

  for (let i = 0; i < ch; i++) {
    const j = i * 4;
    tensorData[i] = pixels[j] / 255.0;
    tensorData[ch + i] = pixels[j + 1] / 255.0;
    tensorData[2 * ch + i] = pixels[j + 2] / 255.0;
  }

  return new ort.Tensor("float32", tensorData, [1, 3, 224, 224]);
}

export async function predict(tensor: ort.Tensor): Promise<{
  classIdx: number;
  label: string;
  confidence: number;
  probabilities: number[];
  inferenceTime: number;
}> {
  if (!session) throw new Error("Model not loaded");

  const inputName = session.inputNames[0];
  const feeds: Record<string, ort.Tensor> = { [inputName]: tensor };

  const start = performance.now();
  const results = await session.run(feeds);
  const elapsed = performance.now() - start;

  const data = results[session.outputNames[0]].data as Float32Array;
  const probs = Array.from(data);
  const classIdx = probs[0] > probs[1] ? 0 : 1;

  console.log(
    `Inference: ${elapsed.toFixed(1)}ms | provider: ${activeProvider ?? "unknown"} | probs: [${probs.map((v) => v.toFixed(4)).join(", ")}] | dtype: ${results[session.outputNames[0]].type}`,
  );

  return {
    classIdx,
    label: CLASSES[classIdx],
    confidence: probs[classIdx],
    probabilities: probs,
    inferenceTime: elapsed,
  };
}
