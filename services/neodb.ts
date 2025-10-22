import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase (database: SQLiteDatabase) {
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL,
      tipo_usuario INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1
    );

      INSERT OR IGNORE INTO usuarios (id, nome, email, senha)
        VALUES (1, 'Admin', 'admin@teste.com', '1234');

      CREATE TABLE IF NOT EXISTS chamados (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        descricao TEXT,
        prioridade INTEGER DEFAULT 1,
        status TEXT DEFAULT 'aberto',
        usuario_id INTEGER,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
      );
    `)
}