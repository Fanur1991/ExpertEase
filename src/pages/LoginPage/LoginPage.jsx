import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, loginUser } from '../../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { Button, Checkbox, Form, Input, Typography, Space } from 'antd';

const { Title } = Typography;

const LoginPage = () => {
  const [username, setUsername] = useState('');
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
      dispatch(loginUser({ username, password }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
        margin: 'auto',
        marginTop: '100px',
      }}
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
      onSubmit={(e) => e.preventDefault()}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Title level={2} type="success">
          Авторизация
        </Title>
      </div>
      <Form.Item
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Запомнить меня</Checkbox>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Space size={'middle'}>
          <Button onClick={handleSubmit} type="primary" htmlType="submit">
            Войти
          </Button>
          <Link to="/register">
            <Button type="link">Нет аккаунта?</Button>
          </Link>
        </Space>
      </Form.Item>
    </Form>
    // <form onSubmit={(e) => e.preventDefault()}>
    //   <h1>Авторизация</h1>
    //   <label>
    //     Username:
    //     <input
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
    //       type="text"
    //       placeholder="Username"
    //     />
    //   </label>
    //   <label>
    //     Password:
    //     <input
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       type="password"
    //       placeholder="Password"
    //     />
    //   </label>
    //   <div>
    //     <button onClick={handleSubmit} type="submit">
    //       Войти
    //     </button>
    //     <Link to="/register">Нет аккаунта?</Link>
    //   </div>
    // </form>
  );
};

export default LoginPage;
