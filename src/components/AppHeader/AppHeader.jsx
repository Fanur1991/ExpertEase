import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Header } from 'antd/lib/layout/layout';
import { checkIsAuth, logout } from '../../redux/slices/authSlice';
import { Col, Row, Space } from 'antd';
import {
  LoginOutlined,
  UserOutlined,
  TeamOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import './AppHeader.less';

const AppHeader = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();

  const activeStyles = {
    color: 'white',
  };

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    toast('Вы вышли из системы.');
  };

  return (
    <Header
      style={{
        backgroundColor: '#1677ff',
      }}
    >
      <Row>
        <Col span={2} offset={2}>
          <Space size={'small'}>
            <TeamOutlined style={{ fontSize: '25px', color: '#fa8c16' }} />
            <div className="logo">Logo</div>
          </Space>
        </Col>
        {isAuth ? (
          <Col span={2} offset={18}>
            <Link style={{ color: 'white' }} onClick={logoutHandler}>
              <Space size={'small'}>
                <LogoutOutlined style={{ color: 'white' }} />
                Выйти
              </Space>
            </Link>
          </Col>
        ) : (
          <Col span={5} offset={15}>
            <Space size={'large'}>
              <Link style={{ color: 'white' }} to={'/register'}>
                <Space size={'small'}>
                  <UserOutlined style={{ color: 'white' }} />
                  Зарегистрироваться
                </Space>
              </Link>
              <Link style={{ color: 'white' }} to={'/login'}>
                <Space size={'small'}>
                  <LoginOutlined style={{ color: 'white' }} />
                  Войти
                </Space>
              </Link>
            </Space>
          </Col>
        )}
      </Row>
    </Header>
  );
};

export default AppHeader;
