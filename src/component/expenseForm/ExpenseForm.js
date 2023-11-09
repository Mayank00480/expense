import React, { useContext ,useRef} from 'react'
import './ExpenseForm.css'
import ExpenseStore from '../store/ExpenseStore'
const ExpenseForm = () => {
    const context = useContext(ExpenseStore)
    const expenseItem = useRef();
    const expenseDescription = useRef();
    const expensePrice = useRef();
    const submitHandler = (e) =>{
     e.preventDefault();
     const myObj = {
        expenseItem : expenseItem.current.value,
        expenseDescription : expenseDescription.current.value ,
        expensePrice : expensePrice.current.value
     }
     context.addItems(myObj)
    }
  return (
    <form onSubmit={submitHandler}>
        <div className='item'>
      <label id = "item1" htmlFor = "ExpenseItem" >Expense Item</label>
      <br/>
      <input type = "text" id = "ExpenseItem" ref = {expenseItem} required/>
      <br/>
      </div>
      <div className = "description" >
      <label id = "item2" htmlFor = "ExpenseDescription" >Expense Description</label>
      <br/>
      <input type = "text" id = "ExpenseDescription" ref = {expenseDescription} required/>
      <br/>
      </div>
      <div className = "price">
      <label id = "item3" htmlFor = "ExpensePrice" >Expense Price</label>
      <br/>
      <input type = "number" id = "ExpensePrice" ref = {expensePrice} required/>
      <br/>
      </div>
      <input type = "submit" />
    </form>
  )
}

export default ExpenseForm
