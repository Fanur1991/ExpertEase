import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, loginUser } from '../../redux/slices/authSlice';
import { Button, Checkbox, Form, Input, Typography, Flex } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { openNotification } from '../../utils/openNotification';

import './LoginPage.less';

const { Title, Text } = Typography;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  const handleSubmit = async () => {
    try {
      const actionResult = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(actionResult)) {
        setPassword('');
        setEmail('');
        navigate('/');
      } else if (loginUser.rejected.match(actionResult)) {
        const errorMessage = actionResult.payload;
        openNotification.error(
          'error',
          'Error',
          errorMessage || 'Error description'
        );
      }
    } catch (error) {
      console.error('Ошибка входа:', error);
    }
  };

  return (
    <Flex justify="center" align="center">
      <Form
        name="login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.Item className="login-title">
          <Title level={2}>{t('login')}</Title>
          <Text type="secondary">{t('loginPageDescription')}</Text>
        </Form.Item>
        <Form.Item
          hasFeedback
          name="email"
          rules={[
            {
              required: true,
              message: t('registerPageNotifacation1'),
            },
            {
              type: 'email',
              message: t('registerPageNotifacation2'),
            },
          ]}
        >
          <Input
            autoFocus
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder={t('email')}
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="password"
          rules={[
            {
              required: true,
              message: t('registerPageNotifacation3'),
            },
            {
              min: 5,
              message: t('registerPageNotifacation4'),
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder={t('password')}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Flex align="center" justify="space-evenly">
            <Checkbox name="remember">{t('rememberMe')}</Checkbox>
            <Link to="" className="login-form-forgot">
              {t('forgotPassword')}
            </Link>
          </Flex>
        </Form.Item>
        <Form.Item>
          <Flex align="center" justify="space-evenly">
            <Button shape="round" type="primary" htmlType="submit">
              {t('login')}
            </Button>
            <Link to="/register">
              <Button type="link">{t('dontHaveAccount')}</Button>
            </Link>
          </Flex>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default LoginPage;
