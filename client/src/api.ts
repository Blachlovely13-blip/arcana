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

export type DestinyMatrixResponse = {
  coreNumber: number;
  soulNumber: number;
  fateNumber: number;
  matrix: number[][];
  interpretation: string[];
};

export type NatalReportResponse = {
  sign: string;
  signRu: string;
  element: "Огонь" | "Земля" | "Воздух" | "Вода";
  lifePath: number;
  tone: "Активный" | "Сбалансированный" | "Осторожный";
  strengths: string[];
  growthZone: string;
  forecast: string;
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

export async function getDestinyMatrix(birthDate: string): Promise<DestinyMatrixResponse> {
  const endpoint = API_BASE_URL
    ? `${API_BASE_URL}/matrix?birthDate=${encodeURIComponent(birthDate)}`
    : `/matrix?birthDate=${encodeURIComponent(birthDate)}`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Matrix request failed: ${response.status}`);
  }

  return (await response.json()) as DestinyMatrixResponse;
}

export async function getNatalReport(birthDate: string): Promise<NatalReportResponse> {
  const endpoint = API_BASE_URL
    ? `${API_BASE_URL}/natal-report?birthDate=${encodeURIComponent(birthDate)}`
    : `/natal-report?birthDate=${encodeURIComponent(birthDate)}`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Natal report request failed: ${response.status}`);
  }

  return (await response.json()) as NatalReportResponse;
}
