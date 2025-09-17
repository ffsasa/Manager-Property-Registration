import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/useAuth.js';
import FullPageSpinner from '../components/UI/FullPageSpinner.jsx';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return <FullPageSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node
};

export default ProtectedRoute;