import { createContext, useContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('state')))
  const [notice, setNotice] = useState(true)
  const theSetter = {
    backgroundColor: theme ? "#99582a" : '#f8f8f8',
    color: theme ? '#f8f8f8' : "black",
  }
  const theSetter1 = {
    backgroundColor: theme ? '#f8f8f8' : "#292c2d",
  }
  const addToCart = () => {
    console.log('delay')
  }
  const changeTheme = () => {
    setTheme(!theme)
  }

  useEffect(() => {
    localStorage.setItem('state', theme);
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, theSetter, theSetter1, changeTheme, addToCart, notice }}>
      {children}
    </ThemeContext.Provider>
  )
}

