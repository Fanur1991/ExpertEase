import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Menu, Typography, Form, Modal } from 'antd';
import {
  ProjectOutlined,
  IdcardOutlined,
  RocketOutlined,
  MessageOutlined,
  SettingOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { logout } from '../../redux/slices/authSlice';
import { Container } from '../../components/Container/Container';
// import { selectStacks } from '../../redux/slices/stacksSlice';
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
  // const stacks = useSelector(selectStacks);
  const { t } = useTranslation();

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
        <div style={{ padding: '20px' }}>
          <Form className="skillspage" layout="vertical">
            <Form.Item className="skillspage__form-item">
              <Title level={3} className="skills__title">
                {t('userPageTitle')}
              </Title>
              <Text type="secondary">{t('userPageDescription')}</Text>
              
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
        <Layout className="userpage-layout">
          <Sider
            className="userpage-layout__sider"
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
              className="userpage-layout__menu"
              mode="inline"
              selectedKeys={[getSelectedMenuKey()]}
              defaultSelectedKeys={['1']}
              items={items}
            />
          </Sider>
          <Content>
            <div className="userpage-layout__content">{renderContent()}</div>
            <Modal
              open={isModalOpen}
              onOk={logoutHandler}
              onCancel={closeModal}
              okButtonProps={{
                type: 'primary',
                danger: true,
              }}
              centered
              okText={t('yes')}
              cancelText={t('no')}
            >
              <Title level={3}>{t('areYouSureYouWantToLogout')}</Title>
            </Modal>
          </Content>
        </Layout>
      </Container>
    </Layout>
  );
};

export default UserPage;
