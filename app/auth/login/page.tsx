'use client'
// import React from 'react'
import * as React from 'react';
import { Login } from '@/api/api-service/auth.service'
import TextField from '@mui/material/TextField';
import './login.css'
import { saveCookies } from '@/api/api-service/Cookie/cookie';
import { useRouter } from 'next/navigation';



const loginPage = () => {

  const router = useRouter()
   
    const handleSubmit = async (formData:FormData)=>{
        let username = formData.get("username")
        let password = formData.get("password")
        let payload = {username, password}
        console.log(payload)
        const response = await Login(payload)
        if (response?.data?.token) {
          saveCookies(response?.data?.token)
            if(response?.data.role === "admin"){
                router.push("/admin")
            } else if (response?.data.role === "employee") {
              router.push("/userPanel")  
            }
        }
        console.log(response);
    }   


  return (
    <div>
        <div className="parent">
            <center>
              <div className="child">
              <form action={handleSubmit}>
                <label>Login</label>
                <TextField id="standard-basic" label="Username" variant="standard" name='username' />
                <TextField id="standard-basic" label="Password" variant="standard" name='password' />
                <button className=' text-black ' type="submit" >Login</button>
                
              </form>
              </div>
            </center>
        </div>
    </div>
  )
}

export default loginPage