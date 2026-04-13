import { useState } from "react";
import { colors } from "../constants/theme";

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;
  return { theme, isDarkMode, toggleTheme };
};
