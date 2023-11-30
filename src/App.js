import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import MainPage from './pages/MainPage/MainPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { getMe } from './redux/slices/authSlice';
import { Layout, theme } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import AppHeader from './components/AppHeader/AppHeader';
import AppFooter from './components/AppFooter/AppFooter';
import NotFound from './pages/NotFoundPage/NotFoundPage';
import StacksPage from './pages/StacksPage/StacksPage';
import StackPage from './pages/StackPage/StackPage';
import { Container } from './components/Container/Container';

import './App.less';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <Layout className="layout">
      <AppHeader />
      <Content style={{ padding: '0 100px' }}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="stacks" element={<StacksPage />} />
          <Route path="stacks/:id" element={<StackPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <ToastContainer position="bottom-right" autoClose={2000} /> */}
      </Content>
      <AppFooter />
    </Layout>
  );
}

export default App;
