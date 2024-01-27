import { Footer } from 'antd/lib/layout/layout';
import { Container } from '../Container/Container';
import { Tooltip, Flex, Card } from 'antd';

import './AppFooter.less';

const AppFooter = () => {
  return (
    <Footer className="app-footer">
      <Container className="app-footer__content">
        <span className="app-footer__content__text">
          Created by
          <Tooltip
            mouseEnterDelay={0.2}
            color="#04bbec"
            title={
              <Flex justify="space-evenly" gap="middle">
                <a
                  className="app-footer__content__text-name"
                  target="_blank"
                  href="https://www.linkedin.com/in/fanur-khusainov-ab86b2102/"
                  rel="noopener noreferrer"
                >
                  <Card size="small" bordered={false}>
                    Fanur Khusainov
                  </Card>
                </a>
                <a
                  className="app-footer__content__text-name"
                  target="_blank"
                  href="https://www.linkedin.com/in/aidarkhusainov/"
                  rel="noopener noreferrer"
                >
                  <Card size="small" bordered={false}>
                    Aidar Khusainov
                  </Card>
                </a>
              </Flex>
            }
          >
            {' '}
            <span className="app-footer__content__text-name">Brothers</span>
          </Tooltip>
        </span>
      </Container>
    </Footer>
  );
};

export default AppFooter;
