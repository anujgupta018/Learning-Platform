import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import API from "@/api/axios";
import { useNavigate } from "react-router-dom";

export default function Progress() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<{
    completed: number;
    total: number;
  }>({ completed: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        // Get current course ID from localStorage (set this when user opens a course)
        const courseId = localStorage.getItem("currentCourseId");
        if (!courseId) throw new Error("No course selected");

        const res = await API.get(`/progress/${courseId}`);
        setProgress({
          completed: res.data.completedLectures.length,
          total: res.data.totalLectures,
        });
      } catch (err: any) {
        console.error(err.response?.data?.message || err.message);
        alert("Failed to fetch progress");
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  if (loading)
    return (
      <div className="text-white text-center mt-20">
        Loading your progress...
      </div>
    );

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-6 text-white">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 text-center space-y-6">
        <h1 className="text-3xl font-bold">Your Progress</h1>
        <p className="text-lg">
          Completed <span className="font-semibold">{progress.completed}</span>{" "}
          out of <span className="font-semibold">{progress.total}</span>{" "}
          lectures
        </p>
        <Button
          variant="outline"
          className="border-white text-white hover:border-gray-300 hover:bg-white/20 transition-all"
          onClick={() => navigate("/courses")}
        >
          Browse Courses
        </Button>
      </div>
    </div>
  );
}
