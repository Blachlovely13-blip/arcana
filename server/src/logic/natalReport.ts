import { getAstrologyProfile } from "./astrology.js";
import { calculateLifePath } from "./numerology.js";

export type NatalReport = {
  sign: string;
  signRu: string;
  element: "Огонь" | "Земля" | "Воздух" | "Вода";
  lifePath: number;
  tone: "Активный" | "Сбалансированный" | "Осторожный";
  strengths: string[];
  growthZone: string;
  forecast: string;
};

const SIGN_RU: Record<string, string> = {
  Aries: "Овен",
  Taurus: "Телец",
  Gemini: "Близнецы",
  Cancer: "Рак",
  Leo: "Лев",
  Virgo: "Дева",
  Libra: "Весы",
  Scorpio: "Скорпион",
  Sagittarius: "Стрелец",
  Capricorn: "Козерог",
  Aquarius: "Водолей",
  Pisces: "Рыбы"
};

const SIGN_ELEMENT: Record<string, NatalReport["element"]> = {
  Aries: "Огонь",
  Leo: "Огонь",
  Sagittarius: "Огонь",
  Taurus: "Земля",
  Virgo: "Земля",
  Capricorn: "Земля",
  Gemini: "Воздух",
  Libra: "Воздух",
  Aquarius: "Воздух",
  Cancer: "Вода",
  Scorpio: "Вода",
  Pisces: "Вода"
};

export function buildNatalReport(birthDate: string): NatalReport {
  const astro = getAstrologyProfile(birthDate);
  const lifePath = calculateLifePath(birthDate);

  const tone: NatalReport["tone"] =
    astro.momentum - astro.riskLevel > 30 ? "Активный" : astro.momentum - astro.riskLevel > 18 ? "Сбалансированный" : "Осторожный";

  return {
    sign: astro.sign,
    signRu: SIGN_RU[astro.sign] || astro.sign,
    element: SIGN_ELEMENT[astro.sign] || "Воздух",
    lifePath,
    tone,
    strengths: buildStrengths(astro.sign, lifePath),
    growthZone: `Риск-профиль ${astro.riskLevel}: полезно проверять сроки и ресурсы перед резким стартом.`,
    forecast: `Текущий импульс ${astro.momentum}/100. Лучший результат приходит, если двигаться шагами и фиксировать промежуточные решения.`
  };
}

function buildStrengths(sign: string, lifePath: number): string[] {
  return [
    `${SIGN_RU[sign] || sign}: естественная интуиция к выбору правильного темпа.`,
    `Число пути ${lifePath}: способность видеть главный приоритет среди нескольких вариантов.`,
    "Умение адаптировать решение под обстоятельства без потери цели."
  ];
}
