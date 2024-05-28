import { useEffect, useState, createContext } from "react";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUser(token);
        }
    }, []);

    const fetchUser = async (token) => {
        const tokenParts = token.split('.');
        const payload = JSON.parse(atob(tokenParts[1]));
        const userId = payload.id;

        try {
            const response = await fetch(`http://localhost:3000/user/${userId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                setIsAuthenticated(true);
            } else {
                logout();
            }
        } catch (error) {
            logout();
        }
    };

    const login = (token) => {
        localStorage.setItem('token', token);
        fetchUser(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };