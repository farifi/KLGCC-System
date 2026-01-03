import {createContext, useContext, useState } from "react";
import API from "./Api.jsx";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const register = async (username, email, password) => {
        try {
            const res = await axios.post('http://localhost:5000/register', { username, email, password });
            alert(res.data.message);
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    const login = async (email, password) => {
        try{
            const res = await axios.post("http://localhost:5000/login", {email, password})
            
            if (res.data.username) {
                const userData  = { username: res.data.username, email: res.data.email,};

            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));  
            
            return true
            } else {
                alert("Invalid Password or username or You don't have an account yet. Sign up an account!");
            }
        } catch  (err) {
            alert("Invalid Password or username or You don't have an account yet. Sign up an account!");
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        console.log("Logged out successfully!");
        alert("Logged out successfully!")
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);