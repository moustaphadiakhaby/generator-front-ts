import { useState, createContext, useContext } from "react";

interface Props {
  children: any[];
}

export type ThemeContextType = "light" | "dark";

type Context = {
  theme: ThemeContextType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeContextType>>;
};

const ThemeContext = createContext<Context>({
  theme: "dark",
  setTheme: () => {},
});

const ThemeProvider = (props: Props) => {
  const [theme, setTheme] = useState<ThemeContextType>("dark");

  console.log(props);

  const contextValue: Context = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
