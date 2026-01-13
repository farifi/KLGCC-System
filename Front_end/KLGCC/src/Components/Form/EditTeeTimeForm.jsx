import { useState, useEffect } from "react";
import "../Components CSS files/EditStaffForm.css"; // You can reuse the same styles

const EditTeeTimeForm = ({ teeTime, courseList, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    COURSE_ID: "",
    START_TIME: "",
    END_TIME: "",
    AVAILABLE_SLOTS: ""
  });

  useEffect(() => {
    if (teeTime) {
      setFormData({
        COURSE_ID: teeTime.COURSE_ID || "",
        START_TIME: teeTime.START_TIME ? teeTime.START_TIME.slice(0,16) : "", // format for datetime-local
        END_TIME: teeTime.END_TIME ? teeTime.END_TIME.slice(0,16) : "",
        AVAILABLE_SLOTS: teeTime.AVAILABLE_SLOTS || ""
      });
    }
  }, [teeTime]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!teeTime) return;
    onSave({ ...teeTime, ...formData });
  };

  return (
    <form className="edit-staff-form" onSubmit={handleSubmit}>
      <label>
        Course
        <select name="COURSE_ID" value={formData.COURSE_ID} onChange={handleChange} required>
          <option value="">-- Select Course --</option>
          {courseList.map(c => (
            <option key={c.COURSE_ID} value={c.COURSE_ID}>{c.COURSE_NAME}</option>
          ))}
        </select>
      </label>

      <label>
        Start Time
        <input
          type="datetime-local"
          name="START_TIME"
          value={formData.START_TIME}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        End Time
        <input
          type="datetime-local"
          name="END_TIME"
          value={formData.END_TIME}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Available Slots
        <input
          type="number"
          name="AVAILABLE_SLOTS"
          value={formData.AVAILABLE_SLOTS}
          onChange={handleChange}
          min="1"
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

export default EditTeeTimeForm;
