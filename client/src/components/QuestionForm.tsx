type QuestionFormProps = {
  question: string;
  onQuestionChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
};

export function QuestionForm({
  question,
  onQuestionChange,
  onSubmit,
  loading
}: QuestionFormProps) {
  return (
    <div className="space-y-4 rounded-xl border border-slate-700 bg-slate-900/50 p-4">
      <label className="text-sm text-slate-300">Ваш вопрос по карте</label>
      <textarea
        className="h-32 w-full rounded-lg border border-slate-600 bg-slate-950 p-3 text-sm outline-none focus:border-violet-500"
        placeholder="Стоит ли мне менять работу в ближайшие 2 месяца?"
        value={question}
        onChange={(e) => onQuestionChange(e.target.value)}
      />
      <button
        className="w-full rounded-lg bg-violet-600 px-4 py-3 font-semibold hover:bg-violet-500 disabled:opacity-60"
        onClick={onSubmit}
        disabled={loading || !question.trim()}
      >
        {loading ? "Анализируем..." : "Получить рекомендацию"}
      </button>
    </div>
  );
}
