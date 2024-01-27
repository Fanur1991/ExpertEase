import React from 'react';
import { Card, Flex, Modal, Col } from 'antd';
import { Link } from 'react-router-dom';
import './SnakeLayout.less';

const SnakeLayout = ({ currentStack, currentCategories, currentSkills }) => {
  return (
    <div className="snakelayout">
      <Flex className="snakelayout__head" justify="center" align="center">
        <Card
          className="snakelayout__head-card"
          bodyStyle={{ fontSize: 20 }}
          loading={false}
        >
          {currentStack.title}
        </Card>
      </Flex>
      <Flex
        className="snakelayout__body"
        justify="center"
        align="center"
        wrap="wrap"
      >
        {currentCategories.map((category, index) => (
          <Flex align="center" justify="center" key={index}>
            <Card
              className="snakelayout__body-card"
              bodyStyle={{ fontSize: 18 }}
            >
              {category.title}
            </Card>
          </Flex>
        ))}
      </Flex>
    </div>
  );
};

export default SnakeLayout;
