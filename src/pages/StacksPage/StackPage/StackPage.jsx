import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Card, List, Space, Tag, Spin, Flex } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { selectStacks } from '../../../redux/slices/stacksSlice';
import { selectCategories } from '../../../redux/slices/categoriesSlice';
import { selectSkills } from '../../../redux/slices/skillsSlice';
import { Container } from '../../../components/Container/Container';

const { Title, Paragraph } = Typography;

const StackPage = () => {
  const { id } = useParams();
  const stacks = useSelector(selectStacks);
  const categories = useSelector(selectCategories);
  const skills = useSelector(selectSkills);
  const [currentStack, setCurrentStack] = useState(null);
  const [currentCategories, setCurrentCategories] = useState([]);

  useEffect(() => {
    const stack = stacks.data.find((stack) => stack._id === id);
    if (stack) {
      setCurrentStack(stack);
      const relatedCategories = stack
        ? categories.data.filter((category) =>
            stack.categories.includes(category._id)
          )
        : [];
      setCurrentCategories(relatedCategories);
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
      <Title type="success" level={2}>
        {currentStack.name.ru}
      </Title>
      <Paragraph>{currentStack.desc.ru}</Paragraph>
      <Title level={3}>Категории и навыки</Title>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={currentCategories}
        renderItem={(category) => (
          <List.Item key={category._id}>
            <Card title={category.name.ru}>
              <List
                dataSource={category.skills
                  .map((skillId) =>
                    skills.data.find((skill) => skill._id === skillId)
                  )
                  .filter((skill) => skill !== null)}
                renderItem={(skill) => {
                  return skill ? (
                    <List.Item key={skill._id}>
                      <strong>{skill.name.ru}</strong>: {skill.desc.ru}
                      <Space align="center" wrap>
                        {skill.details &&
                          skill.details.map((detail) => (
                            <Tag color="magenta" key={uuidv4()}>
                              {detail}
                            </Tag>
                          ))}
                      </Space>
                    </List.Item>
                  ) : null;
                }}
              />
            </Card>
          </List.Item>
        )}
      />
    </Container>
  );
};

export default StackPage;
