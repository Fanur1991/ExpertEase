import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, message, Modal } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import {
  changePassword,
  deleteUserAccount,
} from '../../redux/slices/userDataSlice';
import { selectAuth } from '../../redux/slices/authSlice';
import './SettingsPage.less';

const { Title, Text } = Typography;

const SettingsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userAuth = useSelector(selectAuth);
  const [form] = Form.useForm();

  // console.log(useSelector(selectUserData), 'userDataslice');
  // console.log(useSelector(selectAuth), 'authSlice');

  const onFinish = async (values) => {
    const { newPassword, confirmPassword } = values;

    if (newPassword !== confirmPassword) {
      message.error('Пароли не совпадают!');
      return;
    }

    try {
      await dispatch(
        changePassword({ userId: userAuth.user._id, newPassword })
      ).unwrap();
      message.success('Пароль успешно изменен');
      form.resetFields();
    } catch (error) {
      message.error(error.message || 'Ошибка при изменении пароля');
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteAccount = () => {
    dispatch(deleteUserAccount(userAuth.user._id)).then((result) => {
      if (deleteUserAccount.fulfilled.match(result)) {
        message.success('Аккаунт удален');
        closeModal();
        navigate('/');
      } else {
        message.error('Ошибка при удалении аккаунта');
      }
    });
  };

  return (
    <>
      <Form
        className="settingspage"
        name="settings"
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ remember: true }}
        size="middle"
      >
        <Form.Item>
          <Title level={3} className="settingspage__title">
            Пароль
          </Title>
          <Text type="secondary">Здесь вы можете изменить свой пароль</Text>
        </Form.Item>

        <Form.Item
          hasFeedback
          label="Новый пароль"
          name="newPassword"
          rules={[
            {
              required: false,
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
            placeholder="Новый пароль"
          />
        </Form.Item>

        <Form.Item
          hasFeedback
          label="Подтвердить новый пароль"
          name="confirmPassword"
          rules={[
            {
              required: false,
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
            placeholder="Подтвердить новый пароль"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Изменить пароль
          </Button>
        </Form.Item>
      </Form>
      <Form>
        <Form.Item>
          <Title level={3} className="settings__title">
            Удаление аккаунта
          </Title>
          <Text type="secondary">
            Здесь вы можете удалить свой аккаунт навсегда
          </Text>
        </Form.Item>

        <Form.Item>
          <Button type="primary" danger onClick={showModal}>
            Удалить аккаунт
          </Button>
          <Modal
            open={isModalOpen}
            onOk={handleDeleteAccount}
            onCancel={closeModal}
            okButtonProps={{
              type: 'primary',
              danger: true,
            }}
            centered
            okText="Delete"
            cancelText="Cancel"
          >
            <Title level={3}>Удаление аккаунта</Title>
            <Text>Вы уверены, что хотите удалить свой аккаунт?</Text>
          </Modal>
        </Form.Item>
      </Form>
    </>
  );
};

export default SettingsPage;
