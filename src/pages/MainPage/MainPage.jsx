import { useSelector } from 'react-redux';
import { theme } from 'antd';
import { checkIsAuth } from '../../redux/slices/authSlice';
import UnauthContent from '../../components/UnauthContent/UnauthContent';
import AppContent from '../../components/AppContent/AppContent';

const MainPage = () => {
  const isAuth = useSelector(checkIsAuth);
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  return (
    <div
      className="site-layout-content"
      // style={{
      //   background: colorBgContainer,
      // }}
    >
      {' '}
      {isAuth ? <AppContent /> : <UnauthContent />}
    </div>
  );
};

export default MainPage;
