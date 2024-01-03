import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import 'react-toastify/dist/ReactToastify.css';
import PageTitle from './components/PageTitle/PageTitle';
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
          <Route
            path="/"
            element={
              <>
                <PageTitle title="Главная" />
                <MainPage />
              </>
            }
          />
          {/* <Route path="stacks" element={<>
                <PageTitle title="Стеки" /><StacksPage /></>} /> */}
          <Route
            path="stacks/:id"
            element={
              <>
                <PageTitle title="Стек" />
                <StackPage />
              </>
            }
          />
          <Route
            path="register"
            element={
              <>
                <PageTitle title="Регистрация" />
                <RegisterPage />
              </>
            }
          />
          <Route
            path="login"
            element={
              <>
                <PageTitle title="Авторизация" />
                <LoginPage />
              </>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <PageTitle title="Аккаунт" />
                <UserPage />
              </ProtectedRoute>
            }
          >
            <Route
              path="skills"
              element={
                <>
                  <PageTitle title="Мои навыки" />
                  <SkillsPage />
                </>
              }
            />
            <Route
              path="projects"
              element={
                <>
                  <PageTitle title="Мои проекты" />
                  <ProjectsPage />
                </>
              }
            />
            <Route
              path="profile"
              element={
                <>
                  <PageTitle title="Мой профиль" />
                  <ProfilePage />
                </>
              }
            />
            <Route
              path="settings"
              element={
                <>
                  <PageTitle title="Настройки" />
                  <SettingsPage />
                </>
              }
            />
            <Route
              path="feedback"
              element={
                <>
                  <PageTitle title="Обратная связь" />
                  <FeedbackPage />
                </>
              }
            />
          </Route>
          <Route
            path="*"
            element={
              <>
                <PageTitle title="Страница не найдена" />
                <NotFound />
              </>
            }
          />
        </Routes>
        <ToastContainer position="bottom-right" autoClose={1500} />
      </Content>
      {!location.pathname.startsWith('/user') && <AppFooter />}
    </Layout>
  );
}

export default App;
