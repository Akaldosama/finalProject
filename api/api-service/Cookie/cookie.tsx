import Cookies from "js-cookie"

export const saveCookies = async (token:string)=>{
    console.log(token)
    const data = await Cookies.set("token",token)
}
export const getCookies = async (token:string)=>{
    Cookies.get("token")
}