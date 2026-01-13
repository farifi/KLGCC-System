import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar.jsx";
import Header from "../Components/Header.jsx";
import Table from "../Components/Table.jsx";
import Modal from "../Components/Modal.jsx";
import { useCourse } from "../API Contexts Folder/CourseContext";
import "./Pages CSS files/DefaultTheme.css";
import AddCourseForm from "../Components/Form/AddCourseForm.jsx";
import EditCourseForm from "../Components/Form/EditCourseForm.jsx";

const Course = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const { courseList, fetchCourseList, createCourse, updateCourse, deleteCourse } = useCourse();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    fetchCourseList();
  }, []);

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setIsEditOpen(true);
  };

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    deleteCourse(id);
  };

  const courseColumns = [
    { header: "ID", key: "COURSE_ID" },
    { header: "Name", key: "COURSE_NAME" },
    { header: "Description", key: "DESCRIPTION" },
    { header: "Holes", key: "HOLES" },
    { header: "Difficulty", key: "DIFFICULTY_LEVEL" },
    {
      header: "Actions",
      key: "actions",
      render: (row) => (
        <div className="table-actions">
          <button onClick={() => handleEdit(row)}>✏️</button>
          <button className="delete" onClick={() => handleDelete(row.COURSE_ID)}>🗑</button>
        </div>
      ),
    },
  ];

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
            <button className="add-btn" onClick={() => setIsAddOpen(true)}>+ Add Course</button>
          </div>
          <div className="default-content">
            <Table title="Course List" columns={courseColumns} data={courseList} />
          </div>
        </div>
      </div>

      <Modal isOpen={isEditOpen} title="Edit Course" onClose={() => setIsEditOpen(false)}>
        <EditCourseForm
          course={selectedCourse}
          onCancel={() => setIsEditOpen(false)}
          onSave={(updatedCourse) => {
            updateCourse(updatedCourse);
            setIsEditOpen(false);
          }}
        />
      </Modal>

      <Modal isOpen={isAddOpen} title="Add Course" onClose={() => setIsAddOpen(false)}>
        <AddCourseForm
          onCancel={() => setIsAddOpen(false)}
          onCreate={(newCourse) => {
            createCourse(newCourse);
            setIsAddOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default Course;
