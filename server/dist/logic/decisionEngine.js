import { getAstrologyProfile } from "./astrology.js";
import { calculateLifePath } from "./numerology.js";
export function runDeterministicEngine(input) {
    const lifePath = calculateLifePath(input.birthDate);
    const astro = getAstrologyProfile(input.birthDate);
    const question = input.question.toLowerCase();
    const lifePathBoost = lifePath * 6;
    let momentum = astro.momentum;
    let risk = astro.riskLevel;
    const factors = [];
    factors.push(`Число жизненного пути ${lifePath} задает базовый энергетический фон.`);
    factors.push(`Знак ${astro.sign} формирует импульс ${astro.momentum} и уровень риска ${astro.riskLevel}.`);
    if (question.includes("change") || question.includes("измен")) {
        risk += 10;
        factors.push("Вопрос про изменения: риск нестабильности повышен.");
    }
    if (question.includes("start") || question.includes("нач")) {
        momentum += 8;
        factors.push("Вопрос про старт: импульс к действию усилен.");
    }
    const rawScore = lifePathBoost + momentum - risk;
    const score = clamp(rawScore, 0, 100);
    let decision = "WAIT";
    if (score > 70)
        decision = "GO";
    else if (score < 40)
        decision = "NO";
    const confidence = clamp(Math.round(score * 0.7 + Math.abs(momentum - risk) * 0.4), 35, 97);
    const timing = buildTimingWindow(score);
    return {
        decision,
        confidence,
        timing,
        factors,
        meta: {
            lifePath,
            sign: astro.sign,
            score,
            momentum,
            riskLevel: risk
        }
    };
}
function buildTimingWindow(score) {
    const now = new Date();
    const startOffset = score > 70 ? 2 : score >= 40 ? 8 : 18;
    const span = score > 70 ? 9 : score >= 40 ? 7 : 5;
    const start = new Date(now);
    const end = new Date(now);
    start.setDate(now.getDate() + startOffset);
    end.setDate(start.getDate() + span);
    const fmt = (d) => d.toLocaleDateString("ru-RU", {
        month: "long",
        day: "numeric"
    });
    return `Лучшее окно: ${fmt(start)}-${fmt(end)}`;
}
function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}
