type OnboardingProps = {
  birthDate: string;
  birthTime: string;
  onBirthDateChange: (v: string) => void;
  onBirthTimeChange: (v: string) => void;
  onContinue: () => void;
};

export function Onboarding({
  birthDate,
  birthTime,
  onBirthDateChange,
  onBirthTimeChange,
  onContinue
}: OnboardingProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Arcana Profile</h1>
      <p className="text-sm text-slate-300">Enter your birth data to calibrate the decision engine.</p>

      <div className="space-y-4 rounded-xl border border-slate-700 bg-slate-900/50 p-4">
        <div>
          <label className="text-sm text-slate-300">Birth date</label>
          <input
            type="date"
            className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-950 p-2 outline-none focus:border-violet-500"
            value={birthDate}
            onChange={(e) => onBirthDateChange(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm text-slate-300">Birth time</label>
          <input
            type="time"
            className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-950 p-2 outline-none focus:border-violet-500"
            value={birthTime}
            onChange={(e) => onBirthTimeChange(e.target.value)}
          />
        </div>
      </div>

      <button
        className="w-full rounded-lg bg-violet-600 px-4 py-3 font-semibold hover:bg-violet-500 disabled:opacity-60"
        onClick={onContinue}
        disabled={!birthDate || !birthTime}
      >
        Continue
      </button>
    </div>
  );
}
