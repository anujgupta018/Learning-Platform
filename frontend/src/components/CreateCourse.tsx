import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/api/axios";

export default function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const createCourse = async () => {
    if (!title.trim()) return alert("Title is required");

    try {
      const res = await API.post("/courses", { title, description });
      alert("Course created successfully!");
      navigate(`/courses/${res.data._id}/add-lecture`);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create course");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 md:p-12 space-y-6">
        <h2 className="text-4xl font-bold text-center text-white mb-6">
          Create Course
        </h2>

        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 rounded-xl bg-white/10 placeholder-white/60 text-white border border-white/20 focus:border-purple-400 focus:bg-white/20 focus:ring-0 transition-all"
        />

        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-4 rounded-xl bg-white/10 placeholder-white/60 text-white border border-white/20 focus:border-purple-400 focus:bg-white/20 focus:ring-0 h-40 resize-none transition-all"
        />

        <button
          onClick={createCourse}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-xl py-4 text-lg font-semibold shadow-lg transition-all duration-300"
        >
          Create Course
        </button>
      </div>
    </div>
  );
}
