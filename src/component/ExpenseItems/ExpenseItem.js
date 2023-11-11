import React, { useContext } from 'react'
import ExpenseStore from '../store/ExpenseStore'
import './ExpenseItem.css'
const ExpenseItem = (props) => {
  const context = useContext(ExpenseStore);
  let totalAmount = 0;
  props.fetchedData.forEach(item =>{
    totalAmount += Number(item.expensePrice)
  }) 
  const deleteExpense = (id) =>{

    fetch(`https://expensetracker-4345b-default-rtdb.firebaseio.com/expense/${id}.json`,{
      method : 'DELETE',
    })
    .then(res => res.json )
    .then(resp => {
      console.log(resp);
      console.log('Successfully Deleted')
      props.reload();
    })
  }
    return (
    <ul>
      {props.fetchedData.length > 0 && props.fetchedData.map(item => {
        return <li key = {item.id}>{item.expenseItem}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        {item.expenseDescription}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {item.expensePrice}
        <button className = "delete" onClick = {() => {
          deleteExpense(item.id);
        }}>Delete</button>
        <button className = "edit" onClick = {() => {
          console.log(item.id)
          props.editExpense(item.id)
        }}>Edit</button>
        </li>
      })}
      Total Amount : {totalAmount}
      <br/>
     {totalAmount > 10000 && <button>Activate Premium Button</button>}
    </ul>
  )
}

export default ExpenseItem
