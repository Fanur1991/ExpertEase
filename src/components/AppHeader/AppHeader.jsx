import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Header } from 'antd/lib/layout/layout';
import { checkIsAuth, logout, selectAuth } from '../../redux/slices/authSlice';
import { selectUserData } from '../../redux/slices/userDataSlice';
import { logoutUserData } from '../../redux/slices/userDataSlice';
import { Button, Flex, Space, Dropdown, ConfigProvider } from 'antd';
import { LoginOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Container } from '../Container/Container';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { openMessage } from '../../utils/openMessage';
import logo from '../../img/logo/logo2.png';
import './AppHeader.less';
import AvatarComponent from '../AvatarComponent/AvatarComponent';

const AppHeader = () => {
  const [size, setSize] = useState('middle');
  const [imageUrl, setImageUrl] = useState('');
  const isAuth = useSelector(checkIsAuth);
  const userAuth = useSelector(selectAuth);
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation();
  const firstname = userAuth.user?.firstname;
  const lastname = userAuth.user?.lastname;

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
          <Link
            style={{
              color: '#262626',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              height: 30,
            }}
            to="/user"
          >
            <Flex align="center" justify="center" gap="small">
              <AvatarComponent
                imageUrl={imageUrl}
                firstname={firstname}
                userData={userData}
                imageClass="app-header__avatar-image"
                blindClass="app-header__avatar-blind"
                characterClass="app-header__avatar-character"
              />
              {(firstname && `${firstname} ${lastname}`) || t('profile')}
            </Flex>
          </Link>
        </Flex>
      ),
      key: '0',
    },
    // {
    //   label: (
    //     <Flex align="center" justify="center">
    //       <Link style={{ color: 'white' }} to="/">
    //         {t('reserved')}
    //       </Link>
    //     </Flex>
    //   ),
    //   key: '1',
    // },
    {
      type: 'divider',
    },
    {
      label: (
        <Flex align="center" justify="center">
          <Link
            style={{
              color: '#262626',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              height: 30,
            }}
            onClick={logoutHandler}
          >
            <Space size="small">
              <LogoutOutlined style={{ color: '#262626' }} />
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
          {location.pathname === '/' ? (
            <span className="app-header__logo" src={logo}></span>
          ) : (
            <Flex justify="flex-start" align="center">
              <Link to="/">
                <img className="app-header__logo" src={logo} alt="logo" />
              </Link>
            </Flex>
          )}
          {isAuth ? (
            <Flex align="center" gap="large">
              <LanguageSwitcher />
              <ConfigProvider>
                <Dropdown
                  overlayClassName="app-header__dropdown"
                  menu={{
                    items,
                    className: 'app-header__dropdown-menu',
                  }}
                  trigger={['click']}
                  placement="bottomRight"
                  arrow
                >
                  <Button
                    onClick={(e) => e.preventDefault()}
                    className="app-header__button"
                    shape="circle"
                  >
                    <AvatarComponent
                      imageUrl={imageUrl}
                      firstname={firstname}
                      userData={userData}
                      imageClass="app-header__avatar-image"
                      blindClass="app-header__avatar-blind"
                      characterClass="app-header__avatar-character"
                    />
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
