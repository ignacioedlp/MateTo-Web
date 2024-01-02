import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorState from '../components/ErrorState'
import Loader from '../components/Loader'



export const PublicRoute = () => {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/home" />
  }

  return (
    <ErrorBoundary
      fallback={<ErrorState text="An error occurred in the application." />}
    >
      <Suspense fallback={<Loader />}><Outlet /></Suspense>
    </ErrorBoundary>
  )
};