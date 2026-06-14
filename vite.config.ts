import path from 'node:path'
import fs from 'node:fs'
import { defineConfig, type Plugin, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const ONNX_WASM_FILES = [
  'ort-wasm-simd-threaded.wasm',
  'ort-wasm-simd-threaded.jsep.wasm',
  'ort-wasm-simd-threaded.jspi.wasm',
  'ort-wasm-simd-threaded.asyncify.wasm',
]

function onnxRuntimeWebWasm(): Plugin {
  const srcDir = path.resolve(__dirname, 'node_modules/onnxruntime-web/dist')

  return {
    name: 'onnx-runtime-web-wasm',
    configureServer(server: ViteDevServer) {
      server.middlewares.use((req, res, next) => {
        const requested = path.basename(req.url ?? '')
        if (ONNX_WASM_FILES.includes(requested)) {
          const filePath = path.join(srcDir, requested)
          if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', 'application/wasm')
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
            fs.createReadStream(filePath).pipe(res)
            return
          }
        }
        next()
      })
    },
    writeBundle(options) {
      const outDir = options.dir ?? path.resolve(__dirname, 'dist')
      for (const file of ONNX_WASM_FILES) {
        const src = path.join(srcDir, file)
        const dest = path.join(outDir, file)
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest)
        }
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), onnxRuntimeWebWasm()],
  build: {
    target: 'esnext',
  },
  optimizeDeps: {
    exclude: ['onnxruntime-web'],
  },
})
