export type AnalyzeRequest = {
  birthDate: string;
  birthTime: string;
  question: string;
  telegramId?: string;
};

export type AnalyzeResponse = {
  decision: "GO" | "WAIT" | "NO";
  confidence: number;
  timing: string;
  explanation: string;
  factors: string[];
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim();

export async function analyze(data: AnalyzeRequest): Promise<AnalyzeResponse> {
  const endpoint = API_BASE_URL ? `${API_BASE_URL}/analyze` : "/analyze";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Analyze failed: ${response.status}`);
  }

  return (await response.json()) as AnalyzeResponse;
}
