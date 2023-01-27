import { createContext, useContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

  const [display, setDisplay] = useState(JSON.parse(localStorage.getItem('state')))
  // const theSetter = {
  //   backgroundColor: theme ? "#99582a" : '#f8f8f8',
  //   color: theme ? '#f8f8f8' : "black",
  // }
  // const theSetter1 = {
  //   backgroundColor: theme ? '#f8f8f8' : "#292c2d",
  // }
  // const addToCart = () => {
  //   console.log('delay')
  // }
  const changeTheme = () => {
    setDisplay(!display)
  }

  useEffect(() => {
    localStorage.setItem('state', display);
  }, [display])

  return (
    <ThemeContext.Provider value={{ display,changeTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

