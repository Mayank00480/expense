import ContextStore from './ContextStore'
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import React,{useState} from 'react'
import AuthForm from '../Auth/AuthForm';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
const ContextProvider = (props) => {
    const [token , setToken] = useState(null);
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
       removeToken : removeTokenHandler 
    }
  return (
    <ContextStore.Provider value = {context}>
       <Router>
      <Routes>
      <Route exact path = "/" Component = {AuthForm} />
      <Route exact path = "/ForgotPassword" Component={ForgotPassword} />
     { localStorage.getItem("expenseToken") && <Route exact path = "/home" Component = {Home} /> }
     { localStorage.getItem("expenseToken") && <Route exact path = "/Profile" Component = {Profile} /> }
     <Route exact path = "*" Component = {AuthForm} />
     </Routes>
    </Router>
    </ContextStore.Provider>
  )
}

export default ContextProvider
