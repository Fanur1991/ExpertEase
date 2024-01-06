import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Input, Button, Form, List, Space, Typography, Flex } from 'antd';
import { PlusOutlined, LinkOutlined, DeleteOutlined } from '@ant-design/icons';
import { v4 as uuid } from 'uuid';
import {
  addProjects,
  deleteProjects,
  fetchProjects,
  selectUserData,
} from '../../redux/slices/userDataSlice';
import { openMessage } from '../../utils/openMessage';

import './ProjectsPage.less';

const { TextArea } = Input;
const { Title, Text } = Typography;

const ProjectsPage = () => {
  const [stacks, setStacks] = useState([]);
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
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
    openMessage('success', 'The project has been added');
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
    openMessage('success', 'The project has been deleted');
  };

  const createStacks = (project) => {
    if (project.stack.length !== 0) {
      return (
        <Flex gap="small">
          <Space>
            <Text italic>Stacks:</Text>
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
            Projects
          </Title>
          <Text type="secondary">
            Use the form below to describe your projects, technology stack and
            attach a link to the repository
          </Text>
        </Form.Item>
        <Form.Item
          className="projectspage__form-item"
          name="title"
          label="Project name"
          rules={[{ required: true, message: 'Enter the project name!' }]}
        >
          <Input placeholder="Project name" />
        </Form.Item>

        <Form.Item
          className="projectspage__form-item"
          name="description"
          label="Description"
          rules={[
            { required: true, message: 'Enter the project description!' },
          ]}
        >
          <TextArea rows={4} placeholder="Description" />
        </Form.Item>

        <Form.Item
          className="projectspage__form-item"
          name="stack"
          label="Stack"
          rules={[{ required: true, message: 'Enter the stack!' }]}
        >
          <Input onChange={handleStackInputChange} placeholder="Stacks" />
        </Form.Item>

        <Form.Item
          className="projectspage__form-item"
          name="repository"
          label="Repository link"
          rules={[{ type: 'url', message: 'Enter the correct link!' }]}
        >
          <Input placeholder="https://www.example.com" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
            Add Project
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
                  <a
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkOutlined />
                  </a>
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(project)}
                  />
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
