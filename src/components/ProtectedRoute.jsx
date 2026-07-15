import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProtectedRoute({ children }) {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const location = useLocation();

  // Simple auth check - you can replace this with your actual auth logic
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  useEffect(() => {
    if (!isAuthenticated) {
      alert('Please login or sign in');
      setShouldRedirect(true);
    }
  }, [isAuthenticated]);

  if (shouldRedirect) {
    // Redirect to login and save the location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // While we are checking (or if not authenticated but hasn't redirected yet), 
  // we can return null to avoid rendering the protected content briefly.
  if (!isAuthenticated) {
    return null;
  }

  return children ? children : <Outlet />;
}
