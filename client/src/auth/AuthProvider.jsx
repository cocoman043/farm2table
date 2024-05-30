import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [userType, setUserType] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const refreshToken = async (token) => {
    try {
      console.log('refreshing...')

      const response = await fetch("http://localhost:3000/authUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const res = await response.json();
      console.log("hi");

      if (res) {
        console.log("refreshed: ", res)
        // setUserId(res.id);
        // setToken(res.token);
        setUserType(res.userType);
        // localStorage.setItem("token", res.token);
        // localStorage.setItem("userId", res.id);
      } else {
        logOut();
      }
    } catch (err) {
      console.error(err);
      logOut();
    } finally {
      setLoading(false);
    }
  };

  // Check token existence on app start
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      refreshToken(storedToken);
      console.log('done refreshing!')
    } else {
      setLoading(false);
    }
  }, [navigate]);

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
        console.log("Logged in! Navigating...");
        setUserId(res.id);
        setToken(res.token);
        setUserType(res.userType);
        localStorage.setItem("token", res.token);
        localStorage.setItem("userId", res.id);
        // localStorage.setItem("userType", res.userType);
        if (res.userType == "user") {
          navigate("/user/shop");
        } else if (res.userType == "admin") {
          navigate("/admin");
        }

        return;
      }
      throw new Error(res.message || 'Failed to log in.');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to log in.');
    }
  };

  const registerAction = async (name, email, password) => {
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const res = await response.json();

      if (res && res.token) {
        console.log("Registered! Navigating...");
        setUserId(res.id);
        setToken(res.token);
        setUserType(res.userType);
        localStorage.setItem("token", res.token);
        localStorage.setItem("userId", res.id);
        // localStorage.setItem("userType", res.userType);
        navigate("/user/shop");
        return;
      }
      throw new Error(res.message || 'Failed to register.');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to register.');
    }
  };

  const logOut = () => {
    console.log('logging out...')
    setUserId(null);
    setUserType(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return <AuthContext.Provider value={{ token, userId, userType, loginAction, registerAction, logOut, error, setError, loading }}>{children}</AuthContext.Provider>;
};

export {
  AuthProvider
};

export const useAuth = () => {
  return useContext(AuthContext);
};

