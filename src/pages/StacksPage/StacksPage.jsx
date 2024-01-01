import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Card, Flex, List, Typography, Spin, Divider } from 'antd';
import { fetchStack, selectStacks } from '../../redux/slices/stacksSlice';
import { fetchCategory } from '../../redux/slices/categoriesSlice';
import { fetchSkill } from '../../redux/slices/skillsSlice';
import './StacksPage.less';

const { Title } = Typography;

const API_URL = 'http://localhost:3002/api/stacks';
const API_URL2 = 'http://localhost:3002/api/categories';
const API_URL3 = 'http://localhost:3002/api/skills';

const StacksPage = () => {
  const stacks = useSelector(selectStacks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStack(API_URL));
    dispatch(fetchCategory(API_URL2));
    dispatch(fetchSkill(API_URL3));
  }, [dispatch]);

  return stacks.isLoading ? (
    <Flex justify="center" align="center">
      <Title level={5} style={{ color: '#8c8c8c' }}>
        Loading <Spin />
      </Title>
    </Flex>
  ) : (
    <List
      className="list"
      size="middle"
      grid={{
        gutter: 8,
        xs: 1,
        sm: 2,
        md: 2,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      itemLayout="horizontal"
      dataSource={stacks.data}
      renderItem={(item, index) => (
        <List.Item className="list-item">
          <Link className="card-link" to={`/stacks/${item._id}`}>
            <Card className="card">
              <Flex gap="middle" justify="center" align="center">
                <Avatar
                  src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                />
                <Divider
                  style={{ borderInlineColor: '#8c8c8c', fontSize: '20px' }}
                  type="vertical"
                />
                <span>{item.name.ru}</span>
              </Flex>
            </Card>
          </Link>
        </List.Item>
      )}
    />
  );
};

export default StacksPage;
