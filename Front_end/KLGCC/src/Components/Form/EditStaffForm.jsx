import { useState, useEffect } from "react";

const EditStaffForm = ({}) => {
    const [formData, setFormData] = useState({
        FULL_NAME: "",
        EMAIL: "",
        PHONE: ""
    });

    if (!staff) return null; // prevent rendering when staff is null

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
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!staff) return;
        onSave({ ...staff, ...formData});
    };

    if (!staff) return null; 

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name
                <input name="FULL_NAME" value={formData.FULL_NAME} onChange={handleChange} required />
            </label>
            <label>
                Phone
                <input name="FULL_NAME" value={formData.PHONE} onChange={handleChange} required />
            </label>

            <div className="modal-actions">
                <button type="button" onClick={onCancel}>Cancel</button>
                <button type="submit">Save</button>
            </div>
        </form>
    );
};

export default EditStaffForm;