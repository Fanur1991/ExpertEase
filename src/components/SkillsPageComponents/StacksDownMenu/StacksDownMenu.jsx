import React from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, Button, Flex, Space } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { selectStacks } from '../../../redux/slices/stacksSlice';
import { selectCategories } from '../../../redux/slices/categoriesSlice';
import { selectSkills } from '../../../redux/slices/skillsSlice';
import { useTranslation } from 'react-i18next';

import './StacksDownMenu.less';

const StacksDownMenu = () => {
  const { url } = useParams();
  const stacks = useSelector(selectStacks);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const items = stacks.data.map((stack, index) => {
    return {
      label: (
        <Flex align="center" justify="start">
          <NavLink
            style={{ color: '#8c8c8c' }}
            className={url === stack.url ? 'active' : ''}
            to={`skills/${stack.url}`}
          >
            <Space size="small">
              <UserOutlined />
              {stack.name}
            </Space>
          </NavLink>
        </Flex>
      ),
      key: 1 + index,
    };
  });

  return (
    <Dropdown
      overlayClassName="stacksdownmenu"
      menu={{ items }}
      trigger={['click']}
      placement="bottomLeft"
      arrow
    >
      <Button
        onClick={(e) => e.preventDefault()}
        className="stacksdownmenu__button"
        icon={<DownOutlined />}
      >
        Choose Skills
      </Button>
    </Dropdown>
  );
};

export default StacksDownMenu;
