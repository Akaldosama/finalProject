"use client"
import React, { useEffect, useState } from 'react'
import Button from "@mui/material/Button";
import UsersModal from './modalUser/Modal';
import { getUsers, DeleteUser } from '@/api/api-service/user.service';
import './users.css'

const Users = () => {
    const [users, setUsers] = useState([])
    const [edit, setEdit] = useState("");
    const [open, setOpen] = useState(false)
// search
    const [searchInput, setSearchInput] = useState("");
    const filteredUsers = users?.filter((user:any) =>
      user.first_name.toLowerCase().includes(searchInput.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchInput.toLowerCase()) ||
      user.username.toLowerCase().includes(searchInput.toLowerCase())
    );

// pagination
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 6;

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);


    const fn=async()=>{
      const data = await getUsers()
      setUsers(data?.data )
    }

    useEffect(()=>{fn()},[])
    console.log(users)

    const updateUsers = (item: any) => {
      setEdit(item);
      setOpen(true);
    };

    const handleDelete = async(id:any)=>{
      console.log(id)
      const data = await DeleteUser(id)
      return data
    }

  return (
    <div className='container'>
      <UsersModal open={open}  edit={edit} setOpen={setOpen} setEdit={setEdit}/>
      <div className='navbarUser'>
      <Button
        variant="contained"
        onClick={()=>setOpen(true)}
        className="addButton">
        Add users
      </Button>
      <input
        type="text"
        placeholder="Search users..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className='inputFilter'
      />
      </div>
      <div className='wrapper'>
      {
        currentUsers?.map((item:any, index)=>{
          return <div key={index} className='parent'>
            <div className="child">
              <img src={`http://localhost:8080/${item?.avatar}`} alt="avatar" className='w-[100%] h-[200px]' />
            </div>
            <div className="child">
              <span>Name: <i>{item?.first_name}</i></span> <br />
              <span>Last name: <i>{item?.last_name}</i></span><br />
              <span>Age: <i>{item?.age}</i></span><br />
              <span>Role: <i>{item?.role}</i></span><br />
              <span>Username: <i>{item?.username}</i></span><br />
              <p>Description: <i>{item?.description}</i></p><br />
              <div className='buttonDisplay'>
                <button
                  onClick={() => updateUsers(item)}
                  className="editBtn">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="deleteBtn" >
                  Delete
                </button>
              </div>
            </div>
          </div>
        })
      }
      </div>
      <div className='pagination'>
      <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
        Prev
      </Button>
      <span>{currentPage} / {Math.ceil(filteredUsers?.length / usersPerPage)}</span>  
      <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(filteredUsers?.length / usersPerPage)}>
        Next
      </Button>
      </div>
    </div>
  );
}

export default Users;