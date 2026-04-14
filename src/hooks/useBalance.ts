import { useState, useEffect } from "react";
import { initDatabase, getBalance, addBalance } from "../database/db";

export const useBalance = () => {
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      initDatabase();
      refreshBalance();
    } catch (error) {
      console.error("DB Init Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshBalance = () => {
    const total = getBalance();
    setBalance(total);
  };

  const saveBalance = (amount: number) => {
    addBalance(amount);
    refreshBalance();
  };

  return { balance, saveBalance, loading };
};
