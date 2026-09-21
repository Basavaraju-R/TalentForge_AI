import { Navigate, useLocation, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  // Simple auth check - you can replace this with your actual auth logic
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    // Redirect to login and save the location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
}
