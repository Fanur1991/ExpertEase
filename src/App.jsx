import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import 'react-toastify/dist/ReactToastify.css';
import MainPage from './pages/MainPage/MainPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { getMe } from './redux/slices/authSlice';
import AppHeader from './components/AppHeader/AppHeader';
import AppFooter from './components/AppFooter/AppFooter';
import NotFound from './pages/NotFoundPage/NotFoundPage';
import StackPage from './pages/StacksPage/StackPage/StackPage';
import UserPage from './pages/UserPage/UserPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import SkillsPage from './pages/SkillsPage/SkillsPage';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import FeedbackPage from './pages/FeedbackPage/FeedbackPage';

import './App.less';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      dispatch(getMe());
    }
  }, [dispatch]);

  return (
    <Layout className="layout">
      <AppHeader />
      <Content>
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* <Route path="stacks" element={<StacksPage />} /> */}
          <Route path="stacks/:id" element={<StackPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            }
          >
            <Route path="skills" element={<SkillsPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="feedback" element={<FeedbackPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer position="bottom-right" autoClose={1500} />
      </Content>
      {!location.pathname.startsWith('/user') && <AppFooter />}
    </Layout>
  );
}

export default App;
