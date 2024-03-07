import { $api } from "@/api/interceptors";
import { IUserMe } from "@/api/types/userPanel/userme.types";

export const getUserme = async () => {
    try{
        const response = await $api.get('/users/me')
        return response
    }catch(error){
        console.log(error)
    }
}

export const updateUserme = async (payload : IUserMe)=>{
    try{
        const response = await $api.patch('/users/me', payload)
        return response
    }catch(error){
        console.log(error)
    }
}