import {createContext, useContext, useState } from "react";
import API from "./Api.jsx";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const register = async (username, email, password) => {
        try {
            const res = await API.post('/api/auth/signup', { username, email, password });
            alert(res.data.message || "Registered successfully");
            return true;
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
            return false;
        }
    };

    const login = async (email, password) => {
        try{
            const res = await API.post("/api/auth/login", { email, password });
            const userData  = { email: res.data.email, customerId: res.data.customerId };
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));  
            return true;
        } catch  (err) {
            alert(err.response?.data?.message || "Invalid email or password");
            return false;
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
