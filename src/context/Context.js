import { createContext, useState, useEffect, useContext } from "react";

const Context = createContext();

export const ContextProvider = ({children}) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme'));

    useEffect(()=>{
        localStorage.setItem("theme", theme);
    }, [theme]);

    const values = {
        theme,
        setTheme
    }
    return <Context.Provider value={values}>{children}</Context.Provider>
}


export const  useTheme = () => useContext(Context);


