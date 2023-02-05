import { createContext, useContext, useState, useEffect } from 'react';
import { user } from "../../LOGIN/user"
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



  // handles user logins
  const [activeuser, setactiveuser] = useState(JSON.parse(localStorage.getItem('activeuser')))
  useEffect(() => {
    localStorage.setItem('activeuser', JSON.stringify(activeuser ? activeuser : {}));
    // console.log(activeuser)
  }, [activeuser])


  // handle signUps
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')))
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users ? users : []))
    // console.log(users)
  }, [users])



  const [cartAlert, setCartAlert] = useState(false)
  const cartA = () => {
    setCartAlert(true)
    setTimeout(function () {
      setCartAlert(false)
    }, 3000);

  }
  return (
    <ThemeContext.Provider value={{ display, changeTheme, cartAlert, cartA, activeuser, setactiveuser, users, setUsers }}>
      {children}
    </ThemeContext.Provider>
  )
}

