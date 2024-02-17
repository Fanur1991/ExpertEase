import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  List,
  Progress,
  Form,
  Typography,
  Skeleton,
  Collapse,
  Flex,
  Tooltip,
  Button,
  Layout,
} from 'antd';
import { StarFilled, DownOutlined } from '@ant-design/icons';
import { selectStacks } from '../../../redux/slices/stacksSlice';
import { selectCategories } from '../../../redux/slices/categoriesSlice';
import { selectSkills } from '../../../redux/slices/skillsSlice';
import { useTranslation } from 'react-i18next';
import StacksDownMenu from '../../../components/SkillsPageComponents/StacksDownMenu/StacksDownMenu';
import ScrollToTop from '../../../components/ScrollToTop/ScrollToTop';
import { selectUserData } from '../../../redux/slices/userDataSlice';
import { Container } from '../../../components/Container/Container';
import CustomRate from '../../../components/SkillsPageComponents/CustomRate/CustomRate';

import './StackPage.less';

const { Title, Text } = Typography;

const StackPage = () => {
  const { url } = useParams();
  const userData = useSelector(selectUserData);
  const stacks = useSelector(selectStacks);
  const categories = useSelector(selectCategories);
  const skills = useSelector(selectSkills);
  const [currentStack, setCurrentStack] = useState(null);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [percent, setPercent] = useState(5);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const twoColors = {
    '0%': '#04bbec',
    '100%': '#ea25b5',
  };

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

  return (
    <Layout className="stackPage">
      <Container>
        <Form className="stackpage__form" layout="vertical">
          <Form.Item className="stackpage__form-item">
            <Flex
              className="stackpage__containertitle"
              justify="start"
              align="center"
              gap="large"
            >
              <Button
                className="stackpage__button"
                onClick={() => navigate('/')}
              >
                {t('buttonBack')}
              </Button>
              <Title className="stackpage__title">
                {currentStack ? currentStack.title : 'Загрузка...'}
              </Title>
            </Flex>
            <Text className="stackpage__subtitle" type="secondary">
              {currentStack ? currentStack.desc : 'Загрузка...'}
            </Text>
          </Form.Item>

          <Form.Item className="stackpage__form-item">
            <List
              className="stackpage__list"
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
                  <Tooltip
                    mouseEnterDelay={0.5}
                    color="#04bbec"
                    title={t('buttonAddSkill')}
                  >
                    <Button className="stackpage__list-button">Add</Button>
                  </Tooltip>
                  <StacksDownMenu />
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
                                placement="topLeft"
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
                            <Flex align="center" justify="start" gap="middle">
                              {/* <StarFilled className="yellow-star" />
                              <Text>0</Text> */}
                              <Progress
                                strokeColor={twoColors}
                                // size={45}
                                size={[90, 10]}
                                // type="dashboard"
                                percent={percent}
                              />
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
                                      align="flex-start"
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
                                        <CustomRate />
                                      )}
                                    </Flex>
                                  </Flex>
                                }
                                description={
                                  <Flex gap="middle" vertical>
                                    <Text style={{ color: '#8f8f8f' }}>
                                      {skill.desc}
                                    </Text>
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
      </Container>
    </Layout>
  );
};

export default StackPage;
