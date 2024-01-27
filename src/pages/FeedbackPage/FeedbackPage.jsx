import React from 'react';
import { Form, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import './FeedbackPage.less';

const { Title, Text } = Typography;

const FeedbackPage = () => {
  const { t } = useTranslation();

  return (
    <div className="feedbackpage">
      <Form className="feedbackpage__form" layout="vertical">
        <Form.Item className="feedbackpage__form-item">
          <Title className="feedbackpage__title">
            {t('feedbackPageTitle')}
          </Title>
          <Text className="feedbackpage__subtitle" type="secondary">
            {t('feedbackPageDescription')}
          </Text>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FeedbackPage;
