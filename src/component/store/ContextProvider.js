import ContextStore from './ContextStore'
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import React,{useState} from 'react'
import AuthForm from '../Auth/AuthForm';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import ExpenseProvider from './ExpenseProvider';
const ContextProvider = (props) => {
    const [token , setToken] = useState(null);
    const [darkTheme , setDarkTheme] = useState(false);
    const toggleDarkTheme = () =>{
      setDarkTheme(prevState => {
        return !prevState
      })
    }
    console.log(token)
    const addTokenHandler = (token) =>{
      localStorage.setItem("expenseToken" , token); 
      setToken(token);

    }
    const removeTokenHandler = () =>{
        localStorage.removeItem("expenseToken")
        setToken(null);
    }
    const context = {
       token : token,
       addToken : addTokenHandler ,
       removeToken : removeTokenHandler ,
       darkTheme : darkTheme,
       toggleDarkTheme : toggleDarkTheme
    }
  return (
    <ContextStore.Provider style = {{backgroundColor : 'black' , color : 'white'}}value = {context}>
      <ExpenseProvider>
       <Router>
      <Routes>
      <Route exact path = "/" Component = {AuthForm} />
      <Route exact path = "/ForgotPassword" Component={ForgotPassword} />
     { localStorage.getItem("expenseToken") && <Route exact path = "/home" Component = {Home} /> }
     { localStorage.getItem("expenseToken") && <Route exact path = "/Profile" Component = {Profile} /> }
     <Route exact path = "*" Component = {AuthForm} />
     </Routes>
    </Router>
    </ExpenseProvider>
    </ContextStore.Provider>
  )
}

export default ContextProvider
