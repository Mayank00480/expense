import React, { useContext } from 'react'
import ExpenseStore from '../store/ContextStore'
import './ExpenseItem.css'
const ExpenseItem = (props) => {
  const context = useContext(ExpenseStore);
  let totalAmount = 0;
  props.fetchedData.forEach(item =>{
    totalAmount += Number(item.expensePrice)
  }) 
  const deleteExpense = (id) =>{

    fetch(`https://expensetracker-4345b-default-rtdb.firebaseio.com/expense/${localStorage.getItem("expenseEmail")}/${id}.json`,{
      method : 'DELETE',
    })
    .then(res => res.json )
    .then(resp => {
      console.log(resp);
      console.log('Successfully Deleted')
      props.rel();
     
      
    })
  }
    return (
    <ul className = {context.darkTheme ? 'dark' : ''}>
     { console.log(props.fetchedData)}
      {props.fetchedData && props.fetchedData.map(item => {
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
    { totalAmount > 0 && <>Total Amount : {totalAmount}</> }
      <br/>
     {totalAmount > 10000 && <button id = "prem" onClick = {() => {
      context.toggleDarkTheme();
     }}>Activate Premium Button</button>}
    </ul>
  )
}

export default ExpenseItem
