import { useState, useEffect } from "react";
import { useStaff } from "../StaffContext.jsx";

import Sidebar from "../Components/Sidebar.jsx";
import Header from "../Components/Header.jsx";
import Table from "../Components/Table.jsx";
import Modal from "../Components/Modal.jsx";
import EditStaffForm from "../Components/Form/EditStaffForm.jsx";



import "./Pages CSS files/DefaultTheme.css";

const Staff = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);
    
    const { staffList, fetchStaffList, updateStaff, deleteStaff } = useStaff();

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);

    useEffect(() => {
        fetchStaffList();
    }, []);

    const staffColumns = [
        { header: "ID", key: "STAFF_ID" },
        { header: "Name", key: "FULL_NAME" },
        { header: "Email", key: "EMAIL" },
        { header: "Phone No", key: "PHONE" },
        { 
            header: "Actions",
            key: "actions",
            render: (row) => (
                <div className="table-actions">
                    <button onClick={() => handleEdit(row)}>✏️</button>
                    <button onClick={() => handleDelete(row.STAFF_ID)}>🗑</button>
                </div>
            )
        }
    ];

    const handleEdit = (staff) => {
        setSelectedStaff(staff);
        setIsEditOpen(true);
    }

    const handleDelete = (id) => {
        if (!confirm("Are you sure you want to delete this staff?")) return;
        deleteStaff(id);
    }

    return (
        <div className="default-page">
            <div className="default">
                <div className={`sidebar-overlay ${isSidebarOpen ? "open" : ""}`} onClick={closeSidebar}></div>
                <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
                    <Sidebar closeSidebar={closeSidebar} />
                </div>
                <div className="default-main">
                    <Header toggleSidebar={toggleSidebar} />
                    <div className="default-content">
                        <h2>Employees List</h2>
                        <Table title="STAFF" columns={staffColumns} data={staffList}/>
                        
                    </div>
                </div>
                
            </div>
            <Modal isOpen={isEditOpen} title="Edit Staff" onClose={() => setIsEditOpen(false)}>
                <EditStaffForm
                    staff={selectedStaff}
                    onCancel={() => setIsEditOpen(false)}
                    onSave={(updatedStaff) => {
                    updateStaff(updatedStaff); // update the context state
                    setIsEditOpen(false);
                }}/>
            </Modal>
        </div>
    );
};

export default Staff;