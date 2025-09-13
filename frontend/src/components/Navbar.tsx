import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button } from "./ui/button";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <nav className="sticky top-4 z-50 mx-4 md:mx-8 lg:mx-16 xl:mx-32 rounded-xl backdrop-blur-lg bg-gradient-to-r from-red-600/30 via-red-600/30 to-red-700/30 border border-white/20 shadow-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-white hover:opacity-90 transition-opacity"
        >
          Learning Platform
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link
                to="/profile"
                className="hover:underline hover:text-indigo-200 transition-colors font-medium text-white"
              >
                {user.name}
              </Link>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-white text-white hover:bg-white hover:text-indigo-700 transition-all"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:underline hover:text-indigo-200 transition-colors font-medium text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-white text-indigo-700 rounded-lg hover:bg-indigo-100 font-medium transition-all"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
