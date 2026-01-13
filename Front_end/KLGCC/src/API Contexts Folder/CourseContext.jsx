import { createContext, useContext, useState } from "react";
import API from "../Api.jsx";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courseList, setCourseList] = useState([]);

  // Fetch all courses
  const fetchCourseList = async () => {
    try {
      const res = await API.get("/api/course/list"); // backend route
      setCourseList(res.data.courses || []);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Couldn't fetch courses");
    }
  };

  // CRUD
  const createCourse = async (course) => {
    try {
      const res = await API.post("/api/course", course);
      setCourseList(prev => [...prev, res.data.course]);
    } catch (err) {
      console.error(err);
      alert("Failed to create course");
    }
  };

  const updateCourse = async (course) => {
    try {
      await API.put(`/api/course/${course.COURSE_ID}`, course);
      setCourseList(prev =>
        prev.map(c => c.COURSE_ID === course.COURSE_ID ? course : c)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update course");
    }
  };

  const deleteCourse = async (id) => {
    try {
      await API.delete(`/api/course/${id}`);
      setCourseList(prev => prev.filter(c => c.COURSE_ID !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete course");
    }
  };

  return (
    <CourseContext.Provider value={{
      courseList,
      fetchCourseList,
      createCourse,
      updateCourse,
      deleteCourse
    }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => useContext(CourseContext);
