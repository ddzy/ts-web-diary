import * as React from 'react';
import {
  List,
  Avatar,
  Badge,
  notification,
} from 'antd';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import {
  MessageWrapper,
  MessageMain,
} from './style';
import { query } from 'services/request';


export interface IChatInterfacesNavMessageProps extends RouteComponentProps { };
export interface IChatInterfacesNavMessageState {
  // ? 聊天历史列表
  chatMemoryList: IStaticChatMemoryListItem[];
};
export interface IStaticChatMemoryListItem {
  // ? 聊天类型 single | group
  chat_type: string;
  // ? 聊天唯一标识id
  // ? single状态下为自定义id, group则为自增id
  chat_id: string;
  // ? 聊天名称
  chat_name: string;
  // ? 聊天头像
  chat_avatar: string;
  // ? 最新的聊天内容
  last_message_content: string;
  // ? 未读消息总数
  unread_message_total: number;
};

const ChatInterfacesNavMessage = React.memo((props: IChatInterfacesNavMessageProps) => {
  const [state, setState] = React.useState<IChatInterfacesNavMessageState>({
    chatMemoryList: [],
  });

  React.useEffect(() => {
    _getChatMemoryList();
  }, []);

  /**
   * 后台 - 获取聊天历史列表
   */
  function _getChatMemoryList() {
    const userId = localStorage.getItem('userid');

    if (!userId || typeof userId !== 'string') {
      notification.error({
        message: '错误',
        description: '登录凭证已过期, 请重新登录',
      });

      props.history.push('/login');
    } else {
      query({
        method: 'GET',
        url: '/api/chat/info/memory/list',
        jsonp: false,
        data: {
          userId,
        },
      }).then((res) => {
        const { chatMemoryList } = res.data;

        setState({
          ...state,
          chatMemoryList,
        });
      });
    }
  }

  return (
    <MessageWrapper>
      <MessageMain>
        <List
          dataSource={state.chatMemoryList}
          renderItem={(item: IStaticChatMemoryListItem) => (
            <List.Item key={item.chat_id}>
              <List.Item.Meta
                avatar={
                  <Badge count={item.unread_message_total}>
                    <Avatar src={item.chat_avatar} size="large" />
                  </Badge>
                }
                title={item.chat_name}
                description={item.last_message_content || '暂无消息记录'}
              />
            </List.Item>
          )}
        />
      </MessageMain>
    </MessageWrapper>
  );
});

export default withRouter(ChatInterfacesNavMessage);