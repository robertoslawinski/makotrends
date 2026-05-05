import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import CreatePrediction from "./pages/CreatePrediction";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PredictionDetails from "./pages/PredictionDetails";
import Profile from "./pages/Profile";
import Ranking from "./pages/Ranking";
import Signup from "./pages/Signup";

const AdminRoute = ({ children }) => (
  <ProtectedRoute adminOnly>{children}</ProtectedRoute>
);

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="/predictions/:id" element={<PredictionDetails />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/create"
          element={
            <AdminRoute>
              <CreatePrediction />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/edit/:id"
          element={
            <AdminRoute>
              <CreatePrediction editMode />
            </AdminRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
