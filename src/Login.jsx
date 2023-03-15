import React, { useState } from 'react'
import {db} from "./firebase";
import {auth} from './firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import {collection,addDoc, getDoc, updateDoc,doc} from 'firebase/firestore'
import {app,storage} from './firebase'
import {ref} from 'firebase/storage'
export default function Login() {
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const [data,setData]=useState(null)
  const collectionRef=collection(db,'users')
  function handleLogin(e){
    e.preventDefault()
    addDoc(collectionRef,{
      email : email,
      password:password}
      ).then(
        console.log("Data stored")
      ).catch((e)=>{
        console.log(e.messsage)
      })
    signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{
      var user= userCredential.user
      console.log(user)
    }).catch((error)=>{
      alert("User does not exist")
    })
    const mRef=ref(storage,data.name)
  }
  return (
      <div>
        <h2 style={{display:'flex',justifyContent:'center',alignItems:'center'}}>Login</h2>
        <form onSubmit={handleLogin} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <label >Email:</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='xyz@gmail.com' required /> 
          <label >password:</label>
          <input type="password" placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
          {/* <input type='file' onChange={(e)=>{setData(e.target.files[0])}}></input> <br/> */}
          <button type='submit'>Login</button>
        </form>
      </div>
  )
}


 