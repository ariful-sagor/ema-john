import React, { useState } from 'react';
import { useContext } from 'react';
import {UserContext} from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn , handleSignOut, handleFbLogIn, createUserWithEmailAndPassword, signInWithEmailAndPassword, resetPassword } from './LoginManager';


function Login() {
  const [newUser, setNewUser] =useState(false);
  const [user, setUser]= useState({
    isSignedIn:false,
    name:'', 
    email:'',
    phone:''
  });
  initializeLoginFramework();
  const googleSignIn = () =>{
    handleGoogleSignIn()
    .then(res =>{
        handleResponse(res, true);
    })
  }
  const signOut=() =>{
      handleSignOut()
      .then(res =>{
        handleResponse(res, false);
    })
  }
  const fbLogIn=() =>{
      handleFbLogIn()
      .then(res =>{
        handleResponse(res, true);
    })
  }

  const [loggedInUser, setLoggedInUser]=useContext(UserContext);
  const history= useHistory();
  const location= useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

    const handleSubmit =(e)=>{
      if(newUser && user.email && user.password){
        createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res =>{
            handleResponse(res, true);
        })
      }
      if(!newUser && user.email && user.password){
        signInWithEmailAndPassword(user.email, user.password)
        .then(res =>{
            handleResponse(res, true);
        })
      }
      e.preventDefault();
      }

    const handleResponse=(res, redirect)=> {
        setUser(res);
        setLoggedInUser(res);
        if(redirect){
           history.replace(from); 
        }
        
    }

    const handleChange = (event) => {
      let isFormValid =true;
      if(event.target.name=== 'email'){
        isFormValid = /\S+@\S+\.\S+/.test(event.target.value); 
        
      }
      if(event.target.name==='password'){
        isFormValid = event.target.value.length>5 && /\d{1}/.test(event.target.value);
      }
      if (isFormValid){
        const newUserInfo= {...user};
        newUserInfo[event.target.name]= event.target.value;
        setUser(newUserInfo);
      }
    }


  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> :
        <button onClick={googleSignIn}>Sign in with Google</button>
      }
      <br />
      <button onClick={fbLogIn}>Sign in with Facebook</button>
      {
        user.isSignedIn && <div> 
          <p>Welcome, {user.name} </p>
          <p>Your email {user.email}</p>
          <img src={user.photo}></img>
        </div>
      }
      <h1>Log in here</h1>
      <input type="checkbox" onChange={()=> setNewUser(!newUser)} name='newUser'></input>
      <label htmlFor='newUser'>New User Sign Up</label>
      <form onSubmit={handleSubmit}>

       {newUser && <input name='name' type="text" onBlur={handleChange} placeholder="Your User Name" required/>}
       <br />
       <input name='email' type="text" onBlur={handleChange} placeholder="Your Email Address" required/><br />
        <input name="password" type="password" onBlur={handleChange} placeholder="Your Password" required/><br />
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}></input>
      </form>
      <button onClick={() =>resetPassword(user.email)}>Forget Password</button>
      <p style={{color: 'red'}}>{user.error}</p>
      {user.success && <p style={{color: 'green'}}>User {newUser ? 'created' : 'Logged In'} Successfully</p>}
      

    </div>
  );
};

export default Login;