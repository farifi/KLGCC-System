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

    const deleteStaff = async (staff_id) => {
        try {
            const res = await API.delete(`/api/staff/deleteStaff/${staff_id}`);
            setStaffList( prev => prev.filter(
                staff => staff.STAFF_ID !== staff_id 
            ));
            res.data.message;
        } catch (err) {
            alert("Failed to delete staff");
        }
    } 

    return (
        <StaffContext.Provider value={{ staffList, fetchStaffList , deleteStaff}}>
            {children}
        </StaffContext.Provider>
    );
};

export const useStaff = () => {
    return useContext(StaffContext);
};
