import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Rate } from 'antd';
import { selectStacks } from '../../redux/slices/stacksSlice';
import {
  fetchCategory,
  selectCategories,
} from '../../redux/slices/categoriesSlice';

const { Title, Text } = Typography;
const API_URL2 = 'http://localhost:3002/api/auth/categories';

const StackPage = () => {
  const stacks = useSelector(selectStacks);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  const { id } = useParams();

  const stack = stacks.data.find((stack) => stack._id === id);
  const relatedCategories = stack
    ? categories.data.filter((category) =>
        stack.categories.includes(category._id)
      )
    : [];

  useEffect(() => {
    dispatch(fetchCategory(API_URL2));
  }, [dispatch]);

  console.log(relatedCategories);
  return (
    <div>
      {stack && (
        <div>
          <Title key={stack._id} type="success" level={2}>
            {stack.name.ru}
          </Title>
          <Text>{stack.desc.ru}</Text>
        </div>
      )}
      {relatedCategories.map((category) => (
        <ul>
          <li key={category._id}>
            {category.name.ru} - {category.desc.ru} <Rate />
          </li>
        </ul>
      ))}
    </div>
  );
};

export default StackPage;
