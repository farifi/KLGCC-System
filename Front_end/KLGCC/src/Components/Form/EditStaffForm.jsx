import { useState, useEffect } from "react";
import "../Components CSS files/EditStaffForm.css";

const EditStaffForm = ({ staff, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    FULL_NAME: "",
    EMAIL: "",
    PHONE: "",
    SUPERVISOR_ID: "",
    SUPERVISOR_NAME: ""
  });

  useEffect(() => {
    if (staff) {
      setFormData({
        FULL_NAME: staff.STAFF_NAME || "",
        EMAIL: staff.EMAIL || "",
        PHONE: staff.PHONE || "",
        SUPERVISOR_ID: staff.SUPERVISOR_ID || "",
        SUPERVISOR_NAME: staff.SUPERVISOR_NAME || ""
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
      <label>
        Supervisor ID
        <input
          name="SUPERVISOR ID"
          value={formData.SUPERVISOR_ID}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Supervisor Name
        <input
          name="SUPERVISOR NAME"
          value={formData.SUPERVISOR_NAME}
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
