import type { NatalReportResponse } from "../api";
import { NatalChartCard } from "../components/NatalChartCard";

type NatalOverviewProps = {
  report: NatalReportResponse | null;
  loading: boolean;
  onContinue: () => void;
};

export function NatalOverview({ report, loading, onContinue }: NatalOverviewProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Ваша натальная карта</h1>
      <p className="text-sm text-slate-300">
        Мы собрали базовый разбор по дате рождения. Используйте его как контекст, а затем задавайте точные вопросы: стоит ли действовать сейчас, чего ждать и где быть осторожнее.
      </p>

      {loading && (
        <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-4 text-sm text-slate-300">
          Формируем натальную карту...
        </div>
      )}

      {report && <NatalChartCard report={report} />}

      <button
        className="w-full rounded-lg bg-violet-600 px-4 py-3 font-semibold hover:bg-violet-500 disabled:opacity-60"
        onClick={onContinue}
        disabled={!report}
      >
        Перейти к вопросам по карте
      </button>
    </div>
  );
}
