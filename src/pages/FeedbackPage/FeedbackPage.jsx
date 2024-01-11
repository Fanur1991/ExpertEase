import React from 'react';
import { Form, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

const FeedbackPage = () => {
  const { t } = useTranslation();

  return (
    <div style={{ padding: '20px' }}>
      <Form className="skillspage" layout="vertical">
        <Form.Item className="skillspage__form-item">
          <Title level={3} className="skills__title">
            {t('feedbackPageTitle')}
          </Title>
          <Text type="secondary">{t('feedbackPageDescription')}</Text>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FeedbackPage;
