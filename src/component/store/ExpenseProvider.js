import React, {  useState } from 'react'
import ExpenseStore from './ExpenseStore'
const ExpenseProvider = (props) => {
  const [items , setItems] = useState([]);
  console.log(items);
    const addItems = (val) =>{
       
      setItems(prevState => {
        return [...prevState , val]
      })
  }
  const removeItems = () =>{

  }
    const context = {
    item : items,
    addItems : addItems,
    removeItems : removeItems
  }
  return (
    <ExpenseStore.Provider  value = {context}>
      {props.children}
    </ExpenseStore.Provider>
  )
}

export default ExpenseProvider
