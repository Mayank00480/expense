import React, { useContext } from 'react'
import ContextStore from '../store/ContextStore'
const Home = () => {
    const context = useContext(ContextStore)
  return (
    <>
     <button onClick = {() => {context.removeToken()
      
     }}> Logout</button>
      <h1>Welcome to Expense Tracker</h1>
    </>
  )
}

export default Home
