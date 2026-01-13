import { createContext, useContext, useState } from "react";
import API from "../Api.jsx";
import { useAuth } from "./AuthContext";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [customerList, setCustomerList] = useState([]);
  const [teeTimeList, setTeeTimeList] = useState([]);

  const { user } = useAuth();
  // Fetch customers
  const fetchCustomerList = async () => {

    if (!user) return;
    try {
      const res = await API.get("/api/customer/list");
      setCustomerList(res.data.customers || []);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Couldn't fetch customer list");
    }
  };

  // Fetch tee times
  const fetchTeeTimeList = async () => {
    if (!user) return;
    try {
      const res = await API.get("/api/teetime/list");
      setTeeTimeList(res.data.teeTimes || []);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Couldn't fetch tee time list");
    }
  };

  // Bookings CRUD
  const createBooking = async (booking) => {
    try {
      await API.post("/api/booking/addBooking", booking);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Couldn't create booking");
    }
  };

  const updateBooking = async (booking) => {
    try {
      await API.put(`/api/booking/${booking.BOOKING_ID}/bookingUpdate`, booking);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Couldn't update booking");
    }
  };

  const deleteBooking = async (id) => {
    try {
      await API.delete(`/api/booking/${id}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Couldn't delete booking");
    }
  };

  const confirmBooking = async (id) => {
    try {
      await API.put(`/api/booking/${id}/confirmBooking`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Couldn't confirm booking");
    }
  };

  const cancelBooking = async (id) => {
    try {
      await API.put(`/api/booking/${id}/cancelBooking`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Couldn't cancel booking");
    }
  };

  return (
    <BookingContext.Provider
      value={{
        customerList,
        teeTimeList,
        fetchCustomerList,
        fetchTeeTimeList,
        createBooking,
        updateBooking,
        deleteBooking,
        confirmBooking,
        cancelBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
