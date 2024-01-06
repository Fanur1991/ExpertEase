import React, { useState } from 'react';
import { Dropdown, Button } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import './LanguageSwitcher.less';

const LanguageSwitcher = () => {
  const [shortLangName, setShortLangName] = useState('EN');

  const items = [
    { key: 'en', label: 'English', style: { color: '#ffffff' } },
    { key: 'ru', label: 'Русский', style: { color: '#ffffff' } },
    { key: 'es', label: 'Español', style: { color: '#ffffff' } },
  ];
  return (
    <Dropdown
      menu={{ items, defaultSelectedKeys: ['1'] }}
      trigger={['hover']}
      placement="bottom"
    >
      <a onClick={(e) => e.preventDefault()}>
        <Button
          className="languageswitcher__button"
          shape="round"
          icon={<GlobalOutlined />}
        >
          {shortLangName}
        </Button>
      </a>
    </Dropdown>
  );
};

export default LanguageSwitcher;
