"use client"
import { createContext, ReactNode, useEffect, useState } from "react"

interface AppContextProps {
  theme?: string
  switchTheme?: ()=> void
}
interface AppProviderProps {
  children: ReactNode
}
export const AppContext = createContext<AppContextProps>({})

export function AppProvider({children}: AppProviderProps){
  const [theme, setTheme] = useState<string>('dark')

  function switchTheme() {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  useEffect(()=> {
    const savedTheme = localStorage.getItem('theme')
    if(savedTheme){
      setTheme(savedTheme)
    }
  }, [])
  return(
    <AppContext.Provider value={{
      theme,
      switchTheme
    }}>
      {children}
    </AppContext.Provider>
  )
}