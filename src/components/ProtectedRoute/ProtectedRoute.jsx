import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { checkIsAuth } from '../../redux/slices/authSlice';

const ProtectedRoute = ({ children }) => {
  const isAuth = useSelector(checkIsAuth);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
