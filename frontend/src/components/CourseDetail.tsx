import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "@/api/axios";

interface Lecture {
  _id: string;
  title: string;
  type: string;
  content?: string;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  lectures: Lecture[];
}

export default function CourseDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await API.get(`/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Failed to fetch course", err);
        alert("Failed to fetch course");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading)
    return (
      <div className="text-center text-white mt-20">Loading course...</div>
    );
  if (!course)
    return <div className="text-center text-white mt-20">Course not found</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl p-8 mt-10 shadow-lg">
      <h1 className="text-3xl font-bold text-purple-400">{course.title}</h1>
      <p className="mt-3 text-gray-300">{course.description}</p>

      <h2 className="text-2xl font-semibold mt-8 text-white">Lectures</h2>
      <ul className="space-y-3 mt-4">
        {course.lectures.map((lecture) => (
          <li
            key={lecture._id}
            className="p-4 border border-white/20 rounded-lg hover:bg-purple-800/30 transition-colors cursor-pointer text-white"
            onClick={() => navigate(`/lecture/${lecture._id}`)}
          >
            <h3 className="font-medium">{lecture.title}</h3>
            <p className="text-sm text-gray-300">Type: {lecture.type}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
