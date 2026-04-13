import React from "react";
import Svg, { Path } from "react-native-svg";
import { useAppTheme } from "../constants/ThemeContext";

interface Props {
  width?: number | string;
  height?: number | string;
}

const OnboardingIllustration = ({ width = 200, height = 200 }: Props) => {
  const { theme } = useAppTheme();

  return (
    <Svg width={width} height={height} viewBox="0 0 500 500" fill="none">
      {/* COPAS PATH ASLI DARI FILE SVG LO DI SINI */}
      <Path
        d="M150 150 L350 150 L250 350 Z" // Contoh path (Ganti pake isi file onboarding.svg lo)
        fill={theme.primary}
      />
      <Path d="M100 400 H400" stroke={theme.secondary} strokeWidth="10" />
    </Svg>
  );
};

export default OnboardingIllustration;
