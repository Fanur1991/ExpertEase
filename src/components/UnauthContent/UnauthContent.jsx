import { Typography, Button, Flex } from 'antd';

const { Title, Text } = Typography;

const UnauthContent = () => {
  return (
    <>
      <Title
        type="success"
        level={2}
        style={{ textAlign: 'center', color: '#ffa940', margin: '50px auto' }}
      >
        Добро пожаловать на <Title strong level={2}>SkillShare</Title> - платформу для демонстрации и оценки
        профессиональных навыков в области программирования
      </Title>
      <Title
        type="secondary"
        level={3}
        style={{ textAlign: 'center', margin: '50px auto' }}
      >
        Создайте свой уникальный профиль навыков, оцените свои знания и
        поделитесь ими с потенциальными работодателями
      </Title>
      <Flex align="center" vertical>
        <Button
          href="/stacks"
          type="primary"
          style={{ backgroundColor: '#ffa940' }}
        >
          Начать
        </Button>
      </Flex>
    </>
  );
};

export default UnauthContent;
