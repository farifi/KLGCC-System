import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar.jsx";
import Header from "../Components/Header.jsx";
import EmployeeTable from "../Components/EmployeeTable.jsx";
import { useStaff } from "../apiContext.jsx";

const Employee = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);
    const { staffList, fetchStaffList } = useStaff();

    useEffect(() => {
        fetchStaffList();
    }, []);

    return (
        <div className="dashboard-page">
            <div className="dashboard">
                <div className={`sidebar-overlay ${isSidebarOpen ? "open" : ""}`} onClick={closeSidebar}></div>
                <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
                    <Sidebar closeSidebar={closeSidebar} />
                </div>
                <div className="dashboard-main">
                    <Header toggleSidebar={toggleSidebar} />
                    <div className="dashboard-main">
                        <h2>Employees List</h2>
                        <EmployeeTable staffs={staffList}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Employee;