import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Menu, Typography, Form, Modal, ConfigProvider } from 'antd';
import {
  ProjectOutlined,
  IdcardOutlined,
  RocketOutlined,
  MessageOutlined,
  SettingOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { logout, selectAuth } from '../../redux/slices/authSlice';
import { selectUserData } from '../../redux/slices/userDataSlice';
import { Container } from '../../components/Container/Container';
import { useTranslation } from 'react-i18next';
import { openMessage } from '../../utils/openMessage';
import MySkillsPage from '../MySkillsPage/MySkillsPage';
import SkillsPage from '../MySkillsPage/SkillsPage/SkillsPage';

import './UserPage.less';

const { Title, Text } = Typography;
const { Content, Sider } = Layout;

const UserPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const userAuth = useSelector(selectAuth);
  const userData = useSelector(selectUserData);
  const { t } = useTranslation();
  const firstname = userAuth.user?.firstname;
  const lastname = userAuth.user?.lastname;
  const userId = userAuth.user?._id.slice(0, 10);

  const getSelectedMenuKey = () => {
    if (location.pathname.startsWith('/user/skills')) {
      return '/user/skills';
    }

    return location.pathname;
  };

  function getItem(label, key, icon, type, path, onClick) {
    return {
      key,
      icon,
      label: path ? <Link to={path}>{label}</Link> : label,
      type,
      onClick,
    };
  }

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    openMessage('success', t('youloggedout'));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const items = [
    getItem(t('overview'), '/user', <DashboardOutlined />, null, '/user'),
    getItem(
      t('skills'),
      '/user/skills',
      <RocketOutlined />,
      null,
      '/user/skills'
    ),
    getItem(
      t('projects'),
      '/user/projects',
      <ProjectOutlined rotate={270} />,
      null,
      '/user/projects'
    ),
    getItem(
      t('profile'),
      '/user/profile',
      <IdcardOutlined />,
      null,
      '/user/profile'
    ),
    getItem(
      t('settings'),
      '/user/settings',
      <SettingOutlined />,
      null,
      '/user/settings'
    ),
    getItem(
      t('feedback'),
      '/user/feedback',
      <MessageOutlined />,
      null,
      '/user/feedback'
    ),
    getItem(t('logout'), 'logout', <LogoutOutlined />, null, '', showModal),
  ];

  const renderContent = () => {
    if (location.pathname === '/user') {
      return (
        <div className="userpage__container">
          <Form layout="vertical">
            <Form.Item>
              <Title className="userpage__container-title">
                {(firstname && `${firstname} ${lastname}`) || `User ${userId}`}
              </Title>
              {/* <Text className="userpage__container-subtitle" type="secondary">
                {t('userPageDescription')}
              </Text> */}
            </Form.Item>
          </Form>
        </div>
      );
    }

    if (
      location.pathname.startsWith('/user/skills') &&
      location.pathname !== '/user/skills'
    ) {
      return <SkillsPage />;
    } else if (location.pathname === '/user/skills') {
      return <MySkillsPage />;
    }

    return <Outlet />;
  };

  return (
    <Layout className="userpage">
      <Container>
        <Layout className="userpage__layout">
          <Sider
            className="userpage__layout-sider"
            breakpoint="md"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              // console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              // console.log(collapsed, type);
            }}
          >
            <Menu
              className="userpage__layout-menu"
              mode="inline"
              selectedKeys={[getSelectedMenuKey()]}
              defaultSelectedKeys={['1']}
              items={items}
            />
          </Sider>
          <Content>
            <div className="userpage__layout-content">{renderContent()}</div>
            <ConfigProvider
              theme={{
                components: {
                  Modal: {
                    colorBgElevated: '#ffffff',
                  },
                  Button: {
                    colorPrimary: '#04bbec',
                    colorPrimaryHover: '#04bbec',
                  },
                },
              }}
            >
              <Modal
                className="userpage__modal"
                open={isModalOpen}
                onOk={logoutHandler}
                onCancel={closeModal}
                okButtonProps={{
                  type: 'primary',
                  danger: true,
                }}
                cancelButtonProps={{
                  type: 'primary',
                }}
                centered
                okText={t('yes')}
                cancelText={t('no')}
              >
                <Title className="userpage__modal-title">{t('logout')}</Title>
                <Text className="userpage__modal-subtitle">
                  {t('areYouSureYouWantToLogout')}
                </Text>
              </Modal>
            </ConfigProvider>
          </Content>
        </Layout>
      </Container>
    </Layout>
  );
};

export default UserPage;
