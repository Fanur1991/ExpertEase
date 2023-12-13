import { Footer } from 'antd/lib/layout/layout';
import { Container } from '../Container/Container';

const AppFooter = () => {
  return (
    <Footer
      style={{
        textAlign: 'center',
        backgroundColor: '#0E1627',
        height: '64px',
      }}
    >
      <Container>
        <span style={{ color: '#8c8c8c' }}>
          Created by
          <a
            target="_blank"
            style={{ color: '#f759ab' }}
            href="https://www.linkedin.com/in/fanur-khusainov-ab86b2102/"
            rel="noopener noreferrer"
          >
            {' '}
            Fanur Khusainov{' '}
          </a>
        </span>
      </Container>
    </Footer>
  );
};

export default AppFooter;
