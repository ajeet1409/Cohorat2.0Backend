import { AuthContext } from "../auth.context";
import { useContext } from "react";

import { register, login, getMe, logout } from "../services/auth.api.";

export const useAuth = () => {
  const { setLoading, user, setUser, loading } = useContext(AuthContext);

  const handleRegister = async (userData) => {
    try {
      setLoading(true);
      const res = await register(userData);
      setUser(res.user);
      //   return res;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (userData) => {
    try {
      setLoading(true);
      const res = await login(userData);
      console.log(res);
      setUser(res.user);
      // return res;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  async function handleLogout() {
    try {
      setLoading(true);
      const data = await logout();
      setUser(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // ek object return karna hota hai
  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleLogout,
  };
};
