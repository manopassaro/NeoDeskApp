import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase (database: SQLiteDatabase) {
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS chamados (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        descricao TEXT,
        status TEXT DEFAULT 'aberto'
      );
    `)
}