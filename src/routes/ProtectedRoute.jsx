import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { decodeToken } from "../utils/jwt";
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorState from '../components/ErrorState'
import Loader from '../components/Loader'

export const ProtectedRoute = ({ roles }) => {
  const { token } = useAuth();

  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  const { role } = decodeToken(token);

  // Check if the user has the required role to access the route
  if (roles && !roles.includes(role)) {
    // If not, redirect to the login page
    return <Navigate to="/" />;
  }


  // If authenticated, render the child routes
  return (
    <ErrorBoundary
      fallback={<ErrorState text="An error occurred in the application." />}
    >
      <Suspense fallback={<Loader />}><Outlet /></Suspense>
    </ErrorBoundary>
  )
};