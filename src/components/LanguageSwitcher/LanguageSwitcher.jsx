import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, Button, ConfigProvider } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import './LanguageSwitcher.less';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = localStorage.getItem('lang') || 'en';
  const [shortLngName, setShortLngName] = useState(currentLang.toUpperCase());
  const [selectedKey, setSelectedKey] = useState(currentLang);

  useEffect(() => {
    setSelectedKey(currentLang);
  }, [selectedKey]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
    setShortLngName(lng.toUpperCase());
    setSelectedKey(lng);
  };

  const items = [
    {
      key: 'en',
      label: 'English',
      style: currentLang === 'en' ? { color: '#595959' } : { color: '#ffffff' },
      onClick: () => changeLanguage('en'),
    },
    {
      key: 'ru',
      label: 'Русский',
      style: currentLang === 'ru' ? { color: '#595959' } : { color: '#ffffff' },
      onClick: () => changeLanguage('ru'),
    },
    {
      key: 'es',
      label: 'Español',
      style: currentLang === 'es' ? { color: '#595959' } : { color: '#ffffff' },
      onClick: () => changeLanguage('es'),
    },
  ];
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgElevated: '#EA25B5',
          controlItemBgHover: '#ff82f4',
        },
        components: {
          Dropdown: {
            colorBgElevated: '#EA25B5',
            controlItemBgHover: '#ff82f4',
          },
        },
      }}
    >
      <Dropdown
        menu={{ items, selectable: true, selectedKeys: [selectedKey] }}
        trigger={['hover']}
        placement="bottom"
        arrow
      >
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
