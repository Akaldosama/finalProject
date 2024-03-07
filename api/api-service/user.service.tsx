import { $api } from "@/api/interceptors";
import { IUser } from "../types/user.types";

// add-user

export const addUser = async (data: IUser) => {
  try {
    const response = $api.post("/users", data);
    console.log(response)
  } catch (error) {
    console.log(error);
  }
  window.location.reload()

};

// get-user

export const getUsers = async () => {
  try {
    const response = await $api.get(
      "/users?q=&page%5Boffset%5D=0&page%5Blimit%5D=&sort%5Bby%5D=id&sort%5Border%5D=desc&filters%5Brole%5D=admin"
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
}

// delete-user

export const DeleteUser = async (id: number) => {
  try {
    const response = await $api.delete(`/users/${id}`);
    if (response?.status === 200) {
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}

// update - user

export const updateUser = async (data: IUser) => {
  try {
    const response = await $api.patch(`/users/${data?._id}`, data);
    if(response?.status === 200){
      window.location.reload()
    }
    return response
  } catch (error) {
    console.log(error);
  }
}