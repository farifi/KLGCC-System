import {createContext, useContext, useState } from "react";
import API from "./Api.jsx";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const register = async (full_name, email, phone_number, password) => {
        try {
            const res = await API.post('/api/auth/signup', { full_name, email, phone_number, password });
            alert(res.data.message || "Registered successfully");
            console.log(res.data);
            return res;
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
            return err.response?.data?.message;
        }
    };

    const login = async (email, password) => {
        try{
            const res = await API.post("/api/auth/login", { email, password });
            const userData  = { email: res.data.email, customerId: res.data.customerId };
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));  
            return res;
        } catch  (err) {
            alert(err.response?.data?.message || "Invalid email or password");
            return err.response?.data?.message;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        console.log("Logged out successfully!");
        alert("Logged out successfully!");
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
