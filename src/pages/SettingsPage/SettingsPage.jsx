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
import { useTranslation } from 'react-i18next';
import './SettingsPage.less';

const { Title, Text } = Typography;

const SettingsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userAuth = useSelector(selectAuth);
  const [form] = Form.useForm();
  const { t } = useTranslation();

  // console.log(useSelector(selectUserData), 'userDataslice');
  // console.log(useSelector(selectAuth), 'authSlice');

  const onFinish = async (values) => {
    const { newPassword, confirmPassword } = values;

    if (newPassword !== confirmPassword) {
      openMessage('error', t('settingsPageNotification1'));
      return;
    }

    try {
      await dispatch(
        changePassword({ userId: userAuth.user._id, newPassword })
      ).unwrap();
      openMessage('success', t('settingsPageNotification2'));
      form.resetFields();
    } catch (error) {
      openMessage('error', error.message || t('settingsPageNotification3'));
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
        openMessage('success', t('settingsPageNotification4'));
        closeModal();
        navigate('/');
      } else {
        openMessage('error', t('settingsPageNotification5'));
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
            {t('settingsPageTitlte1')}
          </Title>
          <Text type="secondary">{t('settingsPageDescription1')}</Text>
        </Form.Item>

        <Form.Item
          hasFeedback
          label={t('newPassword')}
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
            placeholder={t('newPassword')}
          />
        </Form.Item>

        <Form.Item
          hasFeedback
          label={t('confirmPassword')}
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
            placeholder={t('confirmPassword')}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t('buttonUpdatePassword')}
          </Button>
        </Form.Item>
      </Form>
      <Form>
        <Form.Item>
          <Title level={3} className="settings__title">
            {t('settingsPageTitlte2')}
          </Title>
          <Text type="secondary">{t('settingsPageDescription2')}</Text>
        </Form.Item>

        <Form.Item>
          <Button type="primary" danger onClick={showModal}>
            {t('buttondeleteAccount')}
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
            okText={t('buttonDelete')}
            cancelText={t('cancel')}
          >
            <Title level={3}>{t('settingsPageTitlte3')}</Title>
            <Text>{t('settingsPageDescription3')}</Text>
          </Modal>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SettingsPage;
