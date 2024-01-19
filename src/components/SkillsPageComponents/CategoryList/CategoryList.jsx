// CategoryList.jsx
import React from 'react';
import { List, Collapse, Skeleton, Flex, Tooltip, Title, Checkbox } from 'antd';
import { StarFilled } from '@ant-design/icons';
import SkillItem from '../SkillsItem/SkillsItem';

const CategoryList = ({
  currentCategories,
  skills,
  loading,
  checkboxStates,
  handleCheckboxChange,
  t,
}) => {
  const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return <a>Previous</a>;
    }
    if (type === 'next') {
      return <a>Next</a>;
    }
    return originalElement;
  };

  return (
    <List
      className="skillspage__list"
      style={{ marginTop: 0, padding: 0 }}
      itemLayout="vertical"
      size="large"
      dataSource={currentCategories}
      pagination={{
        defaultPageSize: 5,
        showSizeChanger: true,
        itemRender,
        pageSizeOptions: [5, 10, 20, 30],
        position: 'bottom',
        align: 'center',
        total: currentCategories.length,
        onChange: (page) => {},
      }}
      renderItem={(category) => {
        const skillsData = skills.data.filter((skill) =>
          category.skills.includes(skill._id)
        );
        return (
          <List.Item style={{ paddingLeft: 0 }} key={category._id}>
            <Collapse accordion ghost>
              <Collapse.Panel
                collapsible="header"
                header={
                  loading ? (
                    <Skeleton
                      style={{ marginTop: 5 }}
                      title={{ width: '40%' }}
                      paragraph={{ rows: 0 }}
                      loading={loading}
                      active
                    />
                  ) : (
                    <Flex>
                      <Tooltip
                        mouseEnterDelay={0.5}
                        color="#87d068"
                        title={category.desc}
                      >
                        <Title level={5}>{category.name}</Title>
                      </Tooltip>
                    </Flex>
                  )
                }
                extra={
                  loading ? (
                    <Skeleton.Input
                      size="small"
                      style={{ height: 17, marginTop: 5 }}
                      loading={loading}
                      active
                    />
                  ) : (
                    <Flex align="center" justify="start" gap="large">
                      <Checkbox
                        checked={checkboxStates[category._id]}
                        onChange={() => handleCheckboxChange(category._id)}
                      />
                      <Flex align="center" justify="start" gap="small">
                        <StarFilled className="yellow-star" />
                        <Text>156 / 200</Text>
                      </Flex>
                    </Flex>
                  )
                }
                key={category._id}
              >
                <SkillItem key={skill._id} skill={skill} loading={loading} />
              </Collapse.Panel>
            </Collapse>
          </List.Item>
        );
      }}
    />
  );
};

export default CategoryList;
