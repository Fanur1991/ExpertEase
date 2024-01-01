import { Link, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Menu } from 'antd';
import {
  ProjectOutlined,
  IdcardOutlined,
  RocketOutlined,
  MessageOutlined,
  SettingOutlined,
  LogoutOutlined,
  FundProjectionScreenOutlined,
} from '@ant-design/icons';
import { toast } from 'react-toastify';
import { logout } from '../../redux/slices/authSlice';
import { Container } from '../../components/Container/Container';
import { selectStacks } from '../../redux/slices/stacksSlice';

import './UserPage.less';

const { Content, Sider } = Layout;

const UserPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const stacks = useSelector(selectStacks);

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

  const items = [
    getItem(
      'Текущее состояние',
      '/user',
      <FundProjectionScreenOutlined />,
      null,
      '/user'
    ),
    getItem(
      'Мои навыки',
      '/user/skills',
      <RocketOutlined />,
      null,
      '/user/skills'
    ),
    getItem(
      'Мои проекты',
      '/user/projects',
      <ProjectOutlined />,
      null,
      '/user/projects'
    ),
    getItem(
      'Мой профиль',
      '/user/profile',
      <IdcardOutlined />,
      null,
      '/user/profile'
    ),
    getItem(
      'Настройки аккаунта',
      '/user/settings',
      <SettingOutlined />,
      null,
      '/user/settings'
    ),
    getItem(
      'Обратная связь',
      '/user/feedback',
      <MessageOutlined />,
      null,
      '/user/feedback'
    ),
    getItem('Выйти', 'logout', <LogoutOutlined />, null, '', logoutHandler),
  ];

  const renderContent = () => {
    if (location.pathname === '/user') {
      return (
        <div>
          <h3>
            Здесь будет текущий прогресс по заполненным стекам и ссылка на него
            для HR
          </h3>
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
          </Content>
        </Layout>
      </Container>
    </Layout>
  );
};

export default UserPage;
