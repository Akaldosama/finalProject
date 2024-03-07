"use client";
import  React, { ChangeEvent, useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import { $api } from "@/api/interceptors";
import { IUser } from "@/api/types/user.types";
import { addUser, updateUser, } from "@/api/api-service/user.service";
import './Modal.css'

const UsersModal = ({open, edit, setOpen, setEdit}: { open: boolean; edit: any, setOpen: any,setEdit:any}) => {
  const [file, setFile] = useState(""); 
 
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

const handleFileChange =async(e:ChangeEvent<HTMLInputElement>)=>{
  e.preventDefault()
    const file: File | null = e.target.files && e.target.files[0]
    const form = new FormData()
    form.append('file', file as Blob)
    const response = await $api.post('/upload', form)
    console.log(response?.data?.path)
    setFile(response?.data?.path)
 }
 



const handleModal = async (formData: FormData) => {
  let first_name = formData.get("first_name") as string;
  let last_name = formData.get("last_name") as string;
  let avatar = file ? file : "/noavatar.jpg"
  let age = Number(formData.get("age"));
  let role = formData.get("role") as string
  let username = formData.get("username") as string;
  let password = formData.get("password") as string;
  let description = formData.get("description") as string;
  let payload: IUser ={
    avatar: file ? file : edit?.avatar,
    first_name: first_name ? first_name : edit?.first_name,
    age: age ? age : edit?.age,
    last_name: last_name ? last_name : edit?.last_name,
    role: role ? role : edit?.role,
    username: username ? username : edit?.username,
    password: password ? password : edit?.password,
    description: description ? description : edit?.description
  }

  if(edit !== ""){
      const response = await updateUser({...payload, _id: edit._id})
      return response
  }else{  
      const response = await addUser({...payload})
      return response
    }
  };
  
  return (
    <div className="flex">
      <Modal
        open={open}
        onClose={toggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" className="modalUser">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h1>Add user</h1>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="flex items-cent\r gap-[50px]">
              <div className="flex flex-col items-center relative">
                <Image
                  src={ `http://localhost:8080/${edit?.avatar}` || "/noavatar.jpg"}
                  width={270}
                  height={270}
                  alt="image" />
                <input type="file" onChange={handleFileChange} className="w-[100%] h-[100%] absolute opacity-0 top-0" />
              </div>
              <div className="flex flex-col">
                <form
                  action={handleModal}
                  className="flex flex-col w-[300px] gap-[10px]">
                  {" "}
                  <TextField defaultValue={edit?.first_name} id="outlined-basic" name="first_name"label="Firstname" variant="outlined" />
                  <TextField defaultValue={edit?.last_name}  id="outlined-basic" name="last_name" label="Lastname" variant="outlined" />
                  <input defaultValue={edit?.age} type="number" className="border-[#a7a5a5] border-[1px] p-[13px] rounded-sm outline-none"  name="age"  placeholder="Age" />
                  <select defaultValue={edit?.role} name="role" className="border-[#a7a5a5] border-[1px] p-[13px] rounded-sm outline-none" >
                    {/* {" "} */}
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                    {/* {" "} */}
                  </select>
                  <TextField defaultValue={edit?.username} id="outlined-basic"  name="username"label="username" variant="outlined"/>
                  <TextField defaultValue={edit?.password} id="outlined-basic"  name="password"label="password" variant="outlined" />
                  <TextField defaultValue={edit?.description} id="outlined-basic"  name="description"label="Description" variant="outlined" />
                  <Button type="submit" variant="contained" className="mt-4 btnSubmitModal">
                    Submit
                  </Button>{" "}
                </form>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default UsersModal;