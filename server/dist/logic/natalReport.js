import { getAstrologyProfile } from "./astrology.js";
import { calculateLifePath } from "./numerology.js";
const SIGN_RU = {
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
const SIGN_ELEMENT = {
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
export function buildNatalReport(birthDate) {
    const astro = getAstrologyProfile(birthDate);
    const lifePath = calculateLifePath(birthDate);
    const tone = astro.momentum - astro.riskLevel > 30 ? "Активный" : astro.momentum - astro.riskLevel > 18 ? "Сбалансированный" : "Осторожный";
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
function buildStrengths(sign, lifePath) {
    return [
        `${SIGN_RU[sign] || sign}: естественная интуиция к выбору правильного темпа.`,
        `Число пути ${lifePath}: способность видеть главный приоритет среди нескольких вариантов.`,
        "Умение адаптировать решение под обстоятельства без потери цели."
    ];
}
