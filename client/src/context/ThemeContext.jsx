import React, { createContext, useContext, useEffect, useState } from 'react'


const ThemeContext = createContext()
export const useTheme = () => useContext(ThemeContext)


export function ThemeProvider({ children }) {
const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
useEffect(() => {
document.body.classList.toggle('dark-mode', dark)
localStorage.setItem('theme', dark ? 'dark' : 'light')
}, [dark])
const value = { dark, toggle: () => setDark(d => !d) }
return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}


