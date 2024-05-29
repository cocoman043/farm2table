import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [userType, setUserType] = useState(localStorage.getItem("userType") || null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const loginAction = async (email, password) => {
    try {
      console.log('mema lang')
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const res = await response.json();
      console.log(res);

      if (res) {
        setUserId(res.id);
        setToken(res.token);
        setUserType(res.userType);
        localStorage.setItem("token", res.token);
        localStorage.setItem("userId", res.id);
        localStorage.setItem("userType", res.userType);
        navigate("/user/shop");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUserId(null);
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return <AuthContext.Provider value={{ token, userId, userType, loginAction, logOut }}>{children}</AuthContext.Provider>;
};

export {
  AuthProvider
};

export const useAuth = () => {
  return useContext(AuthContext);
};

