import { createContext, useContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [display, setDisplay] = useState(JSON.parse(localStorage.getItem('state')))
  // changes the value if display from false to true 
  const changeTheme = () => {
    setDisplay(!display)
  }
  
  useEffect(() => {
    localStorage.setItem('state', display);
  }, [display])

  const [cartAlert, setCartAlert] = useState(false)

  const cartA = () => {
    setCartAlert(true)
    setTimeout(function () {
      setCartAlert(false)
    }, 3000);

  }
  return (
    <ThemeContext.Provider value={{ display, changeTheme, cartAlert, cartA }}>
      {children}
    </ThemeContext.Provider>
  )
}

