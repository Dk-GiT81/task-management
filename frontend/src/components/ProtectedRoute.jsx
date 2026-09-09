import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";


function ProtectedRoute({ children }) {
  const {
    isAuthenticated,
    loading,
  } = useAuth();


  /*
   * Wait until we know whether
   * a previous session exists.
   */
  if (loading) {
    return (
      <div className="loading-screen">
        Loading...
      </div>
    );
  }


  /*
   * No token → login
   */
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }


  /*
   * Authenticated → page
   */
  return children;
}


export default ProtectedRoute;