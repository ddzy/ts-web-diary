import * as React from 'react';
import {
  Table,
  Divider,
  Button,
  Avatar,
  Popconfirm,
} from 'antd';

import {
  JoinedWrapper,
  JoinedMain,
} from './style';


export interface IChatGroupsJoinedProps {

};

const ChatGroupsJoined = React.memo((props: IChatGroupsJoinedProps) => {
  const columns = [
    {
      title: '群聊头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text: any) => (
        <Avatar icon="user" size="large" />
      ),
    },
    {
      title: '群聊名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '群聊人数',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: '加入时间',
      dataIndex: 'joinAt',
      key: 'joinAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <React.Fragment>
          <Popconfirm
            title={'确认要进入该群聊吗?'}
          >
            <Button type="primary">进入群聊</Button>
          </Popconfirm>
          <Divider type="vertical" />
          <Popconfirm
            title={'确认要退出该群聊吗?'}
          >
            <Button type="danger">退出群聊</Button>
          </Popconfirm>
        </React.Fragment>
      ),
    },
  ];

  const dataSource = [
    {
      key: '1',
      avatar: '',
      name: 'web前端技术交流群',
      total: 2000,
      joinAt: '2019/7/24 14:20',
    },
    {
      key: '2',
      avatar: '',
      name: 'JS-FRONTEND',
      total: 1500,
      joinAt: '2019/7/24 14:20',
    },
    {
      key: '3',
      avatar: '',
      name: 'web前端小白',
      total: 320,
      joinAt: '2019/7/24 14:20',
    },
    {
      key: '4',
      avatar: '',
      name: '前端技术交流群',
      total: 199,
      joinAt: '2019/7/24 14:20',
    },
    {
      key: '5',
      avatar: '',
      name: 'vscode/git主群',
      total: 4988,
      joinAt: '2019/7/24 14:20',
    },
    {
      key: '6',
      avatar: '',
      name: '我叫群名称',
      total: 30,
      joinAt: '2019/7/24 14:20',
    },
  ];

  return (
    <JoinedWrapper>
      <JoinedMain>
        <Table
          bordered
          pagination={{
            defaultPageSize: 5,
          }}
          columns={columns}
          dataSource={dataSource}
        />
      </JoinedMain>
    </JoinedWrapper>
  );
});

export default ChatGroupsJoined;