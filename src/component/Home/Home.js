import React, { useContext,useState } from 'react'
import ContextStore from '../store/ContextStore'
import { Link } from 'react-router-dom'
import './Home.css'
import ExpenseForm from '../expenseForm/ExpenseForm'
import ExpenseStore from '../store/ExpenseStore'
import ExpenseItem from '../ExpenseItems/ExpenseItem'
import { useEffect } from 'react'
const Home = () => {
    const context = useContext(ContextStore)
    const contxt = useContext(ExpenseStore)
    const [fetchedData , setFetchedData] = useState([])
    useEffect(() => {
      reload()
    },[])
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
    }

    const reload = () =>{
        fetch('https://expensetracker-4345b-default-rtdb.firebaseio.com/expense.json')
        .then(res => res.json())
        .then(resp => {
          let loadedData = []
          for(let key in resp){
              loadedData.push({
                id : key,
                expenseItem : resp[key].expenseItem,
                expensePrice : resp[key].expensePrice,
                expenseDescription : resp[key].expenseDescription
              })
          }
          setFetchedData(loadedData)
        })
    }
  return (
    <div >
     <button onClick = {() => {context.removeToken()
      
     }}> Logout</button>
     <div className = "header" >
      <p >Welcome to Expense Tracker</p>
      <button onClick = {verifyEmail}> verifyEmailId</button>
      <Link className = "link" to = "/profile" >Your Profile is incomplete</Link>
      </div>
      <ExpenseForm reload = {reload}/>
      <ExpenseItem fetchedData = {fetchedData}/>
    </div>
  )
}

export default Home
