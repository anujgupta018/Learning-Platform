import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button } from "./ui/button";
import { MagicCard } from "./magicui/magic-card";

export default function Register() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
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
      alert("Error registering");
    }
  };

  return (
    <MagicCard className="mt-16">
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="w-full mb-4 p-3 border rounded"/>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full mb-4 p-3 border rounded"/>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full mb-4 p-3 border rounded"/>
      <select value={role} onChange={e => setRole(e.target.value)} className="w-full mb-4 p-3 border rounded">
        <option value="Student">Student</option>
        <option value="Instructor">Instructor</option>
      </select>
      <Button onClick={handleRegister} className="w-full bg-purple-600 hover:bg-purple-700 text-white">Register</Button>
    </div>
        </MagicCard>
  );
}
