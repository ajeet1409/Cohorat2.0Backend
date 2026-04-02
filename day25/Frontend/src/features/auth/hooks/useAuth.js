import { AuthContext } from "../auth.context";
import { useContext, useEffect } from "react";

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

  async function handleGetMe() {
    try {
      setLoading(true);
      const data = await getMe();
      setUser(data.user);
      console.log(data.user);
    } catch (error) {
      console.log("token is invalid and expires", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

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

  useEffect(() => {
    handleGetMe();
  }, []);

  // ek object return karna hota hai
  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleGetMe,
    handleLogout,
  };
};
