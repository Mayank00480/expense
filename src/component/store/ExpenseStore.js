import React from 'react'
const ExpenseStore = React.createContext({
    items : [],
    addItems : ()=>{},
    removeItems : () => {}
})

export default ExpenseStore
