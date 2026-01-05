import { createContext, useContext, useState } from "react";
import API from "./Api.jsx";

const StaffContext = createContext();

export const StaffProvider = ({ children }) => {
    const [staffList, setStaffList] = useState([]);

    const fetchStaffList = async () => {
        try {
            const res = await API.get("/api/staff/staffList");
            setStaffList(res.data.staffs);
        } catch (err) {
            alert(err.response?.data?.message || "Couldn't retrieve");
        }
    };

    return (
        <StaffContext.Provider value={{ staffList, fetchStaffList }}>
            {children}
        </StaffContext.Provider>
    );
};

export const useStaff = () => {
    return useContext(StaffContext);
};
