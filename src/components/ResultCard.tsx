interface Props {
  label: string;
  isPneumonia: boolean;
}

export default function ResultCard({ label, isPneumonia }: Props) {
  const colors = isPneumonia
    ? {
        bg: "bg-[var(--danger-bg)]",
        border: "border-[var(--danger-border)]",
        text: "text-[var(--danger-text)]",
        icon: "text-[var(--danger-text)]",
      }
    : {
        bg: "bg-[var(--success-bg)]",
        border: "border-[var(--success-border)]",
        text: "text-[var(--success-text)]",
        icon: "text-[var(--success-text)]",
      };

  return (
    <div
      className={`
        w-full animate-[fade-slide-up_0.5s_ease-out]
        rounded-2xl border ${colors.border} ${colors.bg}
        backdrop-blur-xl px-6 py-5
      `}
    >
      <div className="flex items-center gap-4">
        {isPneumonia ? (
          <svg
            className={`w-7 h-7 ${colors.icon}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        ) : (
          <svg
            className={`w-7 h-7 ${colors.icon}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        )}
        <div>
          <p className="text-xs text-[var(--text-tertiary)] font-medium tracking-wide uppercase">
            Resultado
          </p>
          <p className={`text-lg font-semibold ${colors.text}`}>{label}</p>
        </div>
      </div>
    </div>
  );
}
