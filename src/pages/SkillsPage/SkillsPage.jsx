import React from 'react';
import { Form, Typography, Card, Flex } from 'antd';

const { Title, Text } = Typography;

const SkillsPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Form className="skillspage" layout="vertical">
        <Form.Item className="skillspage__form-item">
          <Title level={3} className="skills__title">
            Skills
          </Title>
          <Text type="secondary">
            Choose your field of programming expertise, evaluate your skills
            accordingly, and create a detailed report to share with employers
          </Text>
        </Form.Item>
        <Form.Item>
          <Flex wrap="wrap" justify="space-evenly" gap="middle">
            <Card
              title="Card title"
              hoverable
              bordered={true}
              style={{
                minWidth: 400,
              }}
              bodyStyle={{
                overflow: 'hidden',
              }}
            >
              <p>Card content</p>
            </Card>
          </Flex>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SkillsPage;
