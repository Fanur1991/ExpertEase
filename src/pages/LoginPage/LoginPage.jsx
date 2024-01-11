import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, loginUser } from '../../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { Button, Checkbox, Form, Input, Typography, Flex } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
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
    if (status) {
      toast(status);
    }
    if (isAuth) {
      navigate('/');
    }
  }, [status, isAuth, navigate]);

  const handleSubmit = () => {
    try {
      dispatch(loginUser({ email, password }));
      setPassword('');
      setEmail('');
    } catch (error) {
      console.log(error);
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          />
        </Form.Item>
        <Form.Item
          hasFeedback
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
            type="password"
            placeholder={t('password')}
            autoComplete="current-password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>{t('rememberMe')}</Checkbox>
          </Form.Item>
          <a className="login-form-forgot" href="">
            {t('forgotPassword')}
          </a>
        </Form.Item>
        <Form.Item>
          <Flex justify="space-around">
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
