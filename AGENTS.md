# NeumonIA — Agents Instructions

## Commands
- `pnpm dev` — dev server (Vite)
- `pnpm build` — `tsc -b && vite build` (typecheck first, then bundle)
- `pnpm lint` — ESLint
- `pnpm preview` — preview production build

## Architecture
- `src/inference.ts` — ONNX model loading, image preprocessing (224×224 RGB), prediction. Core ML pipeline.
- `src/App.tsx` — view router: ModelLoader → UploadPage → ResultPage, and HistoryPage.
- `src/hooks/` — `useModel` (model lifecycle), `useTheme` (theme persistence), `useHistory` (in-memory, max 50 entries).
- `src/components/` — UI kit: Button, DropZone, ProgressBar, ResultCard, Sidebar, etc.
- `src/pages/` — page-level components.

## Important quirks
- ONNX model is served from `public/best.onnx` (loaded at runtime). `best.pt` is a PyTorch file not used at runtime.
- `onnxruntime-web` is excluded from Vite dep optimization (`optimizeDeps.exclude`). Do not remove this — it breaks WASM loading.
- Tailwind CSS v4 uses CSS-based config (`@theme`, `--var()` customs). No `tailwind.config.js`.
- Theme uses `localStorage` key `pneumoscan-theme` and `.light`/`.dark` classes on `<html>`. Colors use CSS custom properties, not Tailwind dark: variants.
- TypeScript 6 strict: `erasableSyntaxOnly`, `verbatimModuleSyntax`, `noUnusedLocals`, `noUnusedParameters`. Use `import type` for type-only imports.
- `tsconfig.json` is a project references root pointing to `tsconfig.app.json` (src) and `tsconfig.node.json` (vite.config.ts).
- No test runner. `test/` contains sample chest X-rays (NORMAL/ and PNEUMONIA/) for manual browser testing.
- UI language is Spanish. Font: Inter (Google Fonts).
- Components use `export default function`. Props interfaces are named `Props`.
