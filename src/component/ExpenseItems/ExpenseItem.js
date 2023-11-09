import React, { useContext } from 'react'
import ExpenseStore from '../store/ExpenseStore'
import './ExpenseItem.css'
const ExpenseItem = () => {
  const context = useContext(ExpenseStore);
    return (
    <ul>
      {context.item.map(item => {
        return <li key = {Math.random().toString()}>{item.expenseItem}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {item.expenseDescription}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {item.expensePrice}</li>
      })}
    </ul>
  )
}

export default ExpenseItem
