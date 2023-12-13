import { useSelector } from 'react-redux';
import { checkIsAuth } from '../../redux/slices/authSlice';
import UnauthContent from '../../components/UnauthContent/UnauthContent';
import AppContent from '../../components/AppContent/AppContent';

const MainPage = () => {
  const isAuth = useSelector(checkIsAuth);

  return (
    <div className="site-layout-content">
      {' '}
      {isAuth ? <AppContent /> : <UnauthContent />}
    </div>
  );
};

export default MainPage;
