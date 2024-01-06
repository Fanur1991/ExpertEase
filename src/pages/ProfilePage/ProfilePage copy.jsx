import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Avatar, message, Upload, Space } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
  selectUserData,
  updateProfile,
  updateAvatarProfile,
  deleteAvatarProfile,
  fetchProfile,
} from '../../redux/slices/userDataSlice';
import { selectAuth } from '../../redux/slices/authSlice';
import { API_URL as baseUrl } from '../../config';

const getBase64 = (img, callback, errorCallback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.addEventListener('error', (error) => errorCallback(error));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('Вы можете загрузить фотографию только в формате JPG/PNG!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Фотография должна бытть меньше, чем 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [firstname, setFirstname] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const userData = useSelector(selectUserData);
  const userAuth = useSelector(selectAuth);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  console.log(useSelector(selectUserData), 'userDataslice');
  console.log(useSelector(selectAuth), 'authSlice');
  // console.log(imageUrl);

  useEffect(() => {
    form.setFieldsValue({
      email: userAuth.user.email,
    });
  }, [form, userAuth]);

  useEffect(() => {
    if (userData.user) {
      form.setFieldsValue(userData.user);
    } else {
      dispatch(fetchProfile(userAuth.user._id));
    }
  }, [userData, form]);

  // useEffect(() => {
  //   if (!userData.user && userAuth.user._id) {
  //     dispatch(fetchProfile(userAuth.user._id));
  //   }
  // }, [dispatch, userAuth.user._id, userData.user]);

  // useEffect(() => {
  //   if (userData.user && userData.user.avatarUrl) {
  //     setImageUrl(userData.user.avatarUrl);
  //   }
  // }, [userData.user]);

  useEffect(() => {
    // Если данные пользователя еще не загружены, загружаем их
    if (!userData.user && userAuth.user._id) {
      dispatch(fetchProfile(userAuth.user._id));
    }

    // Обновляем imageUrl, когда данные пользователя загружены или изменены
    if (userData.user && userData.user.avatarUrl) {
      setImageUrl(userData.user.avatarUrl);
    }
  }, [dispatch, userAuth.user._id, userData.user]);

  const onFinish = (formData) => {
    const { email, ...updateData } = formData;
    dispatch(updateProfile(updateData));
    message.success('Профиль успешно обновлен');
  };

  const handleCancel = () => {
    setSelectedImage(null);
    setImageUrl(userData.user.avatarUrl);
    setIsImageSelected(false);
  };

  const handleUpload = () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('avatarUrl', selectedImage);
      formData.append('userId', userAuth.user._id);
      // Обновление URL в сторе или локальном состоянии
      // setImageUrl(result.url);
      dispatch(updateAvatarProfile(formData)).then((result) => {
        if (updateAvatarProfile.fulfilled.match(result)) {
          message.success('Фотография успешно загружена');
          setIsImageSelected(false);
          // Дополнительно: обновить URL в сторе или локальном состоянии, если это необходимо
        } else {
          message.error('Ошибка при загрузке фотографии');
        }
      });
    } else {
      message.error('Файл для загрузки не выбран');
    }
  };

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
          console.error('Ошибка в getBase64:', error);
          setLoading(false);
          message.error('Ошибка при конвертации файла.');
          setSelectedImage(null);
        }
      );
    }
    if (info.file.status === 'error') {
      console.error('Error during file upload:', info.file.error);
      setLoading(false);
      message.error('Ошибка загрузки файла.');
      setSelectedImage(null);
    }
  };

  const handleDeleteAvatar = () => {
    dispatch(deleteAvatarProfile()).then((result) => {
      if (deleteAvatarProfile.fulfilled.match(result)) {
        setImageUrl(null); // Обнуляем изображение
        message.success('Фотография успешно удалена');
      } else {
        message.error('Ошибка при удалении аватара');
      }
    });
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

  const avatarContainerStyle = {
    position: 'relative',
    display: 'inline-block',
    borderRadius: '50%',
    width: 100,
    height: 100,
    overflow: 'visible',
  };

  const uploadButtonStyle = {
    position: 'absolute',
    bottom: 0,
    right: 3,
    padding: '6px',
    borderRadius: '50%',
    backgroundColor: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px dashed #2f54eb',
  };

  const uploadButton = (
    <div style={uploadButtonStyle}>
      {loading ? (
        <LoadingOutlined />
      ) : (
        <PlusOutlined style={{ color: '#2f54eb' }} />
      )}
    </div>
  );

  const dummyRequest = ({ file, onSuccess }) => {
    // Эмулируем успешную загрузку файла
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  return (
    <Form
      name="personalDetails"
      form={form}
      onFinish={onFinish}
      layout="vertical"
      initialValues={{ remember: true }}
      size="middle"
      style={{ maxWidth: '500px' }}
    >
      <Form.Item>
        <Title level={3} style={{ fontFamily: 'Poppins, sans-serif' }}>Данные профиля</Title>
      </Form.Item>

      <Form.Item
        name="avatarUrl"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <div style={avatarContainerStyle}>
          <Upload
            name="avatarUrl"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            action="http://localhost:3002/api/auth/upload"
            beforeUpload={beforeUpload}
            customRequest={dummyRequest}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={
                  imageUrl.startsWith('uploads')
                    ? `${baseUrl}${imageUrl}`
                    : imageUrl
                }
                alt="avatar"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                }}
              />
            ) : (
              <Avatar
                alt="avatar"
                style={{
                  background: '#B37FEB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                }}
              >
                <span
                  style={{
                    fontSize: '60px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {firstname[0]?.toLocaleUpperCase() || 'А'}
                </span>
              </Avatar>
            )}
            {uploadButton}
          </Upload>
          {isImageSelected && (
            <Space size="large">
              <Button size="small" danger onClick={handleCancel}>
                Отменить
              </Button>
              <Button size="small" type="primary" onClick={handleUpload}>
                Загрузить
              </Button>
            </Space>
          )}
          <Button
            onClick={handleDeleteAvatar}
            danger
            size="small"
            type="primary"
            htmlType="button"
          >
            Удалить фото
          </Button>
        </div>
      </Form.Item>

      <Form.Item
        label="Имя"
        name="firstname"
        rules={[
          { required: false, message: 'Пожалуйста, введите ваше имя!', min: 2 },
        ]}
      >
        <Input
          placeholder="Иван"
          onChange={(e) => setFirstname(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Фамилия"
        name="surname"
        rules={[
          {
            required: false,
            message: 'Пожалуйста, введите вашу фамилию!',
            min: 2,
          },
        ]}
      >
        <Input placeholder="Иванов" />
      </Form.Item>

      <Form.Item label="Электронная почта" name="email">
        <Input disabled type="email" />
      </Form.Item>

      <Form.Item
        label="Github"
        name="githubUrl"
        rules={[
          {
            type: 'url',
            message: 'Ваша ссылка не является URL адресом',
          },
          {
            required: false,
          },
        ]}
      >
        <Input placeholder="https://github.com/username" />
      </Form.Item>

      <Form.Item
        label="LinkedIn"
        name="linkedinUrl"
        rules={[
          {
            type: 'url',
            message: 'Ваша ссылка не является URL адресом',
          },
          {
            required: false,
          },
        ]}
      >
        <Input placeholder="https://www.linkedin.com/in/username" />
      </Form.Item>

      <Form.Item
        label="Website"
        name="websiteUrl"
        rules={[
          {
            type: 'url',
            message: 'Ваша ссылка не является URL адресом',
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
          Подтвердить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfilePage;
