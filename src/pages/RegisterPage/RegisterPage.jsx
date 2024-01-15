import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Typography, Flex } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { checkIsAuth, registerUser } from '../../redux/slices/authSlice';
import { useTranslation } from 'react-i18next';
import { openNotification } from '../../utils/openNotification';
// import { selectAuth } from '../../redux/slices/authSlice';

import './RegisterPage.less';

const { Title, Text } = Typography;

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth);
  // const userAuth = useSelector(authSlice)
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
      const actionResult = await dispatch(registerUser({ email, password }));
      if (registerUser.fulfilled.match(actionResult)) {
        setPassword('');
        setEmail('');
        navigate('/');
      } else if (registerUser.rejected.match(actionResult)) {
        const errorMessage = actionResult.payload;
        openNotification('error', 'Error', errorMessage);
      }
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
            type="password"
            placeholder={t('password')}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Flex align="center" justify="space-evenly">
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
