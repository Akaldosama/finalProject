"use client";
import  React, { ChangeEvent, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { addGuides, updateGuides } from "@/api/api-service/guides.service";
import { IGuides } from "@/api/types/guides.types";

const ModalGuides = ({open, edit, setOpen, setEdit}: { open: boolean; edit: any, setOpen: any,setEdit:any}) => {
 
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const toggle = ()=>{
    setOpen(false)
    setEdit('')
  }

const handleModal = async (formData: FormData) => {
  let title = formData.get("title") as string;
  let content = formData.get("content") as string;
  let payload: IGuides ={
    title: title ? title : edit?.title,
    content: content ? content : edit?.content,
    notify: true,
  }

  if(edit !== ""){
      const response = await updateGuides({...payload, _id: edit?._id})
      return response
  }else{  
      const response = await addGuides({...payload})
      return response
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={toggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h1 className="text-[black]">Add Guides</h1>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="flex items-center gap-[50px]">
              <div className="flex flex-col">
                <form
                  action={handleModal}
                  className="flex flex-col w-[620px] gap-[10px]">
                  <TextField
                    defaultValue={edit?.title}
                    id="outlined-basic"
                    name="title"
                    label="Title"
                    variant="outlined" />
                  <TextField
                    defaultValue={edit?.content}
                    id="outlined-basic"
                    name="content"
                    label="Content"
                    variant="outlined" />
                  <button className="text-[black] border-y-2 w-[100px] m-auto">Add</button>
                </form>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalGuides;
