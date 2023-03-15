import React from 'react'
import { useState } from 'react'
import {db} from './firebase'
import {addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import{auth} from './firebase' 
export default function SignUp() {
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const collectionRef = collection(db,'users')
    function handleSignUp(e){
        e.preventDefault()
        addDoc(collectionRef,{
          email : email,
          password:password}
          ).then(
            console.log("Data stored")
          ).catch((e)=>{
            console.log(e.messsage)
          })
        createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
          var user=userCredential.user
          console.log(user)
        }).catch((error)=>{
          console.log(error.message)
        });
    }
  return (
    <div>
        <h2 style={{display:'flex',justifyContent:'center',alignItems:'center'}}>Sign up</h2>
        <form onSubmit={handleSignUp} style={{display:'flex',justifyContent:'center',alignItems:'center'}} type='submit'>
          <label >Email:</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='xyz@gmail.com' /> 
          <label >password: </label>
          <input type="password" placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <button type='submit'>Sign Up</button>
        </form>
    </div>
  )
}
