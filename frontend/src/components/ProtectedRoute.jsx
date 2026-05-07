import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import StateMessage from "./StateMessage";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <StateMessage type="loading" title="Checking your session">
        Confirming your access before opening this area.
      </StateMessage>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
