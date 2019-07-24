import * as React from 'react';
import {
  Table,
  Divider,
  Button,
  Avatar,
  Popconfirm,
} from 'antd';

import {
  FriendsWrapper,
  FriendsMain,
  FriendsMainTitle,
  FriendsMainTitleInner,
  FriendsMainTitleInnerText,
} from './style';


export interface IChatFriendsProps {

};

const ChatFriends = React.memo((props: IChatFriendsProps) => {
  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text: any) => (
        <Avatar icon="user" size="large" />
      ),
    },
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '成为好友时间',
      dataIndex: 'beginAt',
      key: 'beginAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <React.Fragment>
          <Popconfirm
            title={'确认要和当前用户对话吗?'}
          >
            <Button type="primary">发起聊天</Button>
          </Popconfirm>
          <Divider type="vertical" />
          <Popconfirm
            title={'确认要删除该好友吗? 同时会取消关注他.'}
          >
            <Button type="danger">删除好友</Button>
          </Popconfirm>
        </React.Fragment>
      ),
    },
  ];

  const dataSource = [
    {
      key: '1',
      avatar: '',
      name: '小红',
      beginAt: '2019/7/24 14:20',
    },
    {
      key: '2',
      avatar: '',
      name: '小黑',
      beginAt: '2019/7/24 14:20',
    },
    {
      key: '3',
      avatar: '',
      name: '胡老师',
      beginAt: '2019/7/24 14:20',
    },
    {
      key: '4',
      avatar: '',
      name: '老妈',
      beginAt: '2019/7/24 14:20',
    },
    {
      key: '5',
      avatar: '',
      name: '老爸',
      beginAt: '2019/7/24 14:20',
    },
    {
      key: '6',
      avatar: '',
      name: '老爸',
      beginAt: '2019/7/24 14:20',
    },
    {
      key: '7',
      avatar: '',
      name: '老爸',
      beginAt: '2019/7/24 14:20',
    },
    {
      key: '8',
      avatar: '',
      name: '老爸',
      beginAt: '2019/7/24 14:20',
    },
    {
      key: '9',
      avatar: '',
      name: '老爸',
      beginAt: '2019/7/24 14:20',
    },
    {
      key: '10',
      avatar: '',
      name: '老爸',
      beginAt: '2019/7/24 14:20',
    },
  ];

  return (
    <FriendsWrapper>
      <FriendsMain>
        <Table
          bordered
          title={() => (
            <FriendsMainTitle>
              <FriendsMainTitleInner>
                <FriendsMainTitleInnerText>
                  我的好友列表
                </FriendsMainTitleInnerText>
              </FriendsMainTitleInner>
            </FriendsMainTitle>
          )}
          pagination={{
            defaultPageSize: 5,
          }}
          columns={columns}
          dataSource={dataSource}
        />
      </FriendsMain>
    </FriendsWrapper>
  );
});

export default ChatFriends;