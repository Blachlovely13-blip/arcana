import OpenAI from "openai";
const client = process.env.OPENAI_API_KEY
    ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
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
                    content: "Explain decision in a rational but mystical tone. Be specific. No generic phrases."
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
    return `For your question "${input.question}", the engine returns ${input.decision} with ${input.confidence}% confidence. ${input.factors[0]} ${input.factors[1]} The current pattern suggests: ${input.timing}.`;
}
