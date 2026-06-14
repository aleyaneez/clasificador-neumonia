import { useCallback, useEffect, useState } from "react";
import type { Theme, View } from "../types";
import ThemeToggle from "./ThemeToggle";
import { IconButton } from "./Button";

interface Props {
  activeView: View;
  theme: Theme;
  historyCount: number;
  onNavigate: (view: View) => void;
  onThemeChange: (theme: Theme) => void;
}

export default function Sidebar({
  activeView,
  theme,
  historyCount,
  onNavigate,
  onThemeChange,
}: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const toggleMobile = useCallback(() => {
    if (mobileOpen) {
      setClosing(true);
      setTimeout(() => {
        setMobileOpen(false);
        setClosing(false);
      }, 180);
    } else {
      setMobileOpen(true);
    }
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNav = useCallback(
    (view: View) => {
      onNavigate(view);
      if (mobileOpen) toggleMobile();
    },
    [onNavigate, mobileOpen, toggleMobile],
  );

  const sidebarContent = (
    <nav className="flex flex-col flex-1 min-h-0 overflow-y-auto">
      <div className="flex items-center gap-2.5 px-4 pt-6 pb-5">
        <svg
          className="w-6 h-6 text-accent shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
        <span className="text-base font-semibold tracking-tight text-[var(--text-primary)]">
          NeumonIA
        </span>
      </div>

      <div className="px-3 flex flex-col gap-0.5">
        <button
          type="button"
          onClick={() => handleNav("upload")}
          className={`
            flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
            transition-all duration-200
            ${
              activeView === "upload" || activeView === "result"
                ? "bg-accent/10 text-accent"
                : "text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
            }
          `}
        >
          <svg
            className="w-4.5 h-4.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
            />
          </svg>
          Nuevo Analisis
        </button>

        <button
          type="button"
          onClick={() => handleNav("history")}
          className={`
            flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
            transition-all duration-200
            ${
              activeView === "history"
                ? "bg-accent/10 text-accent"
                : "text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
            }
          `}
        >
          <svg
            className="w-4.5 h-4.5"
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
          Historial
          {historyCount > 0 && (
            <span className="ml-auto inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-accent/15 text-accent text-xs font-semibold leading-none">
              {historyCount}
            </span>
          )}
        </button>
      </div>

      <div className="mt-auto px-4 pb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 h-px bg-[var(--border-subtle)]" />
          <span className="text-xs font-medium tracking-widest uppercase text-[var(--text-tertiary)]">
            Ajustes
          </span>
          <div className="flex-1 h-px bg-[var(--border-subtle)]" />
        </div>
        <ThemeToggle theme={theme} onChange={onThemeChange} />
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <IconButton
        size="lg"
        onClick={toggleMobile}
        className="md:hidden fixed top-4 left-4 z-40 rounded-xl bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--border-color)]"
        aria-label="Abrir menu"
      >
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
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </IconButton>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-60 md:shrink-0 md:fixed md:inset-y-0 md:left-0 md:z-30 bg-[var(--sidebar-bg)] border-r border-[var(--sidebar-border)]">
        {sidebarContent}
      </aside>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className={`absolute inset-0 bg-black/40 backdrop-blur-sm ${closing ? "animate-[fade-out_0.18s_ease-in_forwards]" : "sidebar-overlay-enter"}`}
            onClick={toggleMobile}
          />
          <aside
            className={`flex flex-col overflow-hidden absolute inset-y-0 left-0 w-64 bg-[var(--sidebar-bg)] border-r border-[var(--sidebar-border)] shadow-2xl ${closing ? "sidebar-drawer-exit" : "sidebar-drawer-enter"}`}
          >
            <div className="flex justify-end px-4 pt-4 shrink-0">
              <IconButton
                onClick={toggleMobile}
                aria-label="Cerrar menu"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
      </IconButton>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
