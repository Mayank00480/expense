import React, { useContext ,useRef,useState , useEffect} from 'react'
import './ExpenseForm.css'
import ExpenseStore from '../store/ExpenseStore'
import ExpenseItem from '../ExpenseItems/ExpenseItem'
const ExpenseForm = (props) => {
  const [fetchedData , setFetchedData] = useState([])
    useEffect(() => {
      reload()
    },[])
    const context = useContext(ExpenseStore)
    const expenseItem = useRef();
    const expenseDescription = useRef();
    const expensePrice = useRef();
    const reload = () =>{
      fetch('https://expensetracker-4345b-default-rtdb.firebaseio.com/expense.json')
      .then(res => res.json())
      .then(resp => {
        let loadedData = []
        for(let key in resp){
          console.log(key)
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
    const submitHandler = (e) =>{
     e.preventDefault();
     const myObj = {
        expenseItem : expenseItem.current.value,
        expenseDescription : expenseDescription.current.value ,
        expensePrice : expensePrice.current.value
     }
     context.addItems(myObj)
     fetch('https://expensetracker-4345b-default-rtdb.firebaseio.com/expense.json',{
      method : 'POST',
      body : JSON.stringify(myObj),
      headers :{
        'Content-Type' : 'application/json'
      }
     })
     .then(res => res.json())
     .then(resp => {
      if(resp.error){
        alert(resp.error.message)
      }
      else{
        console.log(resp);
      }
      reload();
     })
    }
    const editExpense = (id) =>{
      const myObj = {
        expenseItem : expenseItem.current.value,
        expenseDescription : expenseDescription.current.value ,
        expensePrice : expensePrice.current.value
     }
     console.log(id)
     fetch(`https://expensetracker-4345b-default-rtdb.firebaseio.com/expense/${id}.json`,{
      method : 'PUT',
      body : JSON.stringify(myObj)
     })
     .then(res => res.json())
     .then(resp =>{ 
      if(resp.error){
        alert(resp.error.message)
      }
      else{
      console.log(resp)
      reload()
      } 
     })
    }
  return (<>
    <form className = "addExpense" onSubmit={submitHandler}>
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
    <ExpenseItem fetchedData = {fetchedData} reload = {reload} editExpense = {editExpense}/>
    </>
  )
}

export default ExpenseForm
