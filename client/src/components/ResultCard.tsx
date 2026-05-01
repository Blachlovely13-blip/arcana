type ResultCardProps = {
  decision: "GO" | "WAIT" | "NO";
  confidence: number;
  explanation: string;
};

const COLORS = {
  GO: "text-emerald-400",
  WAIT: "text-amber-300",
  NO: "text-rose-400"
} as const;

export function ResultCard({ decision, confidence, explanation }: ResultCardProps) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <div className="text-xs uppercase tracking-wide text-slate-400">Recommendation</div>
      <div className={`mt-2 text-4xl font-bold ${COLORS[decision]}`}>{decision}</div>
      <div className="mt-3 text-sm text-slate-300">Confidence: {confidence}%</div>
      <p className="mt-4 text-sm leading-relaxed text-slate-200">{explanation}</p>
    </div>
  );
}
