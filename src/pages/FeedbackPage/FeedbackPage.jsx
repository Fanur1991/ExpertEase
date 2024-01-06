import React from 'react';
import { Form, Typography } from 'antd';

const { Title, Text } = Typography;

const FeedbackPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Form className="skillspage" layout="vertical">
        <Form.Item className="skillspage__form-item">
          <Title level={3} className="skills__title">
            Feedback
          </Title>
          <Text type="secondary">
            Этот раздел посвящен обратной связи с разработчиком для отправки
            предложений/замечаний
          </Text>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FeedbackPage;
