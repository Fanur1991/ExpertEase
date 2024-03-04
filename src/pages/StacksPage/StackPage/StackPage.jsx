import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  List,
  Progress,
  Form,
  Typography,
  Collapse,
  Flex,
  Tooltip,
  Button,
  Layout,
} from 'antd';
import {
  QuestionCircleOutlined,
  PrinterOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { selectStacks } from '../../../redux/slices/stacksSlice';
import { selectCategories } from '../../../redux/slices/categoriesSlice';
import { selectSkills } from '../../../redux/slices/skillsSlice';
import { useTranslation } from 'react-i18next';
import { selectUserData } from '../../../redux/slices/userDataSlice';
import { Container } from '../../../components/Container/Container';
import CustomRate from '../../../components/SkillsPageComponents/CustomRate/CustomRate';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { BsBookmark } from 'react-icons/bs';
import { getMe } from '../../../redux/slices/authSlice';
import ModalWindowToLogIn from '../../../components/ModalWindowToLogIn/ModalWindowToLogIn';
import CustomFloatButton from '../../../components/CustomFloatButton/CustomFloatButton';

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
  const [percent, setPercent] = useState(100);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skillRating, setSkillRating] = useState(0);
  const [categorySkillSums, setCategorySkillSums] = useState({});
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(percent);
  console.log(skillRating);
  console.log(categorySkillSums);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

  const saveStackHandle = () => {
    const token = window.localStorage.getItem('token');
    if (token) {
      dispatch(getMe());
    } else {
      showModal();
    }
  };

  // const calculateCategorySkillSums = () => {
  //   const sums = {};
  //   currentCategories.forEach((category) => {
  //     const categorySkills = skills.data.filter((skill) =>
  //       category.skills.includes(skill._id)
  //     );
  //     const sum = categorySkills.reduce((acc, skill) => {
  //       return acc + (skillRating[skill._id] || 0);
  //     }, 0);
  //     sums[category._id] = sum;
  //   });
  //   setCategorySkillSums(sums);
  //   setPercent()
  // };

  // useEffect(() => {
  //   calculateCategorySkillSums();
  // }, [skills.data, skillRating]);

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
              <Flex align="center" justify="center" gap="small">
                <Title className="stackpage__title">
                  {currentStack ? currentStack.title : 'Загрузка...'}
                </Title>
                <Tooltip
                  title={currentStack ? currentStack.desc : 'Загрузка...'}
                >
                  <QuestionCircleOutlined style={{ color: '#04bbec' }} />
                </Tooltip>
              </Flex>
            </Flex>
            <Text className="stackpage__subtitle" type="secondary">
              Some instructions
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
                <Flex justify="flex-end" align="center">
                  <Button.Group>
                    <Tooltip
                      mouseEnterDelay={0.5}
                      color="#04bbec"
                      title={t('buttonAddSkill')}
                    >
                      <CustomButton
                        onClick={saveStackHandle}
                        type="primary"
                        children={
                          <Flex align="center" gap="small">
                            <BsBookmark style={{ width: 16, height: 16 }} />
                            <span>{t('buttonSaveSkill')}</span>
                          </Flex>
                        }
                      />
                    </Tooltip>
                    <Tooltip
                      mouseEnterDelay={0.5}
                      color="#04bbec"
                      title={t('buttonPrint')}
                    >
                      <Button icon={<PrinterOutlined />} />
                    </Tooltip>
                    <Tooltip
                      mouseEnterDelay={0.5}
                      color="#04bbec"
                      title={t('buttonShare')}
                    >
                      <Button icon={<ShareAltOutlined />} />
                    </Tooltip>
                  </Button.Group>
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
                          <Tooltip
                            mouseEnterDelay={0.5}
                            color="#04bbec"
                            title={category.desc}
                            placement="topLeft"
                          >
                            <Title level={5}>{category.title}</Title>
                          </Tooltip>
                        }
                        extra={
                          <Tooltip
                            mouseEnterDelay={0.5}
                            color="#04bbec"
                            title="Skillzometer"
                            placement="rightTop"
                          >
                            <Progress
                              strokeColor={twoColors}
                              size={[90, 10]}
                              status={percent === 100 ? 'success' : 'active'}
                              percent={percent}
                              format={(percent) => `${percent} sm`}
                              // steps={4}
                            />
                          </Tooltip>
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
                                    <Text style={{ fontWeight: 500 }}>
                                      {skill.title}
                                    </Text>
                                    <CustomRate
                                      key={skill._id}
                                      skillId={skill._id}
                                      initialValue={skillRating[skill._id] || 0}
                                      onRateChange={setSkillRating}
                                    />
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
        <ModalWindowToLogIn open={isModalOpen} onCancel={closeModal} />
        <CustomFloatButton />
      </Container>
    </Layout>
  );
};

export default StackPage;
