import React,{useRef,useContext, useEffect} from 'react'
import './Profile.css'
import ContextStore from '../store/ContextStore';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const navigate = useNavigate()
    const inputUrl = useRef();
    const inputName = useRef(); 
    const context = useContext(ContextStore);
    console.log(localStorage.getItem("expenseToken"))
    useEffect(() =>{
   fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDTR6ElU-dwM_da4ZXS4s7leT8d6kyUaI4',{
    method : 'POST',
    body : JSON.stringify({
      idToken : localStorage.getItem("expenseToken") 
    })
   })
   .then(res => res.json())
   .then(resp => {
    if(resp.error){
      console.log(resp.error.message)
    }
    else {
      console.log(resp.users[0]);
      inputUrl.current.value = resp.users[0].photoUrl
      inputName.current.value = resp.users[0].displayName       
    }
   })
    },[])
    const submitHandler = (e) =>{
      e.preventDefault();
      console.log(inputUrl.current.value , inputName.current.value) 
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDTR6ElU-dwM_da4ZXS4s7leT8d6kyUaI4',{
        method : 'POST' ,
        body : JSON.stringify({
            idToken : localStorage.getItem("expenseToken"),
            displayName : inputName.current.value,
            photoUrl : inputUrl.current.value
        })
      })
      .then(res => res.json())
      .then(resp => {
        if(resp.error){
          alert(resp.error.message);
    }
        else{
            console.log(resp);
            navigate('/home')
        }
})
      .catch(err => console.log(err)); 
    
  }

  return (
    <form onSubmit = {submitHandler}>
      <h3>Contact Details</h3>
      <label>Full Name</label>
      <br/>
      <input type = "text" ref = {inputName} />
      <br/>
      <label>Profile Photo URL</label>
      <br/>
      <input type = "text" ref = {inputUrl}/>
      <br/>
      <button type = "submit">update</button>
      <hr />
    </form>
  )
}

export default Profile
