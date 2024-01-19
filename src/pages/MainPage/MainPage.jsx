import { Typography, Flex } from 'antd';
import { Container } from '../../components/Container/Container';
import StacksPage from '../../pages/StacksPage/StacksPage';
import { useTranslation } from 'react-i18next';

import './MainPage.less';

const { Title } = Typography;

const MainPage = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Flex justify="center" align="center" gap="middle" vertical>
        <Title
          style={{
            fontSize: '50px',
            textAlign: 'center',
            color: '#d3adf7',
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
            color: '#bfbfbf',
            marginBottom: '50px',
            maxWidth: 800,
          }}
        >
          {t('createUniqueProfile')}
        </Title>
      </Flex>
      <StacksPage />
    </Container>
  );
};

export default MainPage;
