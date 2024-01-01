import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Header } from 'antd/lib/layout/layout';
import { checkIsAuth, logout } from '../../redux/slices/authSlice';
import second, { logoutUserData } from '../../redux/slices/userDataSlice';
import { Button, Flex, Space, Dropdown } from 'antd';
import {
  LoginOutlined,
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Container } from '../Container/Container';
import './AppHeader.less';
import logo from '../../img/logo/logo.png';

const AppHeader = () => {
  const [size, setSize] = useState('middle');
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(logoutUserData());
    window.localStorage.removeItem('token');
    toast('Вы вышли из системы.');
  };

  const items = [
    {
      label: (
        <Flex align="center" justify="center">
          <Link style={{ color: 'white' }} to="/user">
            <Space size="small">
              <UserOutlined style={{ color: 'white' }} />
              Профиль
            </Space>
          </Link>
        </Flex>
      ),
      key: '0',
    },
    {
      label: (
        <Flex align="center" justify="center">
          <Link style={{ color: 'white' }} to="/">
            Резерв
          </Link>
        </Flex>
      ),
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <Flex align="center" justify="center">
          <Link style={{ color: 'white' }} onClick={logoutHandler}>
            <Space size="small">
              <LogoutOutlined style={{ color: 'white' }} />
              Выйти
            </Space>
          </Link>
        </Flex>
      ),
      key: '3',
    },
  ];

  return (
    <Header className="app-header">
      <Container className="app-header__content">
        <Flex justify="space-between" align="center">
          <Flex justify="flex-start" align="center">
            <Link to="/">
              <img className="app-header__logo" src={logo} alt="logo" />
            </Link>
          </Flex>
          {isAuth ? (
            <Dropdown
              menu={{
                items,
              }}
              trigger={['click']}
              placement="bottomRight"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Button shape="round" className="app-header__menu">
                  <Space>
                    Меню
                    <DownOutlined />
                  </Space>
                </Button>
              </a>
            </Dropdown>
          ) : (
            <Flex gap="large" align="center" wrap>
              <Link className="app-header__link" to={'/login'}>
                <Space size="small">
                  <LoginOutlined className="app-header__link-icon" />
                  Войти
                </Space>
              </Link>
              <Button
                type="primary"
                shape="round"
                icon={<UserOutlined />}
                size={size}
              >
                <Link className="app-header__link" to={'/register'}>
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
