import { useState, useEffect } from "react";
import { useEquipment } from "../API Contexts Folder/EquipmentContext";

import Sidebar from "../Components/Sidebar.jsx";
import Header from "../Components/Header.jsx";
import Table from "../Components/Table.jsx";
import Modal from "../Components/Modal.jsx";

import EditEquipmentForm from "../Components/Form/EditEquipmentForm.jsx";
import AddEquipmentForm from "../Components/Form/AddEquipmentForm.jsx";

import "./Pages CSS files/DefaultTheme.css";

const Equipment = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const {
    equipmentList,
    fetchEquipmentList,
    updateEquipment,
    deleteEquipment,
    createEquipment
  } = useEquipment();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    fetchEquipmentList();
  }, []);

  const equipmentColumns = [
    { header: "ID", key: "EQUIPMENT_ID" },
    { header: "Type", key: "EQUIPMENT_TYPE" },
    { header: "Fee (RM)", key: "FEE" },
    { header: "Booking ID", key: "BOOKING_ID" },
    { header: "Customer", key: "CUSTOMER_NAME" },
    {
      header: "Actions",
      key: "actions",
      render: (row) => (
        <div className="table-actions">
          <button onClick={() => handleEdit(row)}>✏️</button>
          <button
            className="delete"
            onClick={() => handleDelete(row.EQUIPMENT_ID)}
          >
            🗑
          </button>
        </div>
      )
    }
  ];

  const handleEdit = (equipment) => {
    setSelectedEquipment(equipment);
    setIsEditOpen(true);
  };

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this equipment?")) return;
    deleteEquipment(id);
  };

  return (
    <div className="default-page">
      <div className="default">
        <div
          className={`sidebar-overlay ${isSidebarOpen ? "open" : ""}`}
          onClick={closeSidebar}
        ></div>

        <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
          <Sidebar closeSidebar={closeSidebar} />
        </div>

        <div className="default-main">
          <Header toggleSidebar={toggleSidebar} />

          <div className="table-header">
            <button className="add-btn" onClick={() => setIsAddOpen(true)}>
              + Add Equipment
            </button>
          </div>

          <div className="default-content">
            <Table
              title="Equipment List"
              columns={equipmentColumns}
              data={equipmentList}
            />
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditOpen}
        title="Edit Equipment"
        onClose={() => setIsEditOpen(false)}
      >
        <EditEquipmentForm
          equipment={selectedEquipment}
          onCancel={() => setIsEditOpen(false)}
          onSave={(updatedEquipment) => {
            updateEquipment(updatedEquipment);
            setIsEditOpen(false);
          }}
        />
      </Modal>

      {/* Add Modal */}
      <Modal
        isOpen={isAddOpen}
        title="Add Equipment"
        onClose={() => setIsAddOpen(false)}
      >
        <AddEquipmentForm
          onCancel={() => setIsAddOpen(false)}
          onCreate={(newEquipment) => {
            createEquipment(newEquipment);
            setIsAddOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default Equipment;
