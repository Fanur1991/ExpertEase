import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Flex, Spin, Typography } from 'antd';
import { checkIsAuth } from '../../redux/slices/authSlice';

const { Title } = Typography;

const ProtectedRoute = ({ children }) => {
  const isAuth = useSelector(checkIsAuth);
  const isLoading = useSelector((state) => state.auth.isLoading);

  if (isLoading) {
    return (
      <Flex justify="center" align="center">
        <Title level={4} style={{ color: '#8c8c8c' }}>
          Loading <Spin />
        </Title>
      </Flex>
    );
  }

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
