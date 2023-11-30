import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Checkbox, Form, Input, Typography, Space } from 'antd';
import { checkIsAuth, registerUser } from '../../redux/slices/authSlice';

const { Title } = Typography;

const RegisterPage = () => {
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
      dispatch(registerUser({ username, password }));
      setPassword('');
      setUsername('');
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
          Регистрация
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
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Space size={'middle'}>
          <Button onClick={handleSubmit} type="primary" htmlType="submit">
            Подтвердить
          </Button>
          <Link to="/login">
            <Button type="link">Уже зарегистрированы?</Button>
          </Link>
        </Space>
      </Form.Item>
    </Form>

    // <form onSubmit={(e) => e.preventDefault()}>
    //   <h1>Регистрация</h1>
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
    //       Подтвердить
    //     </button>
    //     <Link to="/login">Уже зарегистрированы?</Link>
    //   </div>
    // </form>
  );
};

export default RegisterPage;
