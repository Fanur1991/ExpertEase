import { message } from 'antd';

export const openMessage = (type, msg) => {
  message[type](msg);
};
