import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header } from 'antd/lib/layout/layout';
import { checkIsAuth, logout, selectAuth } from '../../redux/slices/authSlice';
import { selectUserData } from '../../redux/slices/userDataSlice';
import { logoutUserData } from '../../redux/slices/userDataSlice';
import { Button, Flex, Space, Dropdown, ConfigProvider, Avatar } from 'antd';
import {
  LoginOutlined,
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Container } from '../Container/Container';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { openMessage } from '../../utils/openMessage';
import logo from '../../img/logo/logo.png';
import { API_URL as baseUrl } from '../../config';
import './AppHeader.less';

const AppHeader = () => {
  const [size, setSize] = useState('middle');
  const [imageUrl, setImageUrl] = useState('');
  const isAuth = useSelector(checkIsAuth);
  const userAuth = useSelector(selectAuth);
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const firstName = userAuth.user?.firstname;
  const lastName = userAuth.user?.surname;

  useEffect(() => {
    setImageUrl(userData.user?.avatarUrl || '');
  }, [userData.user?.avatarUrl]);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(logoutUserData());
    window.localStorage.removeItem('token');
    openMessage('success', t('youloggedout'));
  };

  const items = [
    {
      label: (
        <Flex align="center" justify="center">
          <Link style={{ color: 'white' }} to="/user">
            <Flex align="center" justify="center" gap="small">
              {imageUrl ? (
                <img
                  className="profilepage__avatar-image"
                  src={
                    imageUrl.startsWith('uploads')
                      ? `${baseUrl}${imageUrl}`
                      : imageUrl
                  }
                  alt="avatar"
                  style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                />
              ) : (
                <Avatar
                  style={{
                    backgroundColor: '#87d068',
                  }}
                  icon={<UserOutlined />}
                />
              )}
              {(firstName && `${firstName} ${lastName}`) || t('profile')}
            </Flex>
          </Link>
        </Flex>
      ),
      key: '0',
    },
    {
      label: (
        <Flex align="center" justify="center">
          <Link style={{ color: 'white' }} to="/">
            {t('reserved')}
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
              {t('logout')}
            </Space>
          </Link>
        </Flex>
      ),
      key: '2',
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
            <Flex align="center" gap="large">
              <LanguageSwitcher />
              <ConfigProvider
                theme={{
                  token: {
                    colorBgElevated: '#b37feb',
                    controlItemBgHover: '#d3adf7',
                  },
                  components: {
                    Dropdown: {
                      colorBgElevated: '#b37feb',
                      controlItemBgHover: '#d3adf7',
                    },
                  },
                }}
              >
                <Dropdown
                  overlayClassName="app-header__dropdown"
                  menu={{
                    items,
                    className: 'app-header__dropdown-menu',
                  }}
                  trigger={['hover']}
                  placement="bottom"
                  arrow
                >
                  <Button
                    onClick={(e) => e.preventDefault()}
                    className="app-header__button"
                    shape="round"
                    icon={<DownOutlined />}
                  >
                    {t('account')}
                  </Button>
                </Dropdown>
              </ConfigProvider>
            </Flex>
          ) : (
            <Flex gap="large" align="center" wrap>
              <LanguageSwitcher />
              <Link className="app-header__link" to={'/login'}>
                <Space size="small">
                  <LoginOutlined className="app-header__link-icon" />
                  {t('login')}
                </Space>
              </Link>
              <Link className="app-header__link" to={'/register'}>
                <Button
                  type="primary"
                  shape="round"
                  icon={<UserOutlined />}
                  size={size}
                >
                  {t('signup')}
                </Button>
              </Link>
            </Flex>
          )}
        </Flex>
      </Container>
    </Header>
  );
};

export default AppHeader;
