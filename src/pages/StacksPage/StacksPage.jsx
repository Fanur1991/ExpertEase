import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth } from '../../redux/slices/authSlice';
import { useEffect, useState } from 'react';
import { Avatar, List } from 'antd';
import { fetchStack, selectStacks } from '../../redux/slices/stacksSlice';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:3002/api/auth/stacks';

const StacksPage = () => {
  const stacks = useSelector(selectStacks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStack(API_URL));
  }, [dispatch]);

  return (
    <List
      itemLayout="horizontal"
      dataSource={stacks.data}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar
                src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
              />
            }
            title={<Link to={`/stacks/${item._id}`}>{item.name.ru}</Link>}
            description={`${item.desc.ru}`}
          />
        </List.Item>
      )}
    />
  );
};
export default StacksPage;
