import type { NatalReportResponse } from "../api";

type NatalChartCardProps = {
  report: NatalReportResponse;
};

export function NatalChartCard({ report }: NatalChartCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-violet-700/40 bg-gradient-to-b from-violet-900/40 to-slate-900 p-4">
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-violet-400/50 bg-violet-950/70 text-center text-sm font-semibold text-violet-100">
          {report.signRu}
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide text-violet-200/80">Натальная карта</div>
          <div className="text-2xl font-bold text-violet-100">{report.signRu}</div>
          <div className="text-sm text-slate-300">
            Стихия: {report.element} · Число пути: {report.lifePath} · Тон: {report.tone}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950/40 p-3">
        <div className="text-xs uppercase tracking-wide text-slate-400">Сильные стороны</div>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-200">
          {report.strengths.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-3 rounded-xl border border-slate-700 bg-slate-950/40 p-3 text-sm text-slate-200">
        <div className="text-xs uppercase tracking-wide text-slate-400">Зона роста</div>
        <p className="mt-2">{report.growthZone}</p>
      </div>

      <div className="mt-3 rounded-xl border border-slate-700 bg-slate-950/40 p-3 text-sm text-slate-200">
        <div className="text-xs uppercase tracking-wide text-slate-400">Ближайший вектор</div>
        <p className="mt-2">{report.forecast}</p>
      </div>
    </div>
  );
}
