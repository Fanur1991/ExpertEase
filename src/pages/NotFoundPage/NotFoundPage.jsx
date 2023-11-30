import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';

const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Страница не существует."
      extra={
        <Button>
          <Link to={'/'}>Назад домой</Link>
        </Button>
      }
    />
  );
};

export default NotFound;
