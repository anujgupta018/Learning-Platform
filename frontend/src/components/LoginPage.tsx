import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button } from "./ui/button";
import { MagicCard } from "./magicui/magic-card";
import { CardTitle } from "./ui/card";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Error logging in");
    }
  };

  return (
    <MagicCard className="mt-16"  gradientColor={"#262626"}>
      <div
        className="max-w-md mx-auto p-8 rounded-3xl shadow-2xl
                   backdrop-blur-md"
      >
        <CardTitle className=" text-bold text-white text-center text-3xl mb-6">
          Login
        </CardTitle>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-4 p-4 rounded-xl border border-white/30 
                     bg-white/10 text-white placeholder-white/70 
                     focus:outline-none focus:ring-2 focus:ring-pink-400 
                     focus:border-transparent transition-all duration-300"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-6 p-4 rounded-xl border border-white/30 
                     bg-white/10 text-white placeholder-white/70 
                     focus:outline-none focus:ring-2 focus:ring-pink-400 
                     focus:border-transparent transition-all duration-300"
        />

        <Button
          onClick={handleLogin}
          className="w-full py-4 rounded-xl text-lg font-semibold
                     bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
                     hover:from-pink-400 hover:via-purple-400 hover:to-indigo-400
                     text-white shadow-xl hover:shadow-pink-500/50 transition-all duration-300"
        >
          Login
        </Button>
      </div>
    </MagicCard>
  );
}
