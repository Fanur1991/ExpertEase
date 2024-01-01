import { message } from 'antd';

export const getBase64 = (img, callback, errorCallback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.addEventListener('error', (error) => errorCallback(error));
  reader.readAsDataURL(img);
};

export const beforeUpload = (file) => {
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
