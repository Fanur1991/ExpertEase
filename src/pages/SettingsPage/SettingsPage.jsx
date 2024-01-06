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
import { openMessage } from '../../utils/openMessage';
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
      openMessage('error', 'Password mismatch!');
      return;
    }

    try {
      await dispatch(
        changePassword({ userId: userAuth.user._id, newPassword })
      ).unwrap();
      openMessage('success', 'Password updated successfully');
      form.resetFields();
    } catch (error) {
      openMessage('error', error.message || 'Error while changing password');
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
        openMessage('success', 'Account deleted');
        closeModal();
        navigate('/');
      } else {
        openMessage('error', 'Error while deleting account');
      }
    });
  };

  return (
    <div style={{ padding: '20px' }}>
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
            Password
          </Title>
          <Text type="secondary">
            You can update your password in the form below
          </Text>
        </Form.Item>

        <Form.Item
          hasFeedback
          label="New Password"
          name="newPassword"
          rules={[
            {
              required: true,
              message: 'Please enter your password!',
            },
            {
              min: 5,
              message: 'Password must contain at least 5 characters',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="New Password"
          />
        </Form.Item>

        <Form.Item
          hasFeedback
          label="Confirm New Password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: 'Please enter your password!',
            },
            {
              min: 5,
              message: 'Password must contain at least 5 characters',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm New Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Password
          </Button>
        </Form.Item>
      </Form>
      <Form>
        <Form.Item>
          <Title level={3} className="settings__title">
            Delete Account
          </Title>
          <Text type="secondary">
            Here you can delete your account permanently
          </Text>
        </Form.Item>

        <Form.Item>
          <Button type="primary" danger onClick={showModal}>
            Delete Account
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
            <Title level={3}>Delete Account</Title>
            <Text>Are you sure you want to delete your account?</Text>
          </Modal>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SettingsPage;
