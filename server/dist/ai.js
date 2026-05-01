import OpenAIImport from "openai";
const OpenAIClient = (OpenAIImport.default ||
    OpenAIImport);
const client = process.env.OPENAI_API_KEY
    ? new OpenAIClient({ apiKey: process.env.OPENAI_API_KEY })
    : null;
export async function generateExplanation(input) {
    if (!client) {
        return fallbackExplanation(input);
    }
    try {
        const response = await client.responses.create({
            model: "gpt-4o-mini",
            input: [
                {
                    role: "system",
                    content: "Отвечай только на русском языке. Объясни решение в рационально-мистическом тоне, конкретно и без общих фраз."
                },
                {
                    role: "user",
                    content: JSON.stringify(input)
                }
            ]
        });
        const text = response.output_text?.trim();
        return text || fallbackExplanation(input);
    }
    catch {
        return fallbackExplanation(input);
    }
}
function fallbackExplanation(input) {
    return `По вашему вопросу "${input.question}" движок выдает решение ${input.decision} с уверенностью ${input.confidence}%. ${input.factors[0]} ${input.factors[1]} Текущий паттерн подсказывает: ${input.timing}.`;
}
