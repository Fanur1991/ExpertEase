import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, Button, ConfigProvider, Flex } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import engFlag from '../../img/langIcons/9061056_uk_great britain_united kingdom_english_flag_icon.svg';
import rusFlag from '../../img/langIcons/9061064_russia_russian_flag_country_square_icon.svg';
import espFlag from '../../img/langIcons/9061051_spain_spanish_flag_country_square_icon.svg';

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
      label: (
        <Flex align="center" justify="start" gap="small">
          <img className="languageswitcher__image" src={engFlag} alt="flag" />
          <span>English</span>
        </Flex>
      ),
      style: currentLang === 'en' ? { color: '#595959' } : { color: '#262626' },
      onClick: () => changeLanguage('en'),
    },
    {
      key: 'ru',
      label: (
        <Flex align="center" justify="start" gap="small">
          <img className="languageswitcher__image" src={rusFlag} alt="flag" />
          <span>Русский</span>
        </Flex>
      ),
      style: currentLang === 'ru' ? { color: '#595959' } : { color: '#262626' },
      onClick: () => changeLanguage('ru'),
    },
    {
      key: 'es',
      label: (
        <Flex align="center" justify="start" gap="small">
          <img className="languageswitcher__image" src={espFlag} alt="flag" />
          <span>Español</span>
        </Flex>
      ),
      style: currentLang === 'es' ? { color: '#595959' } : { color: '#262626' },
      onClick: () => changeLanguage('es'),
    },
  ];
  return (
    <ConfigProvider>
      <Dropdown
        className="languageswitcher"
        menu={{ items, selectable: true, selectedKeys: [selectedKey] }}
        trigger={['click']}
        placement="bottom"
        arrow
      >
        <Button
          className="languageswitcher__button"
          shape="round"
          icon={<GlobalOutlined />}
          onClick={(e) => e.preventDefault()}
        >
          {shortLngName}
        </Button>
      </Dropdown>
    </ConfigProvider>
  );
};

export default LanguageSwitcher;
