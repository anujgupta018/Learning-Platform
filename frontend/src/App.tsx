import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Profile from "./components/Profile";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import LectureView from "./components/LectureView";
import CreateCourse from "./components/CreateCourse";
import AddLecture from "./components/AddLecture";
import Login from "./components/LoginPage";
import Register from "./components/RegisterPage";
import Progress from "./components/Progress";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      <main className="flex-1 relative z-10">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/:id"
            element={
              <ProtectedRoute>
                <CourseDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lecture/:id"
            element={
              <ProtectedRoute>
                <LectureView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-course"
            element={
              <ProtectedRoute roles={["Instructor"]}>
                <CreateCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/:courseId/add-lecture"
            element={
              <ProtectedRoute roles={["Instructor"]}>
                <AddLecture />
              </ProtectedRoute>
            }
          />
          <Route
            path="/progress"
            element={
              <ProtectedRoute roles={["Student"]}>
                <Progress />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
