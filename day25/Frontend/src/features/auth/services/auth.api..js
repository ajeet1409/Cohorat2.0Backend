import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

//* register

export const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//* login

export async function login(userData) {
  try {
    const response = await api.post("/auth/login", userData);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMe() {
  const response = await api.get("/auth/get-me");
  return response.data;
}


//lgout
export async function logout() {
   const response= await api.get("/auth/logout");
   return response.data
}

