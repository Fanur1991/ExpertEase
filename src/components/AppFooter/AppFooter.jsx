import { Footer } from 'antd/lib/layout/layout';
import { Container } from '../Container/Container';

import './AppFooter.less';

const AppFooter = () => {
  return (
    <Footer className="app-footer">
      <Container className="app-footer__content">
        <span className="app-footer__content__text">
          Created by
          <a
            className="app-footer__content__text-name"
            target="_blank"
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
