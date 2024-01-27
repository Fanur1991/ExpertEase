import { Routes, Route, useLocation } from 'react-router-dom';
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
import MySkillsPage from './pages/MySkillsPage/MySkillsPage';
import SkillsPage from './pages/MySkillsPage/SkillsPage/SkillsPage';
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
                <PageTitle title="Home" />
                <MainPage />
              </>
            }
          />
          {/* <Route path="stacks" element={<>
                <PageTitle title="Стеки" /><StacksPage /></>} /> */}
          <Route
            path="stacks/:url"
            element={
              <>
                <PageTitle title="Stacks" />
                <StackPage />
              </>
            }
          />
          <Route
            path="register"
            element={
              <>
                <PageTitle title="SignUp" />
                <RegisterPage />
              </>
            }
          />
          <Route
            path="login"
            element={
              <>
                <PageTitle title="Login" />
                <LoginPage />
              </>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <PageTitle title="Account" />
                <UserPage />
              </ProtectedRoute>
            }
          >
            <Route
              path="skills"
              element={
                <>
                  <PageTitle title="My Skills" />
                  <MySkillsPage />
                </>
              }
            >
              <Route
                path=":url"
                element={
                  <>
                    <PageTitle title="Skills" />
                    <SkillsPage />
                  </>
                }
              />
            </Route>
            <Route
              path="projects"
              element={
                <>
                  <PageTitle title="Projects" />
                  <ProjectsPage />
                </>
              }
            />
            <Route
              path="profile"
              element={
                <>
                  <PageTitle title="Profile" />
                  <ProfilePage />
                </>
              }
            />
            <Route
              path="settings"
              element={
                <>
                  <PageTitle title="Settings" />
                  <SettingsPage />
                </>
              }
            />
            <Route
              path="feedback"
              element={
                <>
                  <PageTitle title="Feedback" />
                  <FeedbackPage />
                </>
              }
            />
          </Route>
          <Route
            path="*"
            element={
              <>
                <PageTitle title="Not Found" />
                <NotFound />
              </>
            }
          />
        </Routes>
      </Content>
      {!location.pathname.startsWith('/user') && <AppFooter />}
    </Layout>
  );
}

export default App;
