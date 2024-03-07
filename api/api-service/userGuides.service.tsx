import { $api } from "../interceptors";

export const getUserGuides = async () => {
    try {
      const response = await $api.get(
        "/user-guides?page%5Boffset%5D=1&page%5Blimit%5D=10&completed=true&user_id=1"
        )
        return response;
    } catch (error) {
      console.log(error);
    }
  };