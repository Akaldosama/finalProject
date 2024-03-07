import { $api } from "@/api/interceptors";
import { IGuides } from "../types/guides.types";

// add-guides

export const addGuides = async (payload: IGuides) => {
  try {
    const response = await $api.post("/guides", payload);
    if(response?.status === 201){
      window.location.reload()
    }
  } catch (error) {
    console.log(error);
  }

};

// get-guides

export const getGuides = async () => {
  try {
    const response = await $api.get(
      "/guides?page%5Boffset%5D=1&page%5Blimit%5D=&sort%5Bby%5D=id&sort%5Border%5D=asc"
      )
      return response;
  } catch (error) {
    console.log(error);
  }
};

// delete-guides

export const deleteGuides = async (id: number) => {
  try {
    const response = await $api.delete(`/guides/${id}`);
    if (response?.status === 200) {
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
};


// update - guides

export const updateGuides = async (data: IGuides) => {
  try {
    const response = await $api.patch(`/guides/${data?._id}`, data);
    if(response?.status === 200){
      window.location.reload()
    }
    return response
  } catch (error) {
    console.log(error);
  }
};

