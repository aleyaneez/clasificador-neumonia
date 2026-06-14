export default function Footer() {
  return (
    <footer className="mt-auto pt-16 flex flex-col items-center gap-1">
      <p className="text-center text-xs text-[var(--text-tertiary)]">
        Solo para fines demostrativos. No sustituye diagnóstico médico
        profesional.
      </p>
      <p className="text-center text-xs text-[var(--text-tertiary)]">
        Desarrollado por{" "}
        <a
          href="https://alejandroyanez.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-light underline underline-offset-2 transition-colors"
        >
          Alejandro Yáñez
        </a>
      </p>
    </footer>
  )
}
