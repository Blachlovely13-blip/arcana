import type { DestinyMatrixResponse } from "../api";
import { DestinyMatrixCard } from "../components/DestinyMatrixCard";
import { QuestionForm } from "../components/QuestionForm";

type HomeProps = {
  question: string;
  onQuestionChange: (v: string) => void;
  onAnalyze: () => void;
  loading: boolean;
  matrixData: DestinyMatrixResponse | null;
};

export function Home({ question, onQuestionChange, onAnalyze, loading, matrixData }: HomeProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Ask Arcana</h1>
      <p className="text-sm text-slate-300">
        Сначала проверьте вашу матрицу судьбы, затем задайте один четкий вопрос для рекомендации.
      </p>
      <DestinyMatrixCard matrixData={matrixData} />
      <QuestionForm
        question={question}
        onQuestionChange={onQuestionChange}
        onSubmit={onAnalyze}
        loading={loading}
      />
    </div>
  );
}
