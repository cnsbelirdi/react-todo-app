import { createContext, useState } from "react";

const ThemeContext = createContext();
localStorage.setItem('theme', 'light');
const currentTheme = localStorage.getItem('theme');
export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(currentTheme);

    const handleSetTheme = (theme) => {
        setTheme(theme);
        localStorage.setItem('theme', theme);
    }

    const values = {
        theme,
        handleSetTheme
    }

    return <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
}

export default ThemeContext;