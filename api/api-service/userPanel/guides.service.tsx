import { $api } from "@/api/interceptors";
// import { IUserGuides } from "@/api/types/userPanel/guides.types";

export const getGuides = async () => {
  try {
    const response = await $api.get(
      "/guides?page%5Boffset%5D=1&page%5Blimit%5D=&sort%5Bby%5D=id&sort%5Border%5D=asc"
    )
    return response;
  } catch (error) {
    console.log(error);
  }
}


export const addGuides = async (id: number) => {
  try {
    const response = await $api.post(`/user-guides/${id}/read`);
    if(response?.status === 201){
      window.location.reload()
    }
  } catch (error) {
    console.log(error);
  }
};