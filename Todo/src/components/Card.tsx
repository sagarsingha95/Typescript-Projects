
import type { ReactNode } from "react";
import { useTheme } from "../context/ThemeContext";

type CardProps = {
  children: ReactNode;
};

const Card = ({ children }: CardProps) => {
  const {theme} = useTheme()
  return (
    <div className={`rounded-lg border p-4 shadow-sm transition-colors duration-300 ${
        theme === "light"
          ? "border-gray-300 bg-gray-50"
          : "border-gray-700 bg-gray-800"
      }`}>
      {children}
    </div>
  );
};

export default Card;