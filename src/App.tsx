import { useCallback, useState } from "react";
import type { HistoryEntry, ResultPayload, View } from "./types";
import { useTheme } from "./hooks/useTheme";
import { useModel } from "./hooks/useModel";
import { useHistory } from "./hooks/useHistory";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import ModelLoader from "./pages/ModelLoader";
import UploadPage from "./pages/UploadPage";
import ResultPage from "./pages/ResultPage";
import HistoryPage from "./pages/HistoryPage";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const { theme, setTheme } = useTheme();
  const { modelStatus, modelLoadPct, modelError, modelProvider, isReady } = useModel();
  const { history, addToHistory, deleteFromHistory } = useHistory();

  const [activeView, setActiveView] = useState<View>("upload");
  const [currentResult, setCurrentResult] = useState<ResultPayload | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);

  const handleAnalysisComplete = useCallback((data: ResultPayload) => {
    addToHistory(data);
    setCurrentResult(data);
    setCurrentImageUrl(data.imageUrl);
    setActiveView("result");
  }, [addToHistory]);

  const handleHistorySelect = useCallback((entry: HistoryEntry) => {
    setCurrentResult({
      imageUrl: entry.imageUrl,
      label: entry.label,
      confidence: entry.confidence,
      inferenceTime: entry.inferenceTime,
    });
    setCurrentImageUrl(entry.imageUrl);
    setActiveView("result");
  }, []);

  const handleNewImage = useCallback(() => {
    setCurrentResult(null);
    setCurrentImageUrl(null);
    setActiveView("upload");
  }, []);

  return (
    <div className="flex min-h-dvh bg-background">
      {isReady ? (
        <Sidebar
          activeView={activeView}
          theme={theme}
          historyCount={history.length}
          onNavigate={setActiveView}
          onThemeChange={setTheme}
        />
      ) : null}

      <main
        className={`flex-1 flex flex-col items-center ${isReady ? "md:ml-60" : ""} px-6 py-12 sm:py-16 transition-[margin] duration-300`}
      >
        {!isReady ? (
          <ModelLoader
            status={modelStatus}
            loadPct={modelLoadPct}
            error={modelError}
            provider={modelProvider}
          />
        ) : null}

        {isReady && activeView === "upload" ? (
          <UploadPage onAnalysisComplete={handleAnalysisComplete} />
        ) : null}

        {isReady && activeView === "result" && currentResult && currentImageUrl ? (
          <ResultPage
            imageUrl={currentImageUrl}
            result={currentResult}
            onNewImage={handleNewImage}
          />
        ) : null}

        {isReady && activeView === "history" ? (
          <HistoryPage
            history={history}
            onDelete={deleteFromHistory}
            onSelect={handleHistorySelect}
          />
        ) : null}

        <Footer />
      </main>
      <SpeedInsights />
      <Analytics />
    </div>
  );
}

export default App;
