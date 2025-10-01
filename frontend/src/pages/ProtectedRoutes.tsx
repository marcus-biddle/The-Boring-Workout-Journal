import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useWorkout } from "../hooks/workoutContext";

export const ProtectedRoute = () => {
    const { user } = useWorkout();
  const location = useLocation();

  console.log('ProtectedRoute', user)

  if (!user) {
    // Redirect to login and save the attempted URL in state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
