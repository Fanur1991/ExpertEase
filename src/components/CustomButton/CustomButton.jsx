import React from 'react';
import { Button, ConfigProvider } from 'antd';
import './CustomButton.less';

const CustomButton = (props) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#04bbec',
        },
        components: {
          Button: {
            colorPrimary: '#04bbec',
            defaultBg: '#ea25b5',
            defaultColor: '#ffffff',
            dangerColor: '#ffffff',
            colorLink: '#04bbec',
            colorLinkHover: '#04bbec',
          },
        },
      }}
    >
      <Button className="custom-button" {...props} />
    </ConfigProvider>
  );
};

export default CustomButton;
