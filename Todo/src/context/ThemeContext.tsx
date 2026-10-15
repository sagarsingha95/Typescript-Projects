import { createContext, useContext, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
    theme:Theme,
    toggleTheme: ()=>void
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

type ThemeProviderProps = {
    children:ReactNode;
};



export const ThemeProvider = ({children}:ThemeProviderProps) => {
    const [theme,setTheme] = useState<Theme>("light");

    function toggleTheme(){
        setTheme((curr)=> curr === "light" ? "dark":"light");
    };

  return (
    <ThemeContext.Provider value = {{theme,toggleTheme}}>{children}</ThemeContext.Provider>
  )
}

export function useTheme(){
    const context = useContext(ThemeContext);

    if(context === null){
        throw new Error("useTheme must be within ThemeProvider");
    };
    return context
}