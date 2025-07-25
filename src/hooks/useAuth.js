import { useState } from "react";
import { auth } from "@/db/firestore";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import useStore from "@/store/useStore";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const setUser = useStore((state) => state.setUser);

  const Login = async ({ email, password }) => {
    setLoading(true);
    setError(null);

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      setUser(user.user);
    } catch (error) {
      console.error(error);
      setError("Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  const Logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    loading,
    error,
    Login,
    Logout,
  };
};

export default useAuth;
