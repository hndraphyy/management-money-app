import React, { createContext, useContext, useState, ReactNode } from "react";
import { colors } from "./theme";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  theme: typeof colors.light;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>("light");

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  const theme = colors[mode];

  return (
    <ThemeContext.Provider
      value={{ theme, isDarkMode: mode === "dark", toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useAppTheme harus di dalam ThemeProvider");
  return context;
};
