import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Typography, Flex } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { checkIsAuth, registerUser } from '../../redux/slices/authSlice';
import { useTranslation } from 'react-i18next';
import './RegisterPage.less';

const { Title, Text } = Typography;

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  const handleSubmit = () => {
    try {
      dispatch(registerUser({ email, password }));
      setPassword('');
      setEmail('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex justify="center" align="center">
      <Form
        name="register"
        className="register-form"
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.Item className="register-title">
          <Title level={2}>{t('signup')}</Title>
          <Text type="secondary">{t('registerPageDescription')}</Text>
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
          <Flex justify="space-around">
            <Button shape="round" type="primary" htmlType="submit">
              {t('signup')}
            </Button>
            <Link to="/login">
              <Button type="link">{t('alreadyHaveAccount')}</Button>
            </Link>
          </Flex>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default RegisterPage;
