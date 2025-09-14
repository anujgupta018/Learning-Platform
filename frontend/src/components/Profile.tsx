import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/user/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error("Failed to load profile", err));
  }, []);

  if (!profile)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
        <div className="text-white text-2xl font-semibold animate-pulse">
          Loading profile...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
      <div className="w-full h-full max-w-5xl bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-12 text-white flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Left: Avatar */}
        <div className="flex flex-col items-center space-y-4 flex-shrink-0">
          <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center text-5xl font-bold text-white">
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-4xl font-bold">{profile.name}</h2>
          <p className="text-white/70">{profile.email}</p>
          <span className="px-6 py-2 bg-purple-700/50 rounded-full text-lg font-semibold">
            {profile.role}
          </span>
        </div>
        <div className="flex-1 w-full space-y-6">
          <div className="flex justify-between p-6 bg-white/10 rounded-xl shadow-inner text-lg">
            <span className="font-medium text-white/80">Name:</span>
            <span className="font-semibold text-white">{profile.name}</span>
          </div>
          <div className="flex justify-between p-6 bg-white/10 rounded-xl shadow-inner text-lg">
            <span className="font-medium text-white/80">Email:</span>
            <span className="font-semibold text-white">{profile.email}</span>
          </div>
          <div className="flex justify-between p-6 bg-white/10 rounded-xl shadow-inner text-lg">
            <span className="font-medium text-white/80">Role:</span>
            <span className="font-semibold text-white">{profile.role}</span>
          </div>

          <button
            className="w-full mt-6 py-4 bg-white/20 backdrop-blur-sm rounded-xl text-white font-semibold hover:bg-white/30 transition-all duration-300 shadow-lg"
            onClick={() => alert("Profile editing coming soon!")}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
