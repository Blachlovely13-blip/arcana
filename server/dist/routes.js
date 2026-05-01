import { Router } from "express";
import { generateExplanation } from "./ai.js";
import { saveDecision, saveUser } from "./db.js";
import { runDeterministicEngine } from "./logic/decisionEngine.js";
export const router = Router();
router.post("/analyze", async (req, res) => {
    const body = req.body;
    const birthDate = body.birthDate?.trim();
    const birthTime = body.birthTime?.trim() || "12:00";
    const question = body.question?.trim();
    if (!birthDate || !question) {
        return res.status(400).json({ error: "birthDate and question are required" });
    }
    const deterministic = runDeterministicEngine({
        birthDate,
        birthTime,
        question
    });
    const explanation = await generateExplanation({
        decision: deterministic.decision,
        confidence: deterministic.confidence,
        timing: deterministic.timing,
        factors: deterministic.factors,
        question
    });
    if (body.telegramId) {
        saveUser(body.telegramId, birthDate);
    }
    saveDecision(body.telegramId || null, question, deterministic.decision);
    return res.json({
        decision: deterministic.decision,
        confidence: deterministic.confidence,
        timing: deterministic.timing,
        explanation,
        factors: deterministic.factors
    });
});
