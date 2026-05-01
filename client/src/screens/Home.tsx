import type { NatalReportResponse } from "../api";
import { NatalChartCard } from "../components/NatalChartCard";
import { QuestionForm } from "../components/QuestionForm";

type HomeProps = {
  question: string;
  onQuestionChange: (v: string) => void;
  onAnalyze: () => void;
  loading: boolean;
  natalReport: NatalReportResponse | null;
};

export function Home({ question, onQuestionChange, onAnalyze, loading, natalReport }: HomeProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Вопросы по натальной карте</h1>
      <p className="text-sm text-slate-300">
        Задайте конкретный вопрос по вашей ситуации: стоит ли начинать, ждать, менять направление или фокус.
      </p>
      {natalReport && <NatalChartCard report={natalReport} />}
      <QuestionForm
        question={question}
        onQuestionChange={onQuestionChange}
        onSubmit={onAnalyze}
        loading={loading}
      />
    </div>
  );
}
