import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("wallet.db");

export const initDatabase = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount INTEGER NOT NULL,
      type TEXT NOT NULL, -- 'income' atau 'expense'
      date TEXT NOT NULL
    );
  `);
};

export const getBalance = (): number => {
  const result = db.getFirstSync<{ total: number }>(`
    SELECT 
      SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END) as total 
    FROM transactions
  `);
  return result?.total ?? 0;
};

export const addBalance = (amount: number) => {
  db.runSync("INSERT INTO transactions (amount, type, date) VALUES (?, ?, ?)", [
    amount,
    "income",
    new Date().toISOString(),
  ]);
};
