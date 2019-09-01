/**
 * @name ChatFriends
 * @description 好友列表区块
 * @author ddzy
 * @since 2019-7-27
 * @license MIT
 */

import * as React from 'react';
import * as IOClient from 'socket.io-client';
import {
  Table,
  Divider,
  Button,
  Avatar,
  Popconfirm,
  notification,
} from 'antd';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import {
  FriendsWrapper,
  FriendsMain,
  FriendsMainTitle,
  FriendsMainTitleInner,
  FriendsMainTitleInnerText,
} from './style';
import { query } from 'services/request';


export interface IChatFriendsProps extends RouteComponentProps {
  // ? 处理 - 当前tabpane跳转至`interfaces`
  onTabsPaneAdaptPathname: (
    type: string,
  ) => void;
};
export interface IChatFriendsState {
  // ? 聊天相关的Websocket
  chatIOClient: SocketIOClient.Socket;
  // ? 好友列表
  friendList: IStaticFriendListItem[];
};
export interface IStaticFriendListItem {
  _id: string;
  username: string;
  useravatar: string;
};

const ChatFriends = React.memo((props: IChatFriendsProps) => {
  const [state, setState] = React.useState<IChatFriendsState>({
    chatIOClient: IOClient('ws://localhost:8888/chat'),
    friendList: [],
  });

  React.useEffect(() => {
    _getFriendList();
  }, []);

  /**
   * 后台 - 获取好友列表
   */
  function _getFriendList() {
    const userId = localStorage.getItem('userid');

    if (!userId) {
      notification.error({
        message: '错误',
        description: '登录凭证已过期, 请重新登录',
      });

      props.history.push('/login');
    } else {
      query({
        method: 'GET',
        url: '/api/chat/info/friend/list',
        jsonp: false,
        data: {
          userId,
        },
      }).then(({ data: { friendList } }) => {
        setState({
          ...state,
          friendList
        });
      });
    }
  }

  /**
   * 初始化 - antd表格列
   */
  function _initTableColumn() {
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
        title: '操作',
        key: 'action',
        render: (text: any, record: any) => (
          <React.Fragment>
            <Popconfirm
              title={'确认要和当前用户对话吗?'}
              onConfirm={() => { handleChat(record) }}
            >
              <Button type="primary">发起聊天</Button>
            </Popconfirm>
            <Divider type="vertical" />
            <Popconfirm
              title={'确认要删除该好友吗?'}
            >
              <Button type="danger">删除好友</Button>
            </Popconfirm>
          </React.Fragment>
        ),
      },
    ];

    return columns;
  }

  /**
   * 初始化 - 表格数据
   */
  function _initTableDataSource() {
    if (!state.friendList.length) {
      return [];
    } else {
      return state.friendList.map((friend) => {
        return {
          key: friend._id,
          avatar: friend.useravatar,
          name: friend.username,
        };
      });
    }
  }

  /**
   * [处理] - 发起好友单聊
   * @param value 表格每一行的数据
   */
  function handleChat(
    value: {
      key: string,
    },
  ) {
    // 单聊接收方
    const toId = value.key;
    // 单聊发起方
    const fromId = localStorage.getItem('userid');

    if (!fromId) {
      notification.error({
        message: '错误',
        description: '登录凭证已过期, 请重新登录',
      });

      return props.history.push('/login');
    } else {
      // query({
      //   method: 'POST',
      //   url: '/api/chat/create/single',
      //   jsonp: false,
      //   data: {
      //     fromId,
      //     toId,
      //   },
      // }).then(() => {
      //   props.onTabsPaneAdaptPathname('interfaces');
      // });

      state.chatIOClient.emit('sendChatSingleCreateMemory', {
        fromId,
        toId,
      });

      props.onTabsPaneAdaptPathname('interfaces');
    }
  }

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
          columns={_initTableColumn()}
          dataSource={_initTableDataSource()}
        />
      </FriendsMain>
    </FriendsWrapper>
  );
});

export default withRouter(ChatFriends);