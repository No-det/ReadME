import { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = (props) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
