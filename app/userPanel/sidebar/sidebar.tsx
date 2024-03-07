"use client"
import React, {useState, useEffect, ReactNode} from 'react'
import Image from 'next/image'
import styles from './sidebar.module.css'
import { IUserMe } from '@/api/types/userPanel/userme.types'
import { getUserme } from '@/api/api-service/userPanel/userme.service'
import {
  MdPeople,
  MdSupervisedUserCircle,
} from 'react-icons/md'
import MenuLink from './menuLink/menuLink';

interface MenuItem {
  title: string;
  list: SubMenuItem[];
}

interface SubMenuItem {
  title: string;
  path: string;
  icon: ReactNode;
}

const menuItems:MenuItem[] = [
  {
    title: "Pages",
    list: [
      {
        title: "Profile",
        path: "/userPanel/profile",
        icon: <MdPeople/>
      },
      {
        title: "Guides",
        path: "/userPanel/guides",
        icon: <MdSupervisedUserCircle/>
      },
    ]
  }
]



export default function Sidebar() {
  const [userme, setUserme] = useState<IUserMe>([])

  const GetUserme = async () => {
    const response = await getUserme()
    setUserme(response?.data?.data)
  }

  useEffect(() => {
    GetUserme()
  },[])

  return (
    <div className={styles.container}>
      <div className={styles.guides}>
        <Image 
        src='/noavatar.jpg'
        className={styles.userImage}
        alt='Avatar'
        width='50'
        height='50'
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>{userme?.username}</span>
          <span className={styles.userTitle}>Employee</span>
        </div>
      </div>
      <ul>
        {
          menuItems.map((item, index) => {
            return <li key={index}>
              {
                item.list.map(menu => (
                  <MenuLink key={index} menu={menu} />
                ))
              }
            </li>
          })
      }
      </ul>
    </div>
  )
}