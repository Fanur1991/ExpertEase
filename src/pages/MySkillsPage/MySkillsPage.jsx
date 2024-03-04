import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Typography,
  Card,
  Flex,
  List,
  Spin,
  Tooltip,
  Modal,
  Input,
  ConfigProvider,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { selectStacks } from '../../redux/slices/stacksSlice';
import { selectCategories } from '../../redux/slices/categoriesSlice';
import { selectSkills } from '../../redux/slices/skillsSlice';
import { addUserStack } from '../../redux/slices/userDataSlice';

import './MySkillsPage.less';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomFloatButton from '../../components/CustomFloatButton/CustomFloatButton';

const { Title, Text } = Typography;

const MySkillsPage = () => {
  const stacks = useSelector(selectStacks);
  const categories = useSelector(selectCategories);
  const skills = useSelector(selectSkills);
  const [stackTitle, setStackTitle] = useState('');
  const [stackUrl, setStackUrl] = useState('');
  const [stackId, setStackId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(stackId);

  const showModal = (stackProps) => {
    const { stackTitle, stackUrl, stackId } = stackProps;
    setIsModalOpen(true);
    setStackTitle(stackTitle);
    setStackUrl(stackUrl);
    setStackId(stackId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddStackTitle = () => {
    setStackTitle(stackTitle);
    dispatch(addUserStack({ title: stackTitle, stackId, totalRating: 184 }));
    navigate(`/user/skills/${stackUrl}`);
    closeModal();
  };

  return stacks.isLoading ? (
    <Flex justify="center" align="center">
      <Title level={5} style={{ color: '#8c8c8c' }}>
        Loading <Spin />
      </Title>
    </Flex>
  ) : (
    <div className="myskillspage">
      <Form className="myskillspage__form" layout="vertical">
        <Form.Item className="myskillspage__form-item">
          <Title className="myskillspage__title">
            {t('myskillsPageTitle')}
          </Title>
          <Text className="myskillspage__subtitle" type="secondary">
            {t('myskillsPageDescription')}
          </Text>
        </Form.Item>
        <Form.Item className="myskillspage__form-item">
          <List
            className="myskillspage__list"
            size="middle"
            grid={{
              gutter: [8, 8],
              xs: 1,
              sm: 1,
              md: 1,
              lg: 2,
              xl: 2,
              xxl: 2,
            }}
            itemLayout="horizontal"
            dataSource={stacks.data}
            renderItem={(item) => (
              <List.Item className="myskillspage__list-item">
                <Card
                  className="myskillspage__card"
                  onClick={(e) => {
                    navigate(`/user/skills/${item.url}`);
                  }}
                  title={item.title}
                  extra={
                    <Tooltip
                      mouseEnterDelay={0.5}
                      color="#04bbec"
                      title={t('buttonAddSkill')}
                    >
                      <CustomButton
                        type="primary"
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={(e) => {
                          e.stopPropagation();
                          showModal({
                            stackTitle: item.title,
                            stackUrl: item.url,
                            stackId: item._id,
                          });
                        }}
                      />
                    </Tooltip>
                  }
                  hoverable
                  bordered={true}
                  headStyle={{
                    padding: '15px',
                  }}
                  bodyStyle={{
                    overflow: 'hidden',
                    padding: '15px',
                  }}
                >
                  <Text className="myskillspage__card-text" type="secondary">
                    {item.desc}
                  </Text>
                </Card>
              </List.Item>
            )}
          />
          <ConfigProvider
            theme={{
              components: {
                Modal: {
                  colorBgElevated: '#ffffff',
                },
                Button: {
                  colorPrimary: '#04bbec',
                  colorPrimaryHover: '#04bbec',
                },
              },
            }}
          >
            <Modal
              className="myskillspage__modal"
              open={isModalOpen}
              onOk={handleAddStackTitle}
              onCancel={closeModal}
              okButtonProps={{
                type: 'primary',
              }}
              centered
              okText={t('buttonSaveSkill')}
              cancelText={t('cancel')}
            >
              <Title className="myskillspage__modal-text" level={3}>
                {t('inputStackTitle')}
              </Title>
              <Input
                className="myskillspage__modal-input"
                value={stackTitle}
                onChange={(e) => setStackTitle(e.target.value)}
                autoFocus
                placeholder={t('inputStackTitle')}
              />
            </Modal>
          </ConfigProvider>
        </Form.Item>
      </Form>
      <CustomFloatButton />
    </div>
  );
};

export default MySkillsPage;
