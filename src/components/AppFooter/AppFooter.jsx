import { Footer } from 'antd/lib/layout/layout';

const AppFooter = () => {
  return (
    <Footer
      style={{
        textAlign: 'center',
        backgroundColor: '#bae0ff',
      }}
    >
      <span>
        Created by
        <a href="https://www.linkedin.com/in/fanur-khusainov-ab86b2102/">
          {' '}
          Fanur Khusainov{' '}
        </a>
      </span>
    </Footer>
  );
};

export default AppFooter;
