import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './AuthForm.module.css';
import ContextStore from '../store/ContextStore'; 
const AuthForm = () => {
 const navigate = useNavigate()
 const context = useContext(ContextStore)
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading , setIsLoading] = useState(false);
  const emailInput = useRef();
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (e) =>{
    e.preventDefault();
    let url;
   
    if(isLogin){
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDTR6ElU-dwM_da4ZXS4s7leT8d6kyUaI4'
    }
  else {
     url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTR6ElU-dwM_da4ZXS4s7leT8d6kyUaI4'
  }
  if(isLogin ||  (confirmPasswordInput.current.value === passwordInput.current.value ))
  {
  fetch(url,{
    method : 'POST',
    body : JSON.stringify({
      email : emailInput.current.value,
      password : passwordInput.current.value
    })
  })
  .then(res => {
  return res.json();
  })
  
  .then(respons =>{
    if(respons.error){
      alert(respons.error.message)
    }
    else{
    console.log(respons.email);
    let email = respons.email;
    email = email.replaceAll(".","")
    email = email.replaceAll("@","");
    localStorage.setItem("expenseEmail" , email)
   navigate('/home')
    context.addToken(respons.idToken)
    }
  } )
  
}
  
  else {
    alert('Password must match')
  }
 
  }
  return (
    <>
    
    <section className={classes.auth}>
      
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control} >
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email'placeholder = "userEmail" required ref = {emailInput}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref = {passwordInput}
          />
        </div>
      {!isLogin &&  <div className={classes.control}>
          <label htmlFor='password'>Confirm Password</label>
          <input
            type='password'
            id='confirmPassword'
            required
            ref = {confirmPasswordInput}
          />
        </div>}
        <div className={classes.actions}>
       { isLoading? <p>Loading...</p> :<button type = "submit">{ isLogin? 'Login' : 'Signup' 
}</button>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
          <button type = "button" className={classes.toggle} onClick={() => {navigate('/ForgotPassword')}}>Forgot Password</button>
        </div>
      </form>
    </section>
    </>
  );
};

export default AuthForm;
