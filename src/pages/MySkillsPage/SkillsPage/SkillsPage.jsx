import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  List,
  Space,
  Form,
  Typography,
  Skeleton,
  Collapse,
  Rate,
  Flex,
  Tag,
  Tooltip,
  Checkbox,
  Button,
  Dropdown,
} from 'antd';
import { StarFilled, DownOutlined } from '@ant-design/icons';
import { selectStacks } from '../../../redux/slices/stacksSlice';
import { selectCategories } from '../../../redux/slices/categoriesSlice';
import { selectSkills } from '../../../redux/slices/skillsSlice';
import { useTranslation } from 'react-i18next';
import StacksDownMenu from '../../../components/SkillsPageComponents/StacksDownMenu/StacksDownMenu';
import ScrollToTop from '../../../components/ScrollToTop/ScrollToTop';
import userDataSlice, {
  selectUserData,
} from '../../../redux/slices/userDataSlice';

import './SkillsPage.less';

const { Title, Text } = Typography;

const SkillsPage = () => {
  const { url } = useParams();
  const userData = useSelector(selectUserData);
  const stacks = useSelector(selectStacks);
  const categories = useSelector(selectCategories);
  const skills = useSelector(selectSkills);
  const [currentStack, setCurrentStack] = useState(null);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();

  // console.log(userData.user.stacksRating);

  const initialCheckboxState = {};
  currentCategories.forEach((category) => {
    initialCheckboxState[category._id] = true;
  });

  const [checkboxStates, setCheckboxStates] = useState(initialCheckboxState);

  const handleCheckboxChange = (categoryId) => {
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [categoryId]: !prevStates[categoryId],
    }));
  };

  useEffect(() => {
    const newCheckboxState = currentCategories.reduce((state, category) => {
      state[category._id] = true;
      return state;
    }, {});

    setCheckboxStates(newCheckboxState);
  }, [currentCategories]);

  useEffect(() => {
    if (stacks.data.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [stacks.data.length]);

  useEffect(() => {
    const stack = stacks.data.find((stack) => stack.url === url);
    if (stack) {
      setCurrentStack(stack);
      const relatedCategories = stack
        ? categories.data.filter((category) =>
            stack.categories.includes(category._id)
          )
        : [];
      setCurrentCategories(relatedCategories);
    }
  }, [url, stacks, categories]);

  const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return <a>Previous</a>;
    }
    if (type === 'next') {
      return <a>Next</a>;
    }
    return originalElement;
  };

  const items = userData?.user?.stacksRating.map((stack, index) => {
    return {
      label: <a href="">{stack?.title}</a>,
      key: index,
    };
  });

  return (
    <div className="skillspage">
      <Form className="skillspage__form" layout="vertical">
        <Form.Item className="skillspage__form-item">
          <Flex
            className="skillspage__containertitle"
            justify="start"
            align="center"
            gap="large"
          >
            <Button
              className="skillspage__button"
              onClick={() => navigate('/user/skills')}
            >
              {t('buttonBack')}
            </Button>
            <Title className="skillspage__title">
              {currentStack ? currentStack.title : 'Загрузка...'}
            </Title>
          </Flex>
          <Text className="skillspage__subtitle" type="secondary">
            {currentStack ? currentStack.desc : 'Загрузка...'}
          </Text>
        </Form.Item>

        <Form.Item className="skillspage__form">
          <List
            className="skillspage__list"
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
            header={
              <Flex justify="space-between" align="center">
                <Title className="skillspage__list-title">
                  {userData.user.stacksRating.length > 0 ? (
                    <Dropdown
                      menu={{
                        items,
                        className: 'skillspage__list-dropdown',
                      }}
                      trigger={['click']}
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                          My Saved Skills
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  ) : (
                    currentStack?.title
                  )}
                </Title>
                <Flex gap="middle">
                  <Tooltip
                    mouseEnterDelay={0.5}
                    color="#04bbec"
                    title={t('buttonAddSkill')}
                  >
                    <Button className="skillspage__list-button">Add</Button>
                  </Tooltip>
                  <StacksDownMenu />
                </Flex>
              </Flex>
            }
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
                              color="#04bbec"
                              title={category.desc}
                            >
                              <Title level={5}>{category.title}</Title>
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
                              onChange={() =>
                                handleCheckboxChange(category._id)
                              }
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
                      <List
                        style={{ marginLeft: 15 }}
                        itemLayout="horizontal"
                        dataSource={skillsData}
                        renderItem={(skill) => (
                          <List.Item key={skill._id}>
                            <List.Item.Meta
                              title={
                                <Flex align="center" justify="space-between">
                                  {loading ? (
                                    <Skeleton
                                      title={{ width: '40%' }}
                                      paragraph={{ rows: 0 }}
                                      loading={loading}
                                      active
                                    />
                                  ) : (
                                    <Text style={{ fontWeight: 500 }}>
                                      {skill.title}
                                    </Text>
                                  )}
                                  <Flex
                                    align="center"
                                    justify="center"
                                    gap="middle"
                                  >
                                    {loading ? (
                                      <Skeleton.Input
                                        title={{ width: '40%' }}
                                        paragraph={{ rows: 0 }}
                                        loading={loading}
                                        active
                                      />
                                    ) : (
                                      <Tag>
                                        <Space size="small">
                                          <Rate allowHalf defaultValue={0} />
                                          <Text>
                                            <span style={{ color: 'red' }}>
                                              0
                                            </span>{' '}
                                            <span
                                              style={{
                                                color: '#8c8c8c',
                                                fontWeight: 400,
                                              }}
                                            >
                                              {t('of')}
                                            </span>{' '}
                                            <span style={{ color: '#52c41a' }}>
                                              5
                                            </span>
                                          </Text>
                                        </Space>
                                      </Tag>
                                    )}
                                  </Flex>
                                </Flex>
                              }
                              description={
                                <Flex gap="middle" vertical>
                                  <Text>{skill.desc}</Text>
                                  <Flex
                                    wrap="wrap"
                                    align="center"
                                    justify="start"
                                    gap="small"
                                  >
                                    {skill.details.map((detail, index) => {
                                      return (
                                        <Tag key={index} color="purple">
                                          {detail}
                                        </Tag>
                                      );
                                    })}
                                  </Flex>
                                </Flex>
                              }
                            />
                          </List.Item>
                        )}
                      />
                    </Collapse.Panel>
                  </Collapse>
                </List.Item>
              );
            }}
          />
        </Form.Item>
      </Form>
      <ScrollToTop />
    </div>
  );
};

export default SkillsPage;
