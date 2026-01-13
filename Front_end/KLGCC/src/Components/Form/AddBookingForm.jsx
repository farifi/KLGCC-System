import { useState } from "react";
import "../Components CSS files/AddBookingForm.css";

const AddBookingForm = ({ customerList = [], teeTimeList = [], onCancel, onCreate }) => {
  const [formData, setFormData] = useState({
    CUSTOMER_ID: "",
    CUSTOMER_NAME: "",
    TEE_TIME_ID: "",
    BOOKING_DATE: "",
    STATUS: "PENDING",
    TOTAL_PRICE: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // When selecting a customer, update CUSTOMER_NAME automatically
    if (name === "CUSTOMER_ID") {
      const customer = customerList.find(c => c.CUSTOMER_ID === Number(value));
      setFormData(prev => ({
        ...prev,
        CUSTOMER_ID: value,
        CUSTOMER_NAME: customer ? customer.FULL_NAME : ""
      }));
    } 
    // When selecting a tee time, you can add logic if needed
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({
      ...formData,
      CUSTOMER_ID: formData.CUSTOMER_ID || null,
      TEE_TIME_ID: formData.TEE_TIME_ID || null
    });
  };

  return (
    <form className="edit-staff-form" onSubmit={handleSubmit}>
      {/* Customer */}
      <label>
        Customer
        <select
          name="CUSTOMER_ID"
          value={formData.CUSTOMER_ID}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Customer --</option>
          {customerList.map(c => (
            <option key={c.CUSTOMER_ID} value={c.CUSTOMER_ID}>
              {c.FULL_NAME}
            </option>
          ))}
        </select>
      </label>

      {/* Customer Name (read-only) */}
      <label>
        Customer Name
        <input
          name="CUSTOMER_NAME"
          value={formData.CUSTOMER_NAME}
          readOnly
        />
      </label>

      {/* Tee Time */}
      <label>
        Tee Time
        <select
          name="TEE_TIME_ID"
          value={formData.TEE_TIME_ID}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Tee Time --</option>
          {teeTimeList.map(t => (
            <option key={t.TEE_TIME_ID} value={t.TEE_TIME_ID}>
              {t.COURSE_NAME} | {new Date(t.START_TIME).toLocaleTimeString()} - {new Date(t.END_TIME).toLocaleTimeString()}
            </option>
          ))}
        </select>
      </label>

      {/* Booking Date */}
      <label>
        Booking Date
        <input
          type="date"
          name="BOOKING_DATE"
          value={formData.BOOKING_DATE}
          onChange={handleChange}
          required
        />
      </label>

      {/* Status */}
      <label>
        Status
        <select
          name="STATUS"
          value={formData.STATUS}
          onChange={handleChange}
          required
        >
          <option value="PENDING">PENDING</option>
          <option value="CONFIRMED">CONFIRMED</option>
        </select>
      </label>

      {/* Total Price */}
      <label>
        Total Price
        <input
          type="number"
          name="TOTAL_PRICE"
          value={formData.TOTAL_PRICE}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />
      </label>

      <div className="modal-actions">
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="submit">Add Booking</button>
      </div>
    </form>
  );
};

export default AddBookingForm;
