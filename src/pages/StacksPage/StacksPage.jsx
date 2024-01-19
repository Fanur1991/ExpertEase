import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Card,
  Flex,
  List,
  Typography,
  Spin,
  Skeleton,
  Meta,
} from 'antd';
import { fetchStack, selectStacks } from '../../redux/slices/stacksSlice';
import { fetchCategory } from '../../redux/slices/categoriesSlice';
import { fetchSkill } from '../../redux/slices/skillsSlice';
import { fetchProfile } from '../../redux/slices/userDataSlice';

import './StacksPage.less';

const { Title } = Typography;

const API_URL = 'http://localhost:3002/api/stacks';
const API_URL2 = 'http://localhost:3002/api/categories';
const API_URL3 = 'http://localhost:3002/api/skills';

const StacksPage = () => {
  const stacks = useSelector(selectStacks);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadedAvatars, setLoadedAvatars] = useState({});

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchStack(API_URL));
    dispatch(fetchCategory(API_URL2));
    dispatch(fetchSkill(API_URL3));
  }, [dispatch]);

  const handleAvatarLoad = (index) => {
    setLoadedAvatars((prev) => ({ ...prev, [index]: true }));
  };

  return stacks.isLoading ? (
    <Flex justify="center" align="center">
      <Title level={5} style={{ color: '#8c8c8c' }}>
        Loading <Spin />
      </Title>
    </Flex>
  ) : (
    <List
      className="stackspage"
      size="middle"
      grid={{
        gutter: 8,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 3,
        xxl: 4,
      }}
      itemLayout="horizontal"
      dataSource={stacks.data}
      renderItem={(item, index) => (
        <List.Item className="stackspage__list-item">
          <Flex justify="space-evenly" align="center">
            {/* <Link className="stackspage__card-link" to={`/stacks/${item._id}`}> */}
            <Card
              onClick={() => navigate(`/stacks/${item._id}`)}
              size="small"
              className="stackspage__card"
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
                <span>{item.name}</span>
              </Flex>
            </Card>
            {/* </Link> */}
          </Flex>
        </List.Item>
      )}
    />
  );
};

export default StacksPage;
