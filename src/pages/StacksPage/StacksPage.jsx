import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Card, Flex, List, Typography, Spin, Skeleton } from 'antd';
import { fetchStack, selectStacks } from '../../redux/slices/stacksSlice';
import {
  fetchCategory,
  selectCategories,
} from '../../redux/slices/categoriesSlice';
import { fetchSkill, selectSkills } from '../../redux/slices/skillsSlice';
import { fetchProfile } from '../../redux/slices/userDataSlice';
import {
  API_URL_stacks,
  API_URL_categories,
  API_URL_skills,
} from '../../config';

import './StacksPage.less';
const { Title, Text } = Typography;

const StacksPage = () => {
  const stacks = useSelector(selectStacks);
  const categories = useSelector(selectCategories);
  const skills = useSelector(selectSkills);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadedAvatars, setLoadedAvatars] = useState({});

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchStack(API_URL_stacks));
    dispatch(fetchCategory(API_URL_categories));
    dispatch(fetchSkill(API_URL_skills));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('stacks', JSON.stringify(stacks));
  }, [stacks]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('skills', JSON.stringify(skills));
  }, [skills]);

  const handleAvatarLoad = (index) => {
    setLoadedAvatars((prev) => ({ ...prev, [index]: true }));
  };

  return stacks.isLoading ? (
    <Flex justify="center" align="center">
      <Title className="stackspage__title" level={5}>
        Loading <Spin />
      </Title>
    </Flex>
  ) : (
    <List
      className="stackspage__list"
      size="middle"
      grid={{
        gutter: 8,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 3,
        xxl: 3,
      }}
      itemLayout="horizontal"
      dataSource={stacks.data}
      renderItem={(item, index) => (
        <List.Item className="stackspage__list-item">
          <Flex justify="space-evenly" align="center">
            <Card
              className="stackspage__card"
              onClick={() => navigate(`/stacks/${item.url}`)}
              size="small"
            >
              <Flex gap="middle" align="center">
                {!loadedAvatars[index] && (
                  <Skeleton.Avatar className="stackspage__card-avatar" active />
                )}
                <Avatar
                  className="stackspage__card-avatar"
                  src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                  onLoad={() => handleAvatarLoad(index)}
                  style={loadedAvatars[index] ? {} : { display: 'none' }}
                />
                <Text className="stackspage__card-title">{item.title}</Text>
              </Flex>
            </Card>
          </Flex>
        </List.Item>
      )}
    />
  );
};

export default StacksPage;
