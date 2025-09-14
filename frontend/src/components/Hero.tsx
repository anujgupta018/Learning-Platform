import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button } from "./ui/button";

export default function Hero() {
  const { user } = useContext(AuthContext);

  return (
    <div className="relative min-h-screen flex flex-col mb-1 items-center justify-center overflow-hidden">
      <div className="absolute inset-0"></div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6 space-y-16">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/80 text-sm font-medium"></div>

          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight">
            Learn. Teach. Excel.
          </h1>

          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Transform your educational journey with our cutting-edge platform.
            Create immersive courses, track progress in real-time, and unlock
            unlimited potential.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-white">
              500+
            </div>
            <div className="text-white/60 text-sm">Active Courses</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-white">
              10K+
            </div>
            <div className="text-white/60 text-sm">Students</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-white">95%</div>
            <div className="text-white/60 text-sm">Success Rate</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-white">
              24/7
            </div>
            <div className="text-white/60 text-sm">Support</div>
          </div>
        </div>
        {user ? (
          user.role === "Instructor" ? (
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl space-y-8">
              <div className="flex items-center gap-4 justify-center">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white">
                  Instructor Hub
                </h2>
              </div>

              <p className="text-white/70 text-lg">
                Shape the future of learning with your expertise
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/create-course" className="group">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 p-6 rounded-2xl transition-all duration-300 group-hover:scale-105 shadow-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <h3 className="text-xl font-semibold text-white">
                        Create Course
                      </h3>
                    </div>
                    <p className="text-white/80 text-sm">
                      Build engaging courses with interactive content
                    </p>
                  </div>
                </Link>
                <Link to="/courses" className="group">
                  <div className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 p-6 rounded-2xl transition-all duration-300 group-hover:scale-105">
                    <div className="flex items-center gap-3 mb-3">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                      <h3 className="text-xl font-semibold text-white">
                        Manage Courses
                      </h3>
                    </div>
                    <p className="text-white/80 text-sm">
                      View analytics and manage your content
                    </p>
                  </div>
                </Link>

                <Link to="/profile" className="group">
                  <div className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 p-6 rounded-2xl transition-all duration-300 group-hover:scale-105">
                    <div className="flex items-center gap-3 mb-3">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <h3 className="text-xl font-semibold text-white">
                        Profile
                      </h3>
                    </div>
                    <p className="text-white/80 text-sm">
                      View your teaching portfolio and stats
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl space-y-8">
              <div className="flex items-center gap-4 justify-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white">
                  Student Portal
                </h2>
              </div>

              <p className="text-white/70 text-lg">
                Accelerate your learning journey with personalized education
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/courses" className="group">
                  <div className="bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-500 hover:to-pink-500 p-6 rounded-2xl transition-all duration-300 group-hover:scale-105 shadow-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <h3 className="text-xl font-semibold text-white">
                        Explore Courses
                      </h3>
                    </div>
                    <p className="text-white/80 text-sm">
                      Discover courses tailored to your interests
                    </p>
                  </div>
                </Link>

                <Link to="/progress" className="group">
                  <div className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 p-6 rounded-2xl transition-all duration-300 group-hover:scale-105">
                    <div className="flex items-center gap-3 mb-3">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      <h3 className="text-xl font-semibold text-white">
                        Track Progress
                      </h3>
                    </div>
                    <p className="text-white/80 text-sm">
                      Monitor your learning achievements
                    </p>
                  </div>
                </Link>

                <Link to="/quiz/1" className="group">
                  <div className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 p-6 rounded-2xl transition-all duration-300 group-hover:scale-105">
                    <div className="flex items-center gap-3 mb-3">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                      <h3 className="text-xl font-semibold text-white">
                        Take Quizzes
                      </h3>
                    </div>
                    <p className="text-white/80 text-sm">
                      Test your knowledge and skills
                    </p>
                  </div>
                </Link>

                <Link to="/profile" className="group">
                  <div className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 p-6 rounded-2xl transition-all duration-300 group-hover:scale-105">
                    <div className="flex items-center gap-3 mb-3">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <h3 className="text-xl font-semibold text-white">
                        My Profile
                      </h3>
                    </div>
                    <p className="text-white/80 text-sm">
                      Manage your learning profile
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          )
        ) : (
          <div className="space-y-12">
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl space-y-8">
              <h2 className="text-3xl font-bold text-white">
                Choose Your Path
              </h2>
              <p className="text-white/70 text-lg">
                Join thousands of learners and educators transforming education
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-400/30 p-8 rounded-2xl space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white text-center">
                    For Instructors
                  </h3>
                  <p className="text-white/70 text-center">
                    Create courses, manage content, and inspire students
                    worldwide
                  </p>
                  <ul className="space-y-2 text-white/60 text-sm">
                    <li className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Unlimited course creation
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Real-time analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Interactive quiz builder
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-orange-600/20 to-pink-600/20 backdrop-blur-sm border border-orange-400/30 p-8 rounded-2xl space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white text-center">
                    For Students
                  </h3>
                  <p className="text-white/70 text-center">
                    Learn at your own pace with personalized progress tracking
                  </p>
                  <ul className="space-y-2 text-white/60 text-sm">
                    <li className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Access to all courses
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Progress tracking
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Interactive assessments
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/register">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-12 py-4 rounded-2xl text-lg font-semibold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-12 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  Welcome Back
                </Button>
              </Link>
            </div>
          </div>
        )}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">Lightning Fast</h3>
            <p className="text-white/60">Optimized for speed and performance</p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">
              Secure Learning
            </h3>
            <p className="text-white/60">
              Enterprise-grade security and privacy
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">Loved by Users</h3>
            <p className="text-white/60">
              Join our community of satisfied learners
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
}
