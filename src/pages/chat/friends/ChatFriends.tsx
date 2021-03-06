import * as React from 'react';
import {
  Table,
  Divider,
  Button,
  Avatar,
  Popconfirm,
  notification,
  message,
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
import { chatSingleIOClient } from 'services/websocket';


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
    chatIOClient: chatSingleIOClient,
    friendList: [],
  });

  React.useEffect(() => {
    _getFriendListFromServer();
  }, []);

  /**
   * @description 从后台获取好友列表
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/15
   */
  function _getFriendListFromServer() {
    const userId = localStorage.getItem('userid');

    if (!userId) {
      notification.error({
        message: '错误',
        description: '用户信息已丢失, 请重新登录',
      });

      props.history.push('/login');
    } else {
      query({
        method: 'GET',
        url: '/api/chat/single/info/friend/list',
        jsonp: false,
        data: {
          userId,
        },
      }).then((res) => {
        const resCode = res.code;
        const resMessage = res.message;
        const resData = res.data;

        if (resCode === 0) {
          const pendingFriendList = resData.friendList;

          setState({
            ...state,
            friendList: pendingFriendList,
          });
        } else {
          message.error(resMessage);
        }
      });
    }
  }

  /**
   * @description 初始化好友列表
   */
  function _initTableColumn() {
    const columns = [
      {
        title: '头像',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text: any, record: any) => (
          <Avatar src={record.avatar} icon="user" size="large" />
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