import axios from "axios";

const api = axios.create({
  baseURL: "https://cohorat2-0backend.onrender.com/api/songs",
  withCredentials: true,
});

export const getSong = async ({ mood }) => {
  try {
    const response = await api.get(`/?mood=${mood}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
