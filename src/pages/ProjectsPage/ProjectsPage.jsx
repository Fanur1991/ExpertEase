import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  Input,
  Button,
  Form,
  List,
  Space,
  Typography,
  Flex,
  Tooltip,
} from 'antd';
import { PlusOutlined, LinkOutlined, DeleteOutlined } from '@ant-design/icons';
import { v4 as uuid } from 'uuid';
import {
  addProjects,
  deleteProjects,
  fetchProjects,
  selectUserData,
} from '../../redux/slices/userDataSlice';
import { openMessage } from '../../utils/openMessage';
import { useTranslation } from 'react-i18next';

import './ProjectsPage.less';

const { TextArea } = Input;
const { Title, Text } = Typography;

const ProjectsPage = () => {
  const [stacks, setStacks] = useState([]);
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const projects = userData.user?.projects || [];

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const onFinish = (values) => {
    const validStacks = stacks.filter((stack) => stack.trim() !== '');

    const newProject = {
      ...values,
      id: uuid(),
      stack: validStacks,
    };

    dispatch(addProjects(newProject));
    form.resetFields();
    setStacks([]);
    openMessage('success', t('projectsPageNotification1'));
  };

  const handleStackInputChange = (e) => {
    const input = e.target.value;

    if (input.trim().length === 0) {
      setStacks([]);
    } else {
      const stackArray = input
        .split(/[\s,]+/)
        .map((item) => item.trim())
        .filter((item) => item !== '');
      setStacks(stackArray);
    }
  };

  const handleDelete = (project) => {
    dispatch(deleteProjects(project.id));
    openMessage('success', t('projectsPageNotification2'));
  };

  const createStacks = (project) => {
    if (project.stack.length !== 0) {
      return (
        <Flex gap="small">
          <Space>
            <Text italic>{t('stacks')}:</Text>
            {project.stack.map((tech, index) => (
              <Text keyboard key={index}>
                {tech}
                {index !== project.stack.length - 1
                  ? tech.includes(',')
                    ? ''
                    : ','
                  : ''}
              </Text>
            ))}
          </Space>
        </Flex>
      );
    }
    return null;
  };

  return (
    <div style={{ padding: '20px' }}>
      <Form
        className="projectspage"
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item className="projectspage__form-item">
          <Title level={3} className="projectspage__title">
            {t('projectsPageTitle')}
          </Title>
          <Text type="secondary">{t('projectsPageDescription')}</Text>
        </Form.Item>
        <Form.Item
          className="projectspage__form-item"
          name="title"
          label={t('projectName')}
          rules={[{ required: true, message: 'Enter the project name!' }]}
        >
          <Input placeholder={t('projectName')} />
        </Form.Item>

        <Form.Item
          className="projectspage__form-item"
          name="description"
          label={t('description')}
          rules={[
            { required: true, message: 'Enter the project description!' },
          ]}
        >
          <TextArea rows={4} placeholder={t('description')} />
        </Form.Item>

        <Form.Item
          className="projectspage__form-item"
          name="stack"
          label={t('stacks')}
          rules={[{ required: true, message: 'Enter the stack!' }]}
        >
          <Input onChange={handleStackInputChange} placeholder={t('stacks')} />
        </Form.Item>

        <Form.Item
          className="projectspage__form-item"
          name="repository"
          label={t('repositoryLink')}
          rules={[{ type: 'url', message: 'Enter the correct link!' }]}
        >
          <Input placeholder="https://www.example.com" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
            {t('buttonAddProject')}
          </Button>
        </Form.Item>
      </Form>

      <List
        dataSource={projects}
        renderItem={(project, index) => (
          <List.Item key={index}>
            <Card
              className=""
              style={{ width: '100%' }}
              title={project.title}
              extra={
                <Space>
                  <Tooltip title={t('promptText2')} color="blue">
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkOutlined />
                    </a>
                  </Tooltip>
                  <Tooltip title={t('promptText1')} color="blue">
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(project)}
                    />
                  </Tooltip>
                </Space>
              }
            >
              <Flex gap="small" vertical>
                <Text strong>{project.description}</Text>
                {createStacks(project)}
              </Flex>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ProjectsPage;
