import React from 'react';
import { Card, Flex, Modal, Col } from 'antd';
import './SnakeLayout.less';
import { Link } from 'react-router-dom';

const SnakeLayout = ({ currentStack, currentCategories, currentSkills }) => {
  return (
    <div className="snakelayout">
      <Flex className="snakelayout__head" justify="center" align="center">
        <Card
          className="snakelayout__head-card"
          bodyStyle={{ fontSize: 20 }}
          loading={false}
        >
          {currentStack.name}
        </Card>
      </Flex>
      <Flex
        className="snakelayout__body"
        justify="center"
        align="center"
        wrap="wrap"
      >
        {currentCategories.map((category, index) => (
          <Flex align="center" justify="center">
            <Link>
              <Card
                bodyStyle={{ fontSize: 18 }}
                key={index}
                className="snakelayout__body-card"
              >
                {category.name}
              </Card>
            </Link>
          </Flex>
        ))}
      </Flex>
    </div>
  );
};

export default SnakeLayout;
