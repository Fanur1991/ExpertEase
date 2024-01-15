import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Typography, Card, Flex, List, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { selectStacks } from '../../redux/slices/stacksSlice';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';

import './MySkillsPage.less';

const { Title, Text } = Typography;

const MySkillsPage = () => {
  const stacks = useSelector(selectStacks);
  const { t } = useTranslation();
  const navigate = useNavigate();

  return stacks.isLoading ? (
    <Flex justify="center" align="center">
      <Title level={5} style={{ color: '#8c8c8c' }}>
        Loading <Spin />
      </Title>
    </Flex>
  ) : (
    <div style={{ padding: '20px' }}>
      <Form className="myskillspage" layout="vertical">
        <Form.Item className="myskillspage__form-item">
          <Title level={3} className="myskillspage__title">
            {t('myskillsPageTitle')}
          </Title>
          <Text type="secondary">{t('myskillsPageDescription')}</Text>
        </Form.Item>
        <Form.Item>
          <List
            className="myskillspage__list"
            size="middle"
            grid={{
              gutter: [8, 8],
              xs: 1,
              sm: 1,
              md: 1,
              lg: 2,
              xl: 2,
              xxl: 2,
            }}
            itemLayout="horizontal"
            dataSource={stacks.data}
            renderItem={(item) => (
              <List.Item className="myskillspage__list-item">
                <Card
                  className="myskillspage__card"
                  onClick={() => navigate(`/user/skills/${item.url}`)}
                  title={item.name}
                  hoverable
                  bordered={true}
                  headStyle={{
                    padding: '15px',
                  }}
                  bodyStyle={{
                    overflow: 'hidden',
                    padding: '15px',
                  }}
                >
                  <Text type="secondary">{item.desc}</Text>
                </Card>
              </List.Item>
            )}
          />
        </Form.Item>
      </Form>
      <ScrollToTop />
    </div>
  );
};

export default MySkillsPage;
