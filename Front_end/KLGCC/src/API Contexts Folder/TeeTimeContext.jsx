import { createContext, useContext, useState } from "react";
import API from "../Api.jsx";

const TeeTimeContext = createContext();

export const TeeTimeProvider = ({ children }) => {
  const [teeTimeList, setTeeTimeList] = useState([]);
  const [courseList, setCourseList] = useState([]);

  // === Fetch Tee Times for frontend table (with course name) ===
  const fetchTeeTimeList = async () => {
    try {
      const res = await API.get("/api/teetime/listWithCourse");
      setTeeTimeList(res.data.teeTimes || []);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Couldn't fetch Tee Times");
    }
  };

  // === Fetch Courses for dropdowns ===
  const fetchCourseList = async () => {
    try {
      const res = await API.get("/api/course/list");
      setCourseList(res.data.courses || []);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Couldn't fetch Courses");
    }
  };

  // === CRUD ===

  const createTeeTime = async (teeTime) => {
    try {
      await API.post("/api/teetime", teeTime);
      fetchTeeTimeList(); // refresh list
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Couldn't create Tee Time");
    }
  };

  const updateTeeTime = async (teeTime) => {
    try {
      await API.put(`/api/teetime/${teeTime.TEE_TIME_ID}`, teeTime);
      fetchTeeTimeList();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Couldn't update Tee Time");
    }
  };

  const deleteTeeTime = async (id) => {
    try {
      await API.delete(`/api/teetime/${id}`);
      setTeeTimeList(prev => prev.filter(t => t.TEE_TIME_ID !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Couldn't delete Tee Time");
    }
  };

  return (
    <TeeTimeContext.Provider
      value={{
        teeTimeList,
        courseList,
        fetchTeeTimeList,
        fetchCourseList,
        createTeeTime,
        updateTeeTime,
        deleteTeeTime
      }}
    >
      {children}
    </TeeTimeContext.Provider>
  );
};

export const useTeeTime = () => useContext(TeeTimeContext);
