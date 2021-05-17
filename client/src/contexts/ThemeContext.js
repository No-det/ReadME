import { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = (props) => {
    const [theme, setTheme] = useState("dark");
    const isDarkTheme = () => {
        return theme === "dark";
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, isDarkTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
