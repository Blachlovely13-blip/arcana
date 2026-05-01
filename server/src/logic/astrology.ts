export type AstrologyResult = {
  sign: string;
  riskLevel: number;
  momentum: number;
};

type SignProfile = {
  sign: string;
  riskLevel: number;
  momentum: number;
};

const SIGN_PROFILES: SignProfile[] = [
  { sign: "Capricorn", riskLevel: 25, momentum: 54 },
  { sign: "Aquarius", riskLevel: 31, momentum: 66 },
  { sign: "Pisces", riskLevel: 37, momentum: 49 },
  { sign: "Aries", riskLevel: 29, momentum: 76 },
  { sign: "Taurus", riskLevel: 24, momentum: 58 },
  { sign: "Gemini", riskLevel: 40, momentum: 62 },
  { sign: "Cancer", riskLevel: 33, momentum: 52 },
  { sign: "Leo", riskLevel: 30, momentum: 73 },
  { sign: "Virgo", riskLevel: 27, momentum: 56 },
  { sign: "Libra", riskLevel: 32, momentum: 65 },
  { sign: "Scorpio", riskLevel: 38, momentum: 61 },
  { sign: "Sagittarius", riskLevel: 28, momentum: 72 }
];

const ZODIAC_RANGES = [
  { sign: "Capricorn", start: [12, 22], end: [1, 19] },
  { sign: "Aquarius", start: [1, 20], end: [2, 18] },
  { sign: "Pisces", start: [2, 19], end: [3, 20] },
  { sign: "Aries", start: [3, 21], end: [4, 19] },
  { sign: "Taurus", start: [4, 20], end: [5, 20] },
  { sign: "Gemini", start: [5, 21], end: [6, 20] },
  { sign: "Cancer", start: [6, 21], end: [7, 22] },
  { sign: "Leo", start: [7, 23], end: [8, 22] },
  { sign: "Virgo", start: [8, 23], end: [9, 22] },
  { sign: "Libra", start: [9, 23], end: [10, 22] },
  { sign: "Scorpio", start: [10, 23], end: [11, 21] },
  { sign: "Sagittarius", start: [11, 22], end: [12, 21] }
] as const;

export function getAstrologyProfile(birthDate: string): AstrologyResult {
  const parsed = new Date(birthDate);
  if (Number.isNaN(parsed.getTime())) {
    return SIGN_PROFILES[5];
  }

  const month = parsed.getUTCMonth() + 1;
  const day = parsed.getUTCDate();
  const range = ZODIAC_RANGES.find(({ start, end }) => inRange(month, day, start, end));
  const profile = SIGN_PROFILES.find((item) => item.sign === (range?.sign || "Gemini"));
  return { ...(profile || SIGN_PROFILES[5]) };
}

function inRange(
  month: number,
  day: number,
  start: readonly [number, number],
  end: readonly [number, number]
): boolean {
  const value = month * 100 + day;
  const startValue = start[0] * 100 + start[1];
  const endValue = end[0] * 100 + end[1];

  if (startValue <= endValue) {
    return value >= startValue && value <= endValue;
  }

  return value >= startValue || value <= endValue;
}
