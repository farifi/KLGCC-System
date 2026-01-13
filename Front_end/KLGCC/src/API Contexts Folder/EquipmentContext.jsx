import { createContext, useContext, useState } from "react";
import API from "../Api.jsx";

const EquipmentContext = createContext();

export const EquipmentProvider = ({ children }) => {
  const [equipmentList, setEquipmentList] = useState([]);

  // Fetch all equipment (with booking + customer info)
  const fetchEquipmentList = async () => {
    try {
      const res = await API.get("/api/equipment");
      setEquipmentList(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Couldn't retrieve equipment list");
    }
  };

  // Create equipment
  const createEquipment = async (equipment) => {
    try {
      const res = await API.post("/api/equipment/createEquipment", equipment);
      setEquipmentList(prev => [...prev, res.data.equipment]);
    } catch (err) {
      alert("Failed to create equipment");
    }
  };

  // Delete equipment
  const deleteEquipment = async (equipment_id) => {
    try {
      await API.delete(`/api/equipment/${equipment_id}`);
      setEquipmentList(prev =>
        prev.filter(e => e.EQUIPMENT_ID !== equipment_id)
      );
    } catch (err) {
      alert("Failed to delete equipment");
    }
  };

  // Update equipment
  const updateEquipment = async (equipment) => {
    try {
      await API.put(`/api/equipment/${equipment.EQUIPMENT_ID}`, equipment);
      setEquipmentList(prev =>
        prev.map(e =>
          e.EQUIPMENT_ID === equipment.EQUIPMENT_ID ? equipment : e
        )
      );
    } catch (err) {
      alert("Failed to update equipment");
    }
  };

  return (
    <EquipmentContext.Provider
      value={{
        equipmentList,
        fetchEquipmentList,
        createEquipment,
        deleteEquipment,
        updateEquipment
      }}
    >
      {children}
    </EquipmentContext.Provider>
  );
};

export const useEquipment = () => {
  return useContext(EquipmentContext);
};
