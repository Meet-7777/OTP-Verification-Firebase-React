import SignUp from "./SignUp";
import  Login from './Login.jsx'
import {db} from './firebase'
import {auth} from './firebase'
import { useState , useEffect} from "react";
import './App.css'

function App() {
  const[user,setUser]=useState(null)
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        setUser(user)
      }
      else{
        setUser(null)
      }
    })
  },[])
  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.email}</h2>
          <button onClick={() =>auth.signOut()}>Logout</button>
        </div>
      ) : (
        <div>
          <Login />
          <SignUp />
        </div>
      )}
    </div>
  );
}

export default App;