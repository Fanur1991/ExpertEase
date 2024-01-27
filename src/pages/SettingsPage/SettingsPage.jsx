import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Typography, Modal, ConfigProvider } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import {
  changePassword,
  deleteUserAccount,
} from '../../redux/slices/userDataSlice';
import { selectAuth } from '../../redux/slices/authSlice';
import { openMessage } from '../../utils/openMessage';
import { useTranslation } from 'react-i18next';
import './SettingsPage.less';
import CustomButton from '../../components/CustomButton/CustomButton';

const { Title, Text } = Typography;

const SettingsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userAuth = useSelector(selectAuth);
  const [form] = Form.useForm();
  const { t } = useTranslation();

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
    <div className="settingspage">
      <Form
        className="settingspage__form"
        name="settings"
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ remember: true }}
        size="middle"
      >
        <Form.Item className="settingspage__form-item">
          <Title className="settingspage__title">
            {t('settingsPageTitlte1')}
          </Title>
          <Text className="settingspage__subtitle" type="secondary">
            {t('settingsPageDescription1')}
          </Text>
        </Form.Item>

        <Form.Item
          className="settingspage__form-item"
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
          className="settingspage__form-item"
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

        <Form.Item className="settingspage__form-item">
          <CustomButton
            type="primary"
            htmlType="submit"
            children={t('buttonUpdatePassword')}
          />
        </Form.Item>
      </Form>
      <Form className="settingspage__form">
        <Form.Item className="settingspage__form-item">
          <Title className="settingspage__title">
            {t('settingsPageTitlte2')}
          </Title>
          <Text className="settingspage__subtitle" type="secondary">
            {t('settingsPageDescription2')}
          </Text>
        </Form.Item>

        <Form.Item className="settingspage__form-item">
          <CustomButton
            danger
            type="primary"
            onClick={showModal}
            children={t('buttondeleteAccount')}
          />
          <ConfigProvider
            theme={{
              components: {
                Modal: {
                  colorBgElevated: '#ffffff',
                },
                Button: {
                  colorPrimary: '#04bbec',
                  colorPrimaryHover: '#04bbec',
                },
              },
            }}
          >
            <Modal
              className="settingspage__modal"
              open={isModalOpen}
              onOk={handleDeleteAccount}
              onCancel={closeModal}
              okButtonProps={{
                type: 'primary',
                danger: true,
              }}
              cancelButtonProps={{
                type: 'primary',
              }}
              centered
              okText={t('buttonDelete')}
              cancelText={t('cancel')}
            >
              <Title className="settingspage__modal-title">
                {t('settingsPageTitlte3')}
              </Title>
              <Text className="settingspage__modal-subtitle">
                {t('settingsPageDescription3')}
              </Text>
            </Modal>
          </ConfigProvider>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SettingsPage;
