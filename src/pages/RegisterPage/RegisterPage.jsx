import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Form, Input, Typography, Flex } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { checkIsAuth, registerUser } from '../../redux/slices/authSlice';
import './RegisterPage.less';

const { Title, Text } = Typography;

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          <Title level={1}>Sign Up</Title>
          <Text type="secondary">
            Create your account to build a rating of your skills for HR.
          </Text>
        </Form.Item>
        <Form.Item
          hasFeedback
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите ваш email!',
            },
            {
              type: 'email',
              message: 'Введен некорректный email!',
            },
          ]}
        >
          <Input
            autoFocus
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
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
              message: 'Пожалуйста введите ваш пароль!',
            },
            {
              min: 5,
              message: 'Пароль должен содержать минимум 5 символов',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-around">
            <Button shape="round" type="primary" htmlType="submit">
              Sign up
            </Button>
            <Link to="/login">
              <Button type="link">Already have an account?</Button>
            </Link>
          </Flex>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default RegisterPage;
