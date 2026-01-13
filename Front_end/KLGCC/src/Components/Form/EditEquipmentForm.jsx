import { useState, useEffect } from "react";
import "../Components CSS files/EditStaffForm.css";

const EditEquipmentForm = ({ equipment, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    EQUIPMENT_TYPE: "",
    FEE: "",
    BOOKING_ID: ""
  });

  useEffect(() => {
    if (equipment) {
      setFormData({
        EQUIPMENT_TYPE: equipment.EQUIPMENT_TYPE || "",
        FEE: equipment.FEE || "",
        BOOKING_ID: equipment.BOOKING_ID || ""
      });
    }
  }, [equipment]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...equipment, ...formData });
  };

  return (
    <form className="edit-staff-form" onSubmit={handleSubmit}>
      <label>
        Equipment Type
        <input name="EQUIPMENT_TYPE" value={formData.EQUIPMENT_TYPE} onChange={handleChange} />
      </label>

      <label>
        Fee
        <input type="number" name="FEE" value={formData.FEE} onChange={handleChange} />
      </label>

      <label>
        Booking ID
        <input name="BOOKING_ID" value={formData.BOOKING_ID} onChange={handleChange} />
      </label>

      <div className="modal-actions">
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};
export default EditEquipmentForm;