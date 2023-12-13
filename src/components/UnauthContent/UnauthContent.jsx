import { Typography, Flex } from 'antd';
import { Container } from '../Container/Container';
import StacksPage from '../../pages/StacksPage/StacksPage';
// import './UnauthContent.less';

const { Title } = Typography;

const UnauthContent = () => {
  return (
    <Container>
      <Flex justify="center" align="center" gap="middle" vertical>
        <Title
          style={{
            fontSize: '50px',
            textAlign: 'center',
            color: '#b37feb',
            marginTop: '50px',
            fontWeight: '700',
          }}
        >
          Developer Skills Rating
        </Title>
        <Title
          type="secondary"
          level={3}
          style={{
            textAlign: 'center',
            color: '#8c8c8c',
            marginBottom: '50px',
          }}
        >
          Создайте свой уникальный профиль навыков, оцените свои знания <br /> и
          поделитесь ими с потенциальными работодателями
        </Title>
      </Flex>
      <StacksPage />
    </Container>
  );
};

export default UnauthContent;
