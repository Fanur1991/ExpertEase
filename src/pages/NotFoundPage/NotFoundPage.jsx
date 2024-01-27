import { Link } from 'react-router-dom';
import { Result, Typography } from 'antd';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useTranslation } from 'react-i18next';

import './NotFoundPage.less';

const { Text, Title } = Typography;

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Result
      status="404"
      extra={
        <>
          <Title className="notfound__title" level={3}>
            404
          </Title>
          <Text className="notfound__text">{t('pageIsNotFound')}</Text>
          <Link to={'/'}>
            <CustomButton type="primary" children={t('buttonBackHome')} />
          </Link>
        </>
      }
    />
  );
};

export default NotFound;
