# ARCANA - Telegram Mini App MVP

Decision engine mini app with deterministic numerology/astrology scoring plus AI-generated explanation.

## Stack

- Client: React + Vite + TypeScript + Tailwind + Telegram WebApp SDK
- Server: Node.js + Express + TypeScript
- Storage: SQLite (`better-sqlite3`)
- AI: OpenAI API (optional fallback if key is missing)

## Project Structure

- `client/` - Telegram Mini App UI
- `server/` - API and decision engine

## Environment

Create `server/.env`:

```env
OPENAI_API_KEY=your_api_key_here
PORT=3000
```

## Run

Backend:

```bash
cd server
npm install
npm run dev
```

Frontend:

```bash
cd client
npm install
npm run dev
```

Frontend proxies `/analyze` to `http://localhost:3000`.

## API

`POST /analyze`

Request:

```json
{
  "birthDate": "1996-05-14",
  "birthTime": "09:30",
  "question": "Should I start changing jobs now?",
  "telegramId": "123456"
}
```

Response:

```json
{
  "decision": "WAIT",
  "confidence": 64,
  "timing": "Best window: May 12-May 18",
  "explanation": "You are in a transitional phase...",
  "factors": [
    "Life Path 7 influences your baseline energy.",
    "Gemini pattern sets momentum 62 and risk 40."
  ]
}
```
