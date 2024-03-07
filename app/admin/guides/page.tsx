"use client"
import React, { useEffect, useState } from 'react'
import Button from "@mui/material/Button";
import ModalGuides from './modalGuides/Modal';
import { getGuides, deleteGuides } from '@/api/api-service/guides.service';
import { IGuides } from '@/api/types/guides.types';
import './guides.css'

const Guides = () => {
  const [guides, setGuides] = useState([])
  const [edit, setEdit] = useState<IGuides>();
  const [open, setOpen] = useState(false)

// search
  const [searchInput, setSearchInput] = useState("");
  const filteredGuides = guides.filter((guides:any) =>
  guides.title.toLowerCase().includes(searchInput.toLowerCase())
    );
// pagination
  const guidesPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

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

  const updateGuides = (item: any) => {
    setEdit(item);
    setOpen(true);
  };

  const handleDelete = async(id: number)=>{
    console.log(id)
    const data = await deleteGuides(id)
    return data
  }

  return (
    <div className='container'>
      <ModalGuides open={open}  edit={edit} setOpen={setOpen} setEdit={setEdit} />
      <div className='navbarGuides'>
        <Button
          variant="contained"
          onClick={()=>setOpen(true)}
          className="addButton" >
            Add Guides
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
          currentGuides?.map((item:any, index)=>(
            <div key={index} className='parent'>
              <div className="child">
                <span>Title: <i>{item?.title}</i></span> <br />
                <span>Content: <i>{item?.content}</i></span><br />
              </div>
              <div className='buttonDisplay'>
                <button 
                  onClick={() => updateGuides(item)}
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