# NeumonIA

Clasificación de radiografías de tórax con inteligencia artificial ejecutada completamente en el navegador.

**NeumonIA** detecta signos de neumonía en radiografías de tórax usando un modelo YOLO de clasificación. La inferencia se ejecuta 100 % en el cliente — las imágenes nunca abandonan tu dispositivo.

## Características

- **Arrastrar y soltar** una radiografía, seleccionar un archivo o elegir una imagen de muestra
- **Inferencia en el navegador** con ONNX Runtime Web sobre WebGPU, WebGL o CPU (WASM)
- **Historial** de predicciones recientes (máximo 50 entradas, solo en memoria)
- **Modo oscuro** / claro / automático
- **Interfaz responsive** con sidebar en escritorio y drawer en móvil
- **Idioma**: español

## Cómo funciona

1. El modelo ONNX se carga al iniciar la aplicación desde `public/best.onnx`
2. La imagen del usuario se redimensiona a **224 × 224 px** y se normaliza (canales RGB en orden NCHW)
3. El tensor se pasa al modelo a través de ONNX Runtime Web
4. El resultado muestra la clase predicha (Normal o Neumonía), una barra de confianza y el tiempo de inferencia

## Modelo

| | |
|---|---|
| **Arquitectura** | YOLO26n-cls (47 capas, 1.5M parámetros, 3.2 GFLOPs) |
| **Dataset** | [Chest X-Ray Pneumonia Balanced Dataset](https://www.kaggle.com/datasets/yusufmurtaza01/chest-xray-pneumonia-balanced-dataset) (6 800 train / 1 700 val / 30 test) |
| **Precisión (val)** | 98.5 % top-1 |
| **Exportado** | ONNX FP16, opset 17, grafo simplificado (~5.88 MB) |

Entrenado en Google Colab con una NVIDIA RTX PRO 6000 Blackwell. El notebook está disponible en `train.ipynb`.

## Stack tecnológico

| Herramienta | Versión |
|---|---|
| React | 19.2 |
| TypeScript | 6.0 (modo estricto) |
| Vite | 8.0 |
| Tailwind CSS | 4.1 |
| ONNX Runtime Web | 1.23 |
| ESLint | 10.3 |

## Instalación y uso

```bash
# Requisitos: pnpm

pnpm install
pnpm dev       # servidor de desarrollo
pnpm build     # compila TS + bundlea con Vite
pnpm preview   # previsualiza la build de producción
pnpm lint      # ESLint
```

## Estructura del proyecto

```
src/
├── inference.ts        # carga del modelo y pipeline de inferencia
├── types.ts            # tipos compartidos
├── App.tsx             # router de vistas
├── hooks/
│   ├── useModel.ts     # ciclo de vida del modelo ONNX
│   ├── useTheme.ts     # tema claro/oscuro/sistema
│   └── useHistory.ts   # historial de predicciones (memoria)
├── pages/
│   ├── ModelLoader.tsx  # pantalla de carga del modelo
│   ├── UploadPage.tsx   # carga de imagen + disparo de análisis
│   ├── ResultPage.tsx   # resultado de la predicción
│   └── HistoryPage.tsx  # lista de predicciones pasadas
├── components/
│   ├── DropZone.tsx     # zona de arrastrar y soltar
│   ├── ImagePreview.tsx # vista previa de la radiografía
│   ├── ResultCard.tsx   # tarjeta de resultado (positivo/negativo)
│   ├── SampleGallery.tsx# galería de imágenes de muestra
│   ├── Sidebar.tsx      # navegación lateral + drawer móvil
│   ├── HistoryList.tsx  # lista de entradas del historial
│   ├── ProgressBar.tsx  # barra de progreso
│   ├── Button.tsx       # botones primarios/ghost/icono
│   ├── Footer.tsx       # disclaimer + créditos
│   └── ThemeToggle.tsx  # selector de tema
└── index.css           # Tailwind v4 + variables de tema
```

## Disclaimer

**Solo para fines demostrativos. No sustituye el diagnóstico médico profesional.**

Las predicciones de este modelo no deben usarse como base para decisiones clínicas. Consulta siempre a un profesional de la salud.

## Autor

Desarrollado por [Alejandro Yáñez](https://alejandroyanez.dev)
