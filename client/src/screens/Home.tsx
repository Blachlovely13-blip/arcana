import { QuestionForm } from "../components/QuestionForm";

type HomeProps = {
  question: string;
  onQuestionChange: (v: string) => void;
  onAnalyze: () => void;
  loading: boolean;
};

export function Home({ question, onQuestionChange, onAnalyze, loading }: HomeProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Ask Arcana</h1>
      <p className="text-sm text-slate-300">Frame one clear decision and get a structured recommendation.</p>
      <QuestionForm
        question={question}
        onQuestionChange={onQuestionChange}
        onSubmit={onAnalyze}
        loading={loading}
      />
    </div>
  );
}
