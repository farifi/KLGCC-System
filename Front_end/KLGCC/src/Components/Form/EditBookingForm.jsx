import { useState, useEffect } from "react";
import "../Components CSS files/EditBookingForm.css";

const EditBookingForm = ({ booking, customerList = [], teeTimeList = [], onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    CUSTOMER_ID: "",
    CUSTOMER_NAME: "",
    TEE_TIME_ID: "",
    BOOKING_DATE: "",
    STATUS: "",
    TOTAL_PRICE: ""
  });

  useEffect(() => {
    if (booking) {
      setFormData({
        CUSTOMER_ID: booking.CUSTOMER_ID || "",
        CUSTOMER_NAME: booking.CUSTOMER_NAME || "",
        TEE_TIME_ID: booking.TEE_TIME_ID || "",
        BOOKING_DATE: booking.BOOKING_DATE ? booking.BOOKING_DATE.split("T")[0] : "",
        STATUS: booking.STATUS || "PENDING",
        TOTAL_PRICE: booking.TOTAL_PRICE || ""
      });
    }
  }, [booking]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "CUSTOMER_ID") {
      const customer = customerList.find(c => c.CUSTOMER_ID === Number(value));
      setFormData(prev => ({
        ...prev,
        CUSTOMER_ID: value,
        CUSTOMER_NAME: customer ? customer.FULL_NAME : ""
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...booking,
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

      {/* Customer Name */}
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
        <button type="submit">Save Booking</button>
      </div>
    </form>
  );
};

export default EditBookingForm;
