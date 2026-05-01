import { useEffect, useMemo, useState } from "react";
import { analyze, getNatalReport, type AnalyzeResponse, type NatalReportResponse } from "./api";
import { Home } from "./screens/Home";
import { NatalOverview } from "./screens/NatalOverview";
import { Onboarding } from "./screens/Onboarding";
import { Result } from "./screens/Result";

type Screen = "onboarding" | "natal" | "home" | "result";

type AppProps = {
  telegramId?: string;
};

const BIRTH_DATE_KEY = "arcana_birth_date";
const BIRTH_TIME_KEY = "arcana_birth_time";

export default function App({ telegramId }: AppProps) {
  const [screen, setScreen] = useState<Screen>(() => {
    const hasProfile = localStorage.getItem(BIRTH_DATE_KEY) && localStorage.getItem(BIRTH_TIME_KEY);
    return hasProfile ? "natal" : "onboarding";
  });

  const [birthDate, setBirthDate] = useState(localStorage.getItem(BIRTH_DATE_KEY) || "");
  const [birthTime, setBirthTime] = useState(localStorage.getItem(BIRTH_TIME_KEY) || "12:00");
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [natalReport, setNatalReport] = useState<NatalReportResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [natalLoading, setNatalLoading] = useState(false);

  const title = useMemo(() => {
    if (screen === "result") return "Результат Arcana";
    if (screen === "natal") return "Натальная карта";
    if (screen === "home") return "Вопросы по карте";
    return "Arcana";
  }, [screen]);

  const handleContinue = () => {
    localStorage.setItem(BIRTH_DATE_KEY, birthDate);
    localStorage.setItem(BIRTH_TIME_KEY, birthTime);
    setScreen("natal");
  };

  useEffect(() => {
    if (!["natal", "home"].includes(screen) || !birthDate) return;
    setNatalLoading(true);
    getNatalReport(birthDate)
      .then(setNatalReport)
      .catch((err) => setError(err instanceof Error ? err.message : "Не удалось получить натальную карту"))
      .finally(() => setNatalLoading(false));
  }, [screen, birthDate]);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await analyze({
        birthDate,
        birthTime,
        question,
        telegramId
      });
      setResult(response);
      setScreen("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-xl p-4 pb-10">
      <header className="mb-6 border-b border-slate-700 pb-3">
        <div className="text-xs uppercase tracking-wide text-slate-400">{title}</div>
      </header>

      {screen === "onboarding" && (
        <Onboarding
          birthDate={birthDate}
          birthTime={birthTime}
          onBirthDateChange={setBirthDate}
          onBirthTimeChange={setBirthTime}
          onContinue={handleContinue}
        />
      )}

      {screen === "home" && (
        <Home
          question={question}
          onQuestionChange={setQuestion}
          onAnalyze={handleAnalyze}
          loading={loading}
          natalReport={natalReport}
        />
      )}

      {screen === "natal" && (
        <NatalOverview
          report={natalReport}
          loading={natalLoading}
          onContinue={() => setScreen("home")}
        />
      )}

      {screen === "result" && result && <Result result={result} onBack={() => setScreen("home")} />}

      {error && <div className="mt-4 rounded-lg bg-rose-900/40 p-3 text-sm text-rose-300">{error}</div>}
    </div>
  );
}
