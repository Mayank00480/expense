import React, { useContext } from 'react'
import ExpenseStore from '../store/ExpenseStore'
import './ExpenseItem.css'
const ExpenseItem = (props) => {
  const context = useContext(ExpenseStore);
 
  
    return (
    <ul>
      {props.fetchedData.length > 0 && props.fetchedData.map(item => {
        return <li key = {Math.random().toString()}>{item.expenseItem}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {item.expenseDescription}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {item.expensePrice}</li>
      })}
    </ul>
  )
}

export default ExpenseItem
