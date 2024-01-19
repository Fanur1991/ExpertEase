import React from 'react';
import { List, Skeleton, Flex, Text, Tag, Rate, Space } from 'antd';
import { useTranslation } from 'react-i18next';

const SkillItem = ({ skill, loading }) => {
  const { t } = useTranslation();

  return (
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
              <Text style={{ fontWeight: 500 }}>{skill.name}</Text>
            )}
            <Flex align="center" justify="center" gap="middle">
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
                      <span style={{ color: 'red' }}>0</span>{' '}
                      <span
                        style={{
                          color: '#8c8c8c',
                          fontWeight: 400,
                        }}
                      >
                        {t('of')}
                      </span>{' '}
                      <span style={{ color: '#52c41a' }}>5</span>
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
            <Flex wrap="wrap" align="center" justify="start" gap="small">
              {skill.details.map((detail, index) => (
                <Tag key={index} color="purple">
                  {detail}
                </Tag>
              ))}
            </Flex>
          </Flex>
        }
      />
    </List.Item>
  );
};

export default SkillItem;
