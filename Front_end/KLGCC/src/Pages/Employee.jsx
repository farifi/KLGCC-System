import { useState } from "react";
import Sidebar from "../Components/Sidebar.jsx";
import Header from "../Components/Header.jsx";
import EmployeeTable from "../Components/EmployeeTable.jsx";

const employees = [
  { id: "OM124894", name: "Judy Abbott", role: "Manager", performance: 70 },
  { id: "OM124875", name: "Martin Feeney", role: "Specialist", performance: 55 },
  { id: "OM124873", name: "Ellen Streich", role: "Supervisor", performance: 80 },
];

const Employee = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

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
                        <EmployeeTable employees={employees}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Employee;