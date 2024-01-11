import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  List,
  Space,
  Form,
  Typography,
  Skeleton,
  Switch,
  Dropdown,
  Button,
} from 'antd';
import {
  StarOutlined,
  UserOutlined,
  LikeOutlined,
  MessageOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { selectStacks } from '../../../redux/slices/stacksSlice';
import { selectCategories } from '../../../redux/slices/categoriesSlice';
import { selectSkills } from '../../../redux/slices/skillsSlice';
import { useTranslation } from 'react-i18next';
import StacksDownMenu from '../../../components/StacksDownMenu/StacksDownMenu';

import './SkillsPage.less';

const { Title, Text } = Typography;

const SkillPage = () => {
  const { url } = useParams();
  const stacks = useSelector(selectStacks);
  const categories = useSelector(selectCategories);
  const skills = useSelector(selectSkills);
  const [currentStack, setCurrentStack] = useState(null);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (stacks.data.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [stacks.data.length]);

  useEffect(() => {
    const stack = stacks.data.find((stack) => stack.url === url);
    if (stack) {
      setCurrentStack(stack);
      const relatedCategories = stack
        ? categories.data.filter((category) =>
            stack.categories.includes(category._id)
          )
        : [];
      setCurrentCategories(relatedCategories);
    }
  }, [url, stacks, categories]);

  const data = currentCategories.map((currentCategory) => ({
    href: '',
    title: currentCategory.name,
    description: currentCategory.desc,
    content: '',
  }));
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <div style={{ padding: '20px' }}>
      <Form className="skillspage" layout="vertical">
        <Form.Item className="skillspage__form-item">
          <Title level={3} className="skills__title">
            {currentStack ? currentStack.name : 'Загрузка...'}
          </Title>
          <Text type="secondary">
            {currentStack ? currentStack.desc : 'Загрузка...'}
          </Text>
        </Form.Item>
        <Form.Item>
          <List
            style={{ marginTop: 0, padding: 0 }}
            className="skillspage__list"
            itemLayout="vertical"
            size="large"
            dataSource={data}
            pagination={{
              position: 'both',
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 5,
            }}
            header={currentStack ? <StacksDownMenu /> : <StacksDownMenu />}
            renderItem={(item) => (
              <List.Item
                style={{ paddingLeft: 0 }}
                key={item.title}
                actions={
                  !loading
                    ? [
                        <IconText
                          icon={StarOutlined}
                          text="156 / 200"
                          key="list-vertical-star-o"
                        />,
                      ]
                    : undefined
                }
              >
                <Skeleton loading={loading} active paragraph={{ rows: 2 }}>
                  <List.Item.Meta
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                  />
                  {item.content}
                </Skeleton>
              </List.Item>
            )}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default SkillPage;
