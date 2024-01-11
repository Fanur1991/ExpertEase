import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form,
  Input,
  Button,
  Avatar,
  Upload,
  Space,
  Typography,
  Tooltip,
} from 'antd';
import {
  LoadingOutlined,
  PlusOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import {
  selectUserData,
  updateProfile,
  updateAvatarProfile,
  deleteAvatarProfile,
  fetchProfile,
} from '../../redux/slices/userDataSlice';
import { selectAuth } from '../../redux/slices/authSlice';
import { API_URL as baseUrl } from '../../config';
import { getBase64, beforeUpload } from '../../utils/utils';
import { openMessage } from '../../utils/openMessage';
import { useTranslation } from 'react-i18next';
import './ProfilePage.less';

const { Title, Text } = Typography;

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [firstname, setFirstname] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const userData = useSelector(selectUserData);
  const userAuth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { t } = useTranslation();

  // console.log(useSelector(selectUserData), 'userDataslice');
  // console.log(useSelector(selectAuth), 'authSlice');

  useEffect(() => {
    form.setFieldsValue({
      email: userAuth.user.email,
    });
  }, [form, userAuth]);

  // useEffect(() => {
  //   if (userData.user) {
  //     form.setFieldsValue(userData.user);
  //   } else {
  //     dispatch(fetchProfile(userAuth.user._id));
  //   }
  // }, [userData, form]);

  // useEffect(() => {
  //   // Если данные пользователя еще не загружены, загружаем их
  //   if (!userData.user && userAuth.user._id) {
  //     dispatch(fetchProfile(userAuth.user._id));
  //   }

  //   // Обновляем imageUrl, когда данные пользователя загружены или изменены
  //   if (userData.user && userData.user.avatarUrl) {
  //     setImageUrl(userData.user.avatarUrl);
  //   }
  // }, [dispatch, userAuth.user._id, userData.user]);

  useEffect(() => {
    if (!userData.user && userAuth.user._id) {
      dispatch(fetchProfile(userAuth.user._id));
    }

    if (userData.user) {
      form.setFieldsValue(userData.user);
      if (userData.user.avatarUrl) {
        setImageUrl(userData.user.avatarUrl);
      }
    }
  }, [userData, userAuth.user._id, dispatch, form]);

  const onFinish = (formData) => {
    const { email, ...updateData } = formData;
    dispatch(updateProfile(updateData)).then((result) => {
      if (updateProfile.fulfilled.match(result)) {
        openMessage('success', t('profilePageNotification1'));
      } else {
        openMessage('error', t('profilePageNotification2'));
      }
    });
  };

  // const handleCancel = () => {
  //   setSelectedImage(null);
  //   setImageUrl(userData.user.avatarUrl);
  //   setIsImageSelected(false);
  // };

  const handleCancel = useCallback(() => {
    setSelectedImage(null);
    setImageUrl(userData.user.avatarUrl);
    setIsImageSelected(false);
  }, [userData.user?.avatarUrl]);

  // const handleUpload = () => {
  //   if (selectedImage) {
  //     const formData = new FormData();
  //     formData.append('avatarUrl', selectedImage);
  //     formData.append('userId', userAuth.user._id);

  //     dispatch(updateAvatarProfile(formData)).then((result) => {
  //       if (updateAvatarProfile.fulfilled.match(result)) {
  //         message.success('Фотография успешно загружена');
  //         setIsImageSelected(false);
  //       } else {
  //         message.error('Ошибка при загрузке фотографии');
  //       }
  //     });
  //   } else {
  //     message.error('Файл для загрузки не выбран');
  //   }
  // };

  const handleUpload = useCallback(() => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('avatarUrl', selectedImage);
      formData.append('userId', userAuth.user._id);

      dispatch(updateAvatarProfile(formData)).then((result) => {
        if (updateAvatarProfile.fulfilled.match(result)) {
          openMessage('success', t('profilePageNotification3'));
          setIsImageSelected(false);
        } else {
          openMessage('error', t('profilePageNotification4'));
        }
      });
    } else {
      openMessage('error', t('profilePageNotification5'));
    }
  }, [selectedImage, userAuth.user?._id, dispatch]);

  // const handleDeleteAvatar = (event) => {
  //   event.stopPropagation();

  //   const existAvatarUrl = userData.user.avatarUrl;

  //   if (!existAvatarUrl) {
  //     return;
  //   }

  //   dispatch(deleteAvatarProfile()).then((result) => {
  //     if (deleteAvatarProfile.fulfilled.match(result)) {
  //       setImageUrl(null);
  //       message.success('Фотография успешно удалена');
  //     } else {
  //       message.error('Ошибка при удалении фотографии');
  //     }
  //   });
  // };

  const handleDeleteAvatar = useCallback(
    (event) => {
      event.stopPropagation();
      const existAvatarUrl = userData.user.avatarUrl;

      if (!existAvatarUrl) {
        return;
      }

      dispatch(deleteAvatarProfile()).then((result) => {
        if (deleteAvatarProfile.fulfilled.match(result)) {
          setImageUrl(null);
          openMessage('success', t('profilePageNotification6'));
        } else {
          openMessage('error', t('profilePageNotification7'));
        }
      });
    },
    [userData.user?.avatarUrl, dispatch]
  );

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      setSelectedImage(info.file.originFileObj);
      setIsImageSelected(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(
        info.file.originFileObj,
        (imageUrl) => {
          setLoading(false);
          setImageUrl(imageUrl);
          setSelectedImage(info.file.originFileObj);
        },
        (error) => {
          console.error('Error getBase64:', error);
          setLoading(false);
          openMessage('error', 'Error converting file');
          setSelectedImage(null);
        }
      );
    }
    if (info.file.status === 'error') {
      console.error('Error while downloading file:', info.file.error);
      setLoading(false);
      openMessage('error', t('profilePageNotification8'));
      setSelectedImage(null);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    if (e && e.file) {
      return [e.file];
    }
    return [];
  };

  // Эмулирую успешную загрузку файла
  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const uploadButton = (
    <div className="profilepage__avatar-upload">
      {loading ? (
        <LoadingOutlined />
      ) : (
        <Tooltip title={t('buttonUpload')} color="blue">
          <PlusOutlined />
        </Tooltip>
      )}
    </div>
  );

  const avatarCharacter = useMemo(() => {
    if (userData.user && userData.user.firstname) {
      return userData.user.firstname[0].toUpperCase();
    } else if (firstname && firstname.length > 0) {
      return firstname[0].toUpperCase();
    }
    return 'А';
  }, [userData.user?.firstname, firstname]);

  const renderAvatar = () => {
    if (imageUrl) {
      return (
        <img
          className="profilepage__avatar-image"
          src={
            imageUrl.startsWith('uploads') ? `${baseUrl}${imageUrl}` : imageUrl
          }
          alt="avatar"
        />
      );
    }
    return (
      <Avatar className="profilepage__avatar-blind" alt="avatar">
        <span className="profilepage__avatar-character">{avatarCharacter}</span>
      </Avatar>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <Form
        className="profilepage"
        name="personalDetails"
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ remember: true }}
        size="middle"
      >
        <Form.Item>
          <Title level={3} className="profilepage__title">
            {t('profilePageTitle')}
          </Title>
          <Text type="secondary">{t('profilePageDescription')}</Text>
        </Form.Item>

        <Form.Item
          name="avatarUrl"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <div className="profilepage__avatar-container">
            <Upload
              className="profilepage__avatar-uploader"
              name="avatarUrl"
              listType="picture-circle"
              showUploadList={false}
              action="http://localhost:3002/api/auth/upload"
              beforeUpload={beforeUpload}
              customRequest={dummyRequest}
              onChange={handleChange}
            >
              {renderAvatar()}
              {uploadButton}
              <div
                className="profilepage__avatar-delete"
                onClick={handleDeleteAvatar}
              >
                <Tooltip title={t('buttonDelete')} color="blue">
                  <CloseOutlined />
                </Tooltip>
              </div>
            </Upload>
            {isImageSelected && (
              <Space size="large">
                <Button size="small" danger onClick={handleCancel}>
                  {t('cancel')}
                </Button>

                <Button
                  autoFocus
                  size="small"
                  type="primary"
                  onClick={handleUpload}
                >
                  {t('upload')}
                </Button>
              </Space>
            )}
          </div>
        </Form.Item>

        <Form.Item
          hasFeedback
          label={t('firstname')}
          name="firstname"
          rules={[
            { required: false, message: 'Please enter your name!' },
            { min: 2, message: 'The name must contain at least 2 letters' },
          ]}
        >
          <Input
            placeholder={t('firstname')}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          hasFeedback
          label={t('surname')}
          name="surname"
          rules={[
            {
              required: false,
              message: 'Please enter your last name!',
            },
            { min: 2, message: 'Last name must contain at least 2 letters' },
          ]}
        >
          <Input placeholder={t('surname')} />
        </Form.Item>

        <Form.Item label={t('email')} name="email">
          <Input disabled type="email" />
        </Form.Item>

        <Form.Item
          hasFeedback
          label="Github"
          name="githubUrl"
          rules={[
            {
              type: 'url',
              message: 'Your link is not a URL',
            },
            {
              required: false,
            },
          ]}
        >
          <Input placeholder="https://github.com/username" />
        </Form.Item>

        <Form.Item
          hasFeedback
          label="LinkedIn"
          name="linkedinUrl"
          rules={[
            {
              type: 'url',
              message: 'Your link is not a URL',
            },
            {
              required: false,
            },
          ]}
        >
          <Input placeholder="https://www.linkedin.com/in/username" />
        </Form.Item>

        <Form.Item
          hasFeedback
          label={t('website')}
          name="websiteUrl"
          rules={[
            {
              type: 'url',
              message: 'Your link is not a URL',
            },
            {
              required: false,
            },
          ]}
        >
          <Input placeholder="https://example.com" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t('confirm')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfilePage;
