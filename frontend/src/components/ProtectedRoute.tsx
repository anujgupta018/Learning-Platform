import { useContext, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
  roles,
}: {
  children: JSX.Element;
  roles?: string[];
}) {
  const { user } = useContext(AuthContext);


  if (!user) {
    return <Navigate to="/login" replace />;
  }


  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

 
  return children;
}
