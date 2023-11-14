import React, { useRef ,useState} from 'react'
import classes from './ForgotPassword.module.css'
import { useNavigate } from 'react-router-dom'
const ForgotPassword = () => {
    const passwordInput = useRef()
    const navigate = useNavigate()
    const [isLoading ,setIsLoading] = useState(false)
    const forgotEmail = () =>{

         setIsLoading(true)
         fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDTR6ElU-dwM_da4ZXS4s7leT8d6kyUaI4',{
            method : 'POST',
            body : JSON.stringify({
                requestType : "PASSWORD_RESET",
                email : passwordInput.current.value
            })
         })
         .then(res => res.json())
         .then(resp => {
            if(resp.error){
                alert(resp.error.message)
            }
            else{
                console.log(resp);
            }
            setIsLoading(false)
            
         })
    }
    return (
    <section className={classes.auth}>
      
      
      <form >
       
        <div className={classes.control}>
          <label htmlFor='email'>Your Email ID</label>
          <input
            type='email'
            id='email'
            required
            ref = {passwordInput}
          />
        </div>
     
        <div className={classes.actions}>
         {isLoading && <p style = {{color : 'white'}}> Loading...</p> }
          {!isLoading && <button type = "button" onClick = {forgotEmail}>Send Link</button> }
          <button type = "button" className = {classes.toggle} onClick = {() => {navigate('/auth')}}> Already a User? Login</button>
        </div>
      </form>
    </section>
  )
}

export default ForgotPassword
