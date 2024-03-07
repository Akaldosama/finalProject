import React from 'react'
import Link from '@mui/material/Link';
import './globals.css'

export default function Home() {
  return (
    <div className='main'> 
      <center>
      <div className='mainPage'>
        <h1 className='mainh1'>Home Page</h1>
        <p className='mainParag'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae libero at asperiores, numquam, facilis natus, atque sequi neque provident quae nulla assumenda incidunt veritatis inventore obcaecati dignissimos? Molestias, fugiat illum!</p>
        <Link href="/auth/login" color="inherit" className='mainLogin'>Login</Link>
      </div>
      </center>
    </div>
  )
}
