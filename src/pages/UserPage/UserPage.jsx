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
import { toast } from 'react-toastify';
import { logout } from '../../redux/slices/authSlice';
import { Container } from '../../components/Container/Container';
// import { selectStacks } from '../../redux/slices/stacksSlice';

import './UserPage.less';

const { Title, Text } = Typography;
const { Content, Sider } = Layout;

const UserPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  // const stacks = useSelector(selectStacks);

  const selectedKeys = location.pathname;

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
    toast('Вы вышли из системы.');
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const items = [
    getItem('Overview', '/user', <DashboardOutlined />, null, '/user'),
    getItem('Skills', '/user/skills', <RocketOutlined />, null, '/user/skills'),
    getItem(
      'Projects',
      '/user/projects',
      <ProjectOutlined rotate={270} />,
      null,
      '/user/projects'
    ),
    getItem(
      'Profile',
      '/user/profile',
      <IdcardOutlined />,
      null,
      '/user/profile'
    ),
    getItem(
      'Settings',
      '/user/settings',
      <SettingOutlined />,
      null,
      '/user/settings'
    ),
    getItem(
      'Feedback',
      '/user/feedback',
      <MessageOutlined />,
      null,
      '/user/feedback'
    ),
    getItem('Logout', 'logout', <LogoutOutlined />, null, '', showModal),
  ];

  const renderContent = () => {
    if (location.pathname === '/user') {
      return (
        <div style={{ padding: '20px' }}>
          <Form className="skillspage" layout="vertical">
            <Form.Item className="skillspage__form-item">
              <Title level={3} className="skills__title">
                Profile Overview
              </Title>
              <Text type="secondary">
                Здесь будет текущий прогресс по заполненным стекам и ссылка на
                него для HR
              </Text>
            </Form.Item>
          </Form>
        </div>
      );
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
              selectedKeys={[selectedKeys]}
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
              okText="Yes"
              cancelText="No"
            >
              <Title level={3}>Are you sure you want to logout?</Title>
            </Modal>
          </Content>
        </Layout>
      </Container>
    </Layout>
  );
};

export default UserPage;
