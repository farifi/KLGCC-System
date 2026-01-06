import { useState, useEffect } from "react";
import "../Components CSS files/EditStaffForm.css";

const EditStaffForm = ({ staff, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    FULL_NAME: "",
    EMAIL: "",
    PHONE: ""
  });

  useEffect(() => {
    if (staff) {
      setFormData({
        FULL_NAME: staff.FULL_NAME || "",
        EMAIL: staff.EMAIL || "",
        PHONE: staff.PHONE || ""
      });
    }
  }, [staff]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!staff) return;
    onSave({ ...staff, ...formData });
  };

  return (
    <form className="edit-staff-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input
          name="FULL_NAME"
          value={formData.FULL_NAME}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Email
        <input
          name="EMAIL"
          value={formData.EMAIL}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Phone
        <input
          name="PHONE"
          value={formData.PHONE}
          onChange={handleChange}
          required
        />
      </label>

      <div className="modal-actions">
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default EditStaffForm;
