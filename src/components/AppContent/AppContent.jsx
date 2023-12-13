import { Typography, Flex } from 'antd';
import { Container } from '../Container/Container';
import StacksPage from '../../pages/StacksPage/StacksPage';
// import './AppContent.less';

const { Title } = Typography;

const AppContent = () => {
  return (
    <Container>
      <Flex justify="center" align="center" vertical>
        <Title
          level={2}
          style={{
            fontSize: '25px',
            textAlign: 'center',
            color: '#b37feb',
            marginTop: '50px',
          }}
        >
          Начать заполнение стека
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
          Ваш стек будет показан здесь
        </Title>
      </Flex>
      <StacksPage />
    </Container>
  );
};

export default AppContent;
