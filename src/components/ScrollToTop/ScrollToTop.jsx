import { Button } from 'antd';
import { UpOutlined } from '@ant-design/icons';

import './ScrollToTop.less';

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="scrolltotop">
      <Button
        className="scrolltotop__button"
        shape="circle"
        size="large"
        // type="primary"
        onClick={scrollToTop}
        icon={<UpOutlined />}
      />
    </div>
  );
};

export default ScrollToTop;
