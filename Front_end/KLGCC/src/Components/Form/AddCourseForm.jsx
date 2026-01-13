import { useState } from "react";
import "../Components CSS files/AddStaffForm.css";

const AddCourseForm = ({ onCancel, onCreate }) => {
  const [formData, setFormData] = useState({
    COURSE_NAME: "",
    DESCRIPTION: "",
    HOLES: "",
    DIFFICULTY_LEVEL: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
  };

  return (
    <form className="edit-staff-form" onSubmit={handleSubmit}>
      <label>Name<input name="COURSE_NAME" value={formData.COURSE_NAME} onChange={handleChange} required /></label>
      <label>Description<input name="DESCRIPTION" value={formData.DESCRIPTION} onChange={handleChange} /></label>
      <label>Holes<input type="number" name="HOLES" value={formData.HOLES} onChange={handleChange} required /></label>
      <label>Difficulty<input name="DIFFICULTY_LEVEL" value={formData.DIFFICULTY_LEVEL} onChange={handleChange} /></label>
      <div className="modal-actions">
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default AddCourseForm;
