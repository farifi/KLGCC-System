import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar.jsx";
import Header from "../Components/Header.jsx";
import Table from "../Components/Table.jsx";
import Modal from "../Components/Modal.jsx";
import EditTeeTimeForm from "../Components/Form/EditTeeTimeForm.jsx";
import AddTeeTimeForm from "../Components/Form/AddTeeTimeForm.jsx";
import { useTeeTime } from "../API Contexts Folder/TeeTimeContext.jsx";
import "./Pages CSS files/DefaultTheme.css";

const TeeTime = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const { teeTimeList, courseList, fetchTeeTimeList, fetchCourseList, updateTeeTime, deleteTeeTime, createTeeTime } = useTeeTime();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTeeTime, setSelectedTeeTime] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    fetchTeeTimeList();
    fetchCourseList();
  }, []);

  // Table columns
  const teeTimeColumns = [
    { header: "ID", key: "TEE_TIME_ID" },
    { header: "Course Name", key: "COURSE_NAME" },
    { header: "Start Time", key: "START_TIME" },
    { header: "End Time", key: "END_TIME" },
    { header: "Available Slots", key: "AVAILABLE_SLOTS" },
    {
      header: "Actions",
      key: "actions",
      render: (row) => (
        <div className="table-actions">
          <button onClick={() => handleEdit(row)}>✏️</button>
          <button className="delete" onClick={() => handleDelete(row.TEE_TIME_ID)}>🗑</button>
        </div>
      )
    }
  ];

  const handleEdit = (teeTime) => {
    setSelectedTeeTime(teeTime);
    setIsEditOpen(true);
  };

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this tee time?")) return;
    deleteTeeTime(id);
  };

  return (
    <div className="default-page">
      <div className="default">
        <div className={`sidebar-overlay ${isSidebarOpen ? "open" : ""}`} onClick={closeSidebar}></div>
        <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
          <Sidebar closeSidebar={closeSidebar} />
        </div>

        <div className="default-main">
          <Header toggleSidebar={toggleSidebar} />
          
          <div className="table-header">
            <button className="add-btn" onClick={() => setIsAddOpen(true)}>+ Add Tee Time</button>
          </div>

          <div className="default-content">
            <Table title="Tee Time List" columns={teeTimeColumns} data={teeTimeList} />
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} title="Edit Tee Time" onClose={() => setIsEditOpen(false)}>
        <EditTeeTimeForm
          teeTime={selectedTeeTime}
          courseList={courseList}
          onCancel={() => setIsEditOpen(false)}
          onSave={(updatedTeeTime) => {
            updateTeeTime(updatedTeeTime);
            setIsEditOpen(false);
          }}
        />
      </Modal>

      {/* Add Modal */}
      <Modal isOpen={isAddOpen} title="Add Tee Time" onClose={() => setIsAddOpen(false)}>
        <AddTeeTimeForm
          courseList={courseList}
          onCancel={() => setIsAddOpen(false)}
          onCreate={(newTeeTime) => {
            createTeeTime(newTeeTime);
            setIsAddOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default TeeTime;
