import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "../store/authStore";

import Loader from "./ui/Loader";

export default function ProtectedRoute() {

  const {
    isAuthenticated,
    checkingAuth,
  } = useAuthStore();

  // Show loader while checking auth
  if (checkingAuth) {
    return <Loader />;
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // Authorized
  return <Outlet />;
}