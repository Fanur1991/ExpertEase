import React, { useState } from 'react';
import { Flex, Tag, Rate, Typography, ConfigProvider, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import './CustomRate.less';

const { Text } = Typography;

const CustomRate = () => {
  const [value, setValue] = useState(0);
  const { t } = useTranslation();

  const descriptions = [
    t('notSelected'),
    t('iDontKnow'),
    t('iKnowTheory'),
    t('iApplyIt'),
    t('professional'),
  ];

  const handleChange = (value) => {
    setValue(value);
  };

  return (
    <div className="customRate" style={{ minWidth: '205px' }}>
      <Flex align="center" justify="end" gap="middle" vertical>
        <Rate
          onChange={handleChange}
          value={value}
          tooltips={descriptions.slice(1)}
          count={4}
        />
        <Text style={{ width: '100%', textAlign: 'center', fontWeight: 400 }}>
          {t('myLevel')}:{' '}
          <span style={{ fontWeight: 700 }}>{descriptions[value]}</span>
        </Text>
      </Flex>
    </div>
  );
};

export default CustomRate;
