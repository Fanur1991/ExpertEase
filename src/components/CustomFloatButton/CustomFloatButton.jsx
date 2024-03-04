import React from 'react';
import { FloatButton, ConfigProvider } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import './CustomFloatButton.less';

const CustomFloatButton = (props) => {
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
      <FloatButton.BackTop
        className="custom-float-button"
        visibilityHeight={300}
        type="primary"
        icon={<UpOutlined />}
      />
    </ConfigProvider>
  );
};

export default CustomFloatButton;
