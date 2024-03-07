"use client"
import React, { useEffect, useState } from 'react'
import Button from "@mui/material/Button";
import { getGuides, addGuides } from '@/api/api-service/userPanel/guides.service';
import './guides.css'
import { IUserGuides } from '@/api/types/userPanel/guides.types';

const Guides = () => {
  const [guides, setGuides] = useState([])
  const [isChecked, setIsChecked] = useState(false)

// search
  const [searchInput, setSearchInput] = useState("");
  const filteredGuides = guides.filter((guides:any) =>
  guides.title.toLowerCase().includes(searchInput.toLowerCase()));
// pagination
  const [currentPage, setCurrentPage] = useState(1);
  const guidesPerPage = 6;

  const indexOfLastGuides = currentPage * guidesPerPage;
  const indexOfFirstGuides = indexOfLastGuides - guidesPerPage;
  const currentGuides = filteredGuides.slice(indexOfFirstGuides, indexOfLastGuides);

  const GetGuides = async () => {
    const response = await getGuides()
    setGuides(response?.data?.data)
  }

  useEffect(()=>{
    GetGuides()
  },[])

  const addUserGuides = async(id: any) => {
    const response = await addGuides(id)
    return response
  }

  return (
    <div className='container'>
      <div className='navbarGuides'>
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
          currentGuides?.map((item:any, index)=>(
            <div key={index} className='parent'>
              <div className="child">
                <span>Title: <i>{item?.title}</i></span> <br />
                <span>Content: <i>{item?.content}</i></span><br />
              </div>
              <form action={addUserGuides}>
                <input type="checkbox"  checked={isChecked} /> <i>Read</i>
              </form>
            </div>
          ))
        }
      </div>
      <div className='pagination'>
        <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </Button>
        <span>{currentPage} / {Math.ceil(filteredGuides.length / guidesPerPage)}</span>
        <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(filteredGuides.length / guidesPerPage)}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default Guides;