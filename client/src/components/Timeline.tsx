type TimelineProps = {
  timing: string;
};

export function Timeline({ timing }: TimelineProps) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <div className="text-xs uppercase tracking-wide text-slate-400">Timing Window</div>
      <div className="mt-3 h-2 w-full rounded bg-slate-700">
        <div className="h-2 w-2/3 rounded bg-violet-500" />
      </div>
      <div className="mt-3 text-sm text-slate-300">{timing}</div>
    </div>
  );
}
