import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, Button, ConfigProvider } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import './LanguageSwitcher.less';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = localStorage.getItem('lang') || 'en';
  const [shortLngName, setShortLngName] = useState(currentLang.toUpperCase());

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
    setShortLngName(lng.toUpperCase());
  };

  const items = [
    {
      key: 'en',
      label: 'English',
      style: { color: '#ffffff' },
      onClick: () => changeLanguage('en'),
    },
    {
      key: 'ru',
      label: 'Русский',
      style: { color: '#ffffff' },
      onClick: () => changeLanguage('ru'),
    },
    {
      key: 'es',
      label: 'Español',
      style: { color: '#ffffff' },
      onClick: () => changeLanguage('es'),
    },
  ];
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgElevated: '#b37feb',
          controlItemBgHover: '#d3adf7',
        },
        components: {
          Dropdown: {
            colorBgElevated: '#b37feb',
            controlItemBgHover: '#d3adf7',
          },
        },
      }}
    >
      <Dropdown menu={{ items }} trigger={['hover']} placement="bottom" arrow>
        <Button
          onClick={(e) => e.preventDefault()}
          className="languageswitcher__button"
          shape="round"
          icon={<GlobalOutlined />}
        >
          {shortLngName}
        </Button>
      </Dropdown>
    </ConfigProvider>
  );
};

export default LanguageSwitcher;
