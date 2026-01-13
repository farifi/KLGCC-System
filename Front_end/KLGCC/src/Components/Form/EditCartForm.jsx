import { useState, useEffect } from "react";
import "../Components CSS files/EditStaffForm.css";

const EditCartForm = ({ cart, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    CART_NUMBER: "",
    RENTAL_FEE: "",
    BOOKING_ID: ""
  });

  useEffect(() => {
    if (cart) setFormData({ CART_NUMBER: cart.CART_NUMBER || "", RENTAL_FEE: cart.RENTAL_FEE || "", BOOKING_ID: cart.BOOKING_ID || "" });
  }, [cart]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); if (!cart) return; onSave({ ...cart, ...formData }); };

  return (
    <form className="edit-staff-form" onSubmit={handleSubmit}>
      <label>Cart Number<input name="CART_NUMBER" value={formData.CART_NUMBER} onChange={handleChange} required /></label>
      <label>Rental Fee<input name="RENTAL_FEE" value={formData.RENTAL_FEE} onChange={handleChange} required /></label>
      <label>Booking ID<input name="BOOKING_ID" value={formData.BOOKING_ID} onChange={handleChange} /></label>
      <div className="modal-actions">
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default EditCartForm;
