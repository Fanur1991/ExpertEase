import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Header } from 'antd/lib/layout/layout';
import { checkIsAuth, logout } from '../../redux/slices/authSlice';
import { Button, Flex, Space } from 'antd';
import { LoginOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Container } from '../Container/Container';
import './AppHeader.less';
import logo from '../../img/logo/logo.png';

const AppHeader = () => {
  const [size, setSize] = useState('middle');
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    toast('Вы вышли из системы.');
  };

  return (
    <Header className="app-header">
      <Container>
        <Flex justify="space-between" align="center">
          <Link to="/">
            <Flex align="center" justify="center">
              <img style={{ padding: '0 auto' }} height={40} src={logo} />
            </Flex>
          </Link>
          {isAuth ? (
            <Flex>
              <Link style={{ color: 'white' }} onClick={logoutHandler}>
                <Space size="small">
                  <LogoutOutlined style={{ color: 'white' }} />
                  Выйти
                </Space>
              </Link>
            </Flex>
          ) : (
            <Flex gap="large" align="center" wrap>
              <Link style={{ color: 'white' }} to={'/login'}>
                <Space size="small">
                  <LoginOutlined style={{ color: 'white' }} />
                  Войти
                </Space>
              </Link>
              <Button
                type="primary"
                shape="round"
                icon={<UserOutlined />}
                size={size}
              >
                <Link style={{ color: 'white' }} to={'/register'}>
                  Зарегистрироваться
                </Link>
              </Button>
            </Flex>
          )}
        </Flex>
      </Container>
    </Header>
  );
};

export default AppHeader;
