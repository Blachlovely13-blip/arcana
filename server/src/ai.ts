import OpenAIImport from "openai";

type ExplanationInput = {
  decision: "GO" | "WAIT" | "NO";
  confidence: number;
  timing: string;
  factors: string[];
  question: string;
};

const OpenAIClient = ((OpenAIImport as unknown as { default?: typeof OpenAIImport }).default ||
  OpenAIImport) as unknown as new (args: { apiKey: string }) => {
  responses: {
    create: (args: {
      model: string;
      input: Array<{ role: "system" | "user"; content: string }>;
    }) => Promise<{ output_text?: string }>;
  };
};

const client = process.env.OPENAI_API_KEY
  ? new OpenAIClient({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function generateExplanation(input: ExplanationInput): Promise<string> {
  if (!client) {
    return fallbackExplanation(input);
  }

  try {
    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content:
            "Отвечай только на русском языке. Объясни решение в рационально-мистическом тоне, конкретно и без общих фраз."
        },
        {
          role: "user",
          content: JSON.stringify(input)
        }
      ]
    });

    const text = response.output_text?.trim();
    return text || fallbackExplanation(input);
  } catch {
    return fallbackExplanation(input);
  }
}

function fallbackExplanation(input: ExplanationInput): string {
  return `По вашему вопросу "${input.question}" движок выдает решение ${input.decision} с уверенностью ${input.confidence}%. ${input.factors[0]} ${input.factors[1]} Текущий паттерн подсказывает: ${input.timing}.`;
}
