import ContextStore from './ContextStore'

import React,{useState} from 'react'
import AuthForm from '../Auth/AuthForm';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import Home from '../Home/Home';

const ContextProvider = (props) => {
    const [token , setToken] = useState(null);
    console.log(token)
    const addTokenHandler = (token) =>{
       setToken(token);
    }
    const removeTokenHandler = () =>{
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
     { context.token != null && <Route exact path = "/home" Component = {Home} /> }
     <Route exact path = "*" Component = {AuthForm} />
     </Routes>
    </Router>
    </ContextStore.Provider>
  )
}

export default ContextProvider
