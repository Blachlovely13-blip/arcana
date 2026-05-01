import type { DestinyMatrixResponse } from "../api";

type DestinyMatrixCardProps = {
  matrixData: DestinyMatrixResponse | null;
};

export function DestinyMatrixCard({ matrixData }: DestinyMatrixCardProps) {
  if (!matrixData) return null;

  return (
    <div className="space-y-4 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
      <div>
        <div className="text-xs uppercase tracking-wide text-slate-400">Матрица судьбы</div>
        <div className="mt-2 text-sm text-slate-200">
          Ядро: <span className="font-semibold text-violet-300">{matrixData.coreNumber}</span> | Душа:{" "}
          <span className="font-semibold text-violet-300">{matrixData.soulNumber}</span> | Судьба:{" "}
          <span className="font-semibold text-violet-300">{matrixData.fateNumber}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {matrixData.matrix.flat().map((value, idx) => (
          <div
            key={`${value}-${idx}`}
            className="flex h-12 items-center justify-center rounded-lg border border-violet-700/50 bg-slate-950 text-lg font-semibold text-violet-200"
          >
            {value}
          </div>
        ))}
      </div>

      <ul className="list-disc space-y-1 pl-5 text-sm text-slate-300">
        {matrixData.interpretation.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </div>
  );
}
