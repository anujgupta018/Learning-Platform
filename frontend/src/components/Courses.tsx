import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import API from "@/api/axios";

interface Course {
  _id: string;
  title: string;
  description: string;
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get("/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };
    fetchCourses();
  }, []);
  const handleDelete = async (_id: string) => {
    console.log(`${_id}`);
    try {
      await API.delete(`/courses/${_id}`);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== _id)
      );
      alert("Course Deleted Successfully");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.delete("/courses");
        alert("Course Deleted Successfully");
        setCourses(res.data);
      } catch (err) {
        console.log(err);
      }
      fetchCourses();
    };
  });
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6 text-white">Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <Link to={`/courses/${course._id}`}>
              <Button variant="outline">View Course</Button>
            </Link>
            <Button onClick={() => handleDelete(course._id)}>
              Delete Course
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
