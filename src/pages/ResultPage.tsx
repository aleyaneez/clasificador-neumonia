import type { ResultPayload } from "../types";
import ImagePreview from "../components/ImagePreview";
import ResultCard from "../components/ResultCard";
import { PrimaryButton } from "../components/Button";

interface Props {
  imageUrl: string;
  result: ResultPayload;
  onNewImage: () => void;
}

export default function ResultPage({ imageUrl, result, onNewImage }: Props) {
  const isPneumonia = result.label === "Neumonia detectada";
  const percentage = Math.round(result.confidence * 100);

  const barColor = isPneumonia ? "bg-red-500" : "bg-emerald-500";
  const textColor = isPneumonia
    ? "text-danger-foreground"
    : "text-success-foreground";

  return (
    <div className="w-full max-w-5xl flex flex-col gap-10">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          NeumonIA
        </h1>
        <p className="mt-2 text-sm text-foreground-secondary">
          Clasificación de radiografías de tórax entre normal y neumonía
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-16 items-start">
        <div className="w-full md:w-1/2">
          <ImagePreview imageUrl={imageUrl} />
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <ResultCard label={result.label} isPneumonia={isPneumonia} />

          <div className="animate-[fade-slide-up_0.5s_ease-out]">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-xs text-foreground-tertiary font-medium">
                Confianza
              </span>
              <span className={`text-sm font-semibold ${textColor}`}>
                {percentage}%
              </span>
            </div>
            <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${barColor} transition-all duration-700 ease-out`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 animate-[fade-slide-up_0.5s_ease-out]">
            <svg
              className="w-3.5 h-3.5 text-foreground-tertiary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span className="text-xs text-foreground-tertiary">
              Tiempo de inferencia:{" "}
              <span className="text-foreground-secondary font-mono tabular-nums">
                {result.inferenceTime.toFixed(1)} ms
              </span>
            </span>
          </div>

          <p className="text-xs text-foreground-tertiary animate-[fade-slide-up_0.5s_ease-out]">
            {isPneumonia
              ? "Se recomienda consultar a un medico"
              : "No se detectaron signos de neumonia"}
          </p>

          <div className="pt-6 animate-[fade-slide-up_0.5s_ease-out]">
            <PrimaryButton size="lg" onClick={onNewImage}>
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
              Nueva imagen
            </PrimaryButton>
          </div>
        </div>
      </div>

      </div>
  );
}
