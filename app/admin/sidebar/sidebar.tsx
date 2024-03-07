'use client'
import React, {useState, useEffect, ReactNode} from 'react'
import Image from 'next/image'
import { getUserme } from '@/api/api-service/userPanel/userme.service'
import styles from './sidebar.module.css'
import { IUserMe } from '@/api/types/userPanel/userme.types'
import MenuLink from './menuLink/menuLink';

import {
  MdPeople,
  MdSupervisedUserCircle,
  MdAttachMoney,
  MdDashboard
} from 'react-icons/md'

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
        title: "Users",
        path: "/admin/users",
        icon: <MdPeople/>
      },
      {
        title: "Guides",
        path: "/admin/guides",
        icon: <MdSupervisedUserCircle/>
      },
      {
        title: "User Guides",
        path: "/admin/userGuides",
        icon: <MdAttachMoney />
      },
      {
        title: "Profile",
        path: "/admin/profile",
        icon: <MdDashboard />
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
      <div className={styles.user}>
        <Image 
        src='/noavatar.jpg'
        className={styles.userImage}
        alt='Avatar'
        width='50'
        height='50'
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>{userme?.username}</span>
          <span className={styles.userTitle}>Adminstrator</span>
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