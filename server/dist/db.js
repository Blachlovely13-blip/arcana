import Database from "better-sqlite3";
let db = null;
try {
    db = new Database("arcana.db");
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
}
catch (error) {
    // Vercel serverless runtime may not support native sqlite bindings.
    // Keep API operational without persistence for MVP deployment.
    console.warn("SQLite init failed, running without persistence:", error);
}
export function saveUser(telegramId, birthDate) {
    if (!db)
        return;
    const stmt = db.prepare(`
    INSERT INTO users (telegram_id, birth_date)
    VALUES (?, ?)
    ON CONFLICT(telegram_id) DO UPDATE SET birth_date = excluded.birth_date
  `);
    stmt.run(telegramId, birthDate);
}
export function saveDecision(telegramId, question, result) {
    if (!db)
        return;
    const stmt = db.prepare(`
    INSERT INTO decisions (telegram_id, question, result)
    VALUES (?, ?, ?)
  `);
    stmt.run(telegramId, question, result);
}
