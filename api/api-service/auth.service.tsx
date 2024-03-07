import { $api } from "../interceptors";
import { saveCookies } from "./Cookie/cookie";

export const Login = async (data:any)=>{
    try{
      const response = await $api.post("/users/login", data)
      saveCookies(response?.data?.tokens?.access_token)
      return response?.data
    }catch(error){
        console.log(error);
    }
}