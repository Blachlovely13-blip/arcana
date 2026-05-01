import Database from "better-sqlite3";

const db = new Database("arcana.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    telegram_id TEXT NOT NULL UNIQUE,
    birth_date TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS decisions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    telegram_id TEXT,
    question TEXT NOT NULL,
    result TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

export function saveUser(telegramId: string, birthDate: string): void {
  const stmt = db.prepare(`
    INSERT INTO users (telegram_id, birth_date)
    VALUES (?, ?)
    ON CONFLICT(telegram_id) DO UPDATE SET birth_date = excluded.birth_date
  `);
  stmt.run(telegramId, birthDate);
}

export function saveDecision(telegramId: string | null, question: string, result: string): void {
  const stmt = db.prepare(`
    INSERT INTO decisions (telegram_id, question, result)
    VALUES (?, ?, ?)
  `);
  stmt.run(telegramId, question, result);
}
