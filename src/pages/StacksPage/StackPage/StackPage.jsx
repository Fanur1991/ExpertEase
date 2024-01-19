import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Card, List, Space, Tag, Spin, Flex } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { selectStacks } from '../../../redux/slices/stacksSlice';
import { selectCategories } from '../../../redux/slices/categoriesSlice';
import { selectSkills } from '../../../redux/slices/skillsSlice';
import { Container } from '../../../components/Container/Container';
import SnakeLayout from '../../../components/SnakeLayout/SnakeLayout';

const { Title, Paragraph } = Typography;

const StackPage = () => {
  const { id } = useParams();
  const stacks = useSelector(selectStacks);
  const categories = useSelector(selectCategories);
  const skills = useSelector(selectSkills);
  const [currentStack, setCurrentStack] = useState(null);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [currentSkills, setCurrentSkills] = useState([]);

  console.log(stacks, 'stacks');
  // console.log(categories, 'categories');
  // console.log(skills, 'skills');

  useEffect(() => {
    const stack = stacks.data.find((stack) => stack._id === id);
    const category = categories.data.find((category) => category._id)
    if (stack) {
      setCurrentStack(stack);
      const relatedCategories = stack
        ? categories.data.filter((category) =>
            stack.categories.includes(category._id)
          )
        : [];
      setCurrentCategories(relatedCategories);
      const relatedSkills = stack
        ? skills.data.filter((skill) =>
            category.skills.includes(skill._id)
          )
        : [];
        setCurrentSkills(relatedSkills)
    }
  }, [id, stacks, categories]);

  return !currentStack ? (
    <Flex justify="center" align="center">
      <Title level={5} style={{ color: '#8c8c8c' }}>
        Loading <Spin />
      </Title>
    </Flex>
  ) : (
    <Container>
      {/* <SnakeLayout
        currentStack={currentStack}
        currentCategories={currentCategories}
        currentSkills={currentSkills}
      /> */}
    </Container>
  );
};

export default StackPage;
