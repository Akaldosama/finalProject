"use client"
import { getUserme } from "@/api/api-service/userPanel/userme.service"
import { IUserMe } from "@/api/types/userPanel/userme.types"
import React, {useEffect, useState} from 'react'
import './profile.css'

export default function Profile() {
    const [userme, setUserme] = useState<IUserMe>([])

    const GetUserme = async () => {
        const response = await getUserme()
        setUserme(response?.data?.data)
      }

    useEffect(() => {
        GetUserme()
    },[])


  return (
    <div className="container">
        <div className="parent">
          <div className="child">
            <img src={`http://localhost:8080/${userme?.avatar}`} alt="" className="imgUser" />
          </div>
          <div className="child">
            <ul className="ulUserList">
              <li>First Name: <i>{userme.first_name}</i></li>
              <li>Last Name: <i>{userme.last_name}</i></li>
              <li>Age: {userme.age}</li>
              <li>Username: {userme.username}</li>
              <li>Description: {userme.description}</li>
            </ul>
          </div>
        </div>
    </div>
  )
}
