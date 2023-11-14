import React, { useContext,useState } from 'react'
import ContextStore from '../store/ContextStore'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import './Home.css'
import ExpenseForm from '../expenseForm/ExpenseForm'
import ExpenseStore from '../store/ExpenseStore'
import ExpenseItem from '../ExpenseItems/ExpenseItem'
import { useEffect } from 'react'
const Home = () => {
    const context = useContext(ContextStore)
    const contxt = useContext(ExpenseStore)
    const navigate = useNavigate()
    console.log(contxt.item)
    const verifyEmail = () =>{
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDTR6ElU-dwM_da4ZXS4s7leT8d6kyUaI4',{
        method : 'POST',
        body : JSON.stringify({
          requestType : "VERIFY_EMAIL",
          idToken : localStorage.getItem("expenseToken") 
        })
      })
      .then(res => res.json())
      .then(resp =>{
        if(resp.error){
          alert(resp.error.message)
        }
        else{
          console.log(resp);
        }
      })
      alert('Verification Gmail sent')
    }

    
  return (
    <div >
        <div className = "component">
     <button id = "logout" onClick = {() => {
      context.removeToken()
      navigate('/auth');
     }}> Logout</button>
     <div className = "header" >
      <p style={{fontSize:'30px'}}>Welcome to Expense Tracker</p>
      <button id = "verifyEmail" onClick = {verifyEmail}> verifyEmailId</button>
      <Link className = "link" to = "/profile" >Your Profile is incomplete</Link>
      </div>
      </div>
      <div className = "expenseData">
      <ExpenseForm />
      </div>
      
    </div>
  )
}

export default Home
