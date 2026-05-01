import type { AnalyzeResponse } from "../api";
import { ResultCard } from "../components/ResultCard";
import { Timeline } from "../components/Timeline";

type ResultProps = {
  result: AnalyzeResponse;
  onBack: () => void;
};

export function Result({ result, onBack }: ResultProps) {
  return (
    <div className="space-y-4">
      <ResultCard
        decision={result.decision}
        confidence={result.confidence}
        explanation={result.explanation}
      />
      <Timeline timing={result.timing} />
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
        <div className="text-xs uppercase tracking-wide text-slate-400">Factors</div>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-200">
          {result.factors.map((factor) => (
            <li key={factor}>{factor}</li>
          ))}
        </ul>
      </div>
      <button
        className="w-full rounded-lg border border-slate-500 px-4 py-3 text-sm font-semibold hover:bg-slate-800"
        onClick={onBack}
      >
        Ask another question
      </button>
    </div>
  );
}
