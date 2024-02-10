import { Footer } from 'antd/lib/layout/layout';
import { Container } from '../Container/Container';
import { Tooltip, Flex, Card } from 'antd';
import { LinkedinOutlined } from '@ant-design/icons';

import './AppFooter.less';

const AppFooter = () => {
  return (
    <Footer className="app-footer">
      <p className="app-footer__text">
        Created by
        <Tooltip
          className="app-footer__text-name"
          mouseEnterDelay={0.2}
          color="#04bbec"
          title={
            <Flex gap="middle" vertical>
              <a
                className="app-footer__text-link"
                target="_blank"
                href="https://www.linkedin.com/in/fanur-khusainov-ab86b2102/"
                rel="noopener noreferrer"
              >
                <Card hoverable size="small" bordered={false}>
                  Fanur Khusainov
                </Card>
              </a>
              <a
                className="app-footer__text-link"
                target="_blank"
                href="https://www.linkedin.com/in/aidarkhusainov/"
                rel="noopener noreferrer"
              >
                <Card hoverable size="small" bordered={false}>
                  Aidar Khusainov
                </Card>
              </a>
            </Flex>
          }
        >
          {' '}
          Brothers
        </Tooltip>
      </p>
    </Footer>
  );
};

export default AppFooter;
