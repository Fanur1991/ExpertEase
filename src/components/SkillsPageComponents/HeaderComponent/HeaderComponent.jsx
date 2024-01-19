import React from 'react';
import { Form, Typography } from 'antd';

const { Title, Text } = Typography;

const HeaderComponent = ({ currentStack }) => (
  <Form.Item className="skillspage__form-item">
    <Title level={3} className="skills__title">
      {currentStack ? currentStack.name : 'Загрузка...'}
    </Title>
    <Text type="secondary">
      {currentStack ? currentStack.desc : 'Загрузка...'}
    </Text>
  </Form.Item>
);

export default HeaderComponent;
