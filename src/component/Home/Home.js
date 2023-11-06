import React, { useContext } from 'react'
import ContextStore from '../store/ContextStore'
import { Link } from 'react-router-dom'
import './Home.css'
const Home = () => {
    const context = useContext(ContextStore)
  return (
    <>
     <button onClick = {() => {context.removeToken()
      
     }}> Logout</button>
     <div className = "header" >
      <p >Welcome to Expense Tracker</p>
      <Link className = "link" to = "/profile" >Your Profile is incomplete</Link>
      </div>
    </>
  )
}

export default Home
