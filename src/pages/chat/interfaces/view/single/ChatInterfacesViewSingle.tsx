import * as React from 'react';
import * as IO from 'socket.io-client';
import {
  withRouter,
  RouteComponentProps,
  match,
} from 'react-router-dom';
import {
  notification,
} from 'antd';

import {
  SingleWrapper,
  SingleMain,
} from './style';
import ChatInterfacesViewSingleTitle from './title/ChatInterfacesViewSingleTitle';
import ChatInterfacesViewSingleContent from './content/ChatInterfacesViewSingleContent';
import ChatInterfacesViewSingleAction from './action/ChatInterfacesViewSingleAction';
import { query } from 'services/request';


export interface IChatInterfacesViewSingleProps extends RouteComponentProps {
  match: match<{
    // ? 单聊唯一标识
    id: string,
  }>;
};
type IChatInterfacesViewSingleState = typeof initialState;


const chatSocket = IO('http://localhost:8888/chat');
const initialState = {
  // ? 单聊信息
  singleChatInfo: {
    from_member_id: {
      _id: '',
      chat_id: '',
      user_id: {
        _id: '',
        username: '',
      },
    },
    to_member_id: {
      _id: '',
      chat_id: '',
      user_id: {
        _id: '',
        username: '',
      },
    },
    message: [],
  },
};


const ChatInterfacesViewSingle = React.memo((props: IChatInterfacesViewSingleProps) => {
  const [state, setState] = React.useState<IChatInterfacesViewSingleState>(initialState);

  React.useEffect(() => {
    _setSingleChatMessageInfo();
  });

  React.useEffect(() => {
    _getSingleChatMessageInfo();
  }, [props.match.params.id]);

  /**
   * [后台] - 获取单聊信息
   */
  function _getSingleChatMessageInfo() {
    const userId = localStorage.getItem('userid');
    const chatId = props.match.params.id;
    const chatType = 'single';

    if (!userId || typeof userId !== 'string') {
      notification.error({
        message: '错误',
        description: '登录凭证已过期, 请重新登录!',
      });

      props.history.push('/login');
    } else {
      if (!chatId || typeof chatId !== 'string') {
        notification.error({
          message: '错误',
          description: '聊天凭证无效, 请重新发起单聊',
        });

        props.history.push('/chat/friends');
      } else {
        query({
          url: '/api/chat/info/single',
          method: 'GET',
          jsonp: false,
          data: {
            userId,
            chatId,
            chatType,
          },
        }).then((res) => {
          const { singleChatInfo } = res.data;

          setState({
            ...state,
            singleChatInfo,
          });
        });
      }
    }
  }

  /**
   * [更新] - 单聊信息
   */
  function _setSingleChatMessageInfo() {
    // ? 先移除所有的监听器, 避免出现指数增长的情况
    chatSocket.removeAllListeners();

    // * 接收聊天信息
    // ? 不能在componentDidMount时监听, 只会监听一个聊天会话
    chatSocket.on('receiveChatSingleMessage', (message: any) => {
      setState({
        ...state,
        singleChatInfo: {
          ...state.singleChatInfo,
          message: state.singleChatInfo.message.concat(message),
        },
      });
    });
  }

  /**
   * [处理] - 发送聊天消息
   */
  function handleChatMessageSend(
    messageInfo: {
      type: string,
      content: string,
    },
  ) {
    // TODO 组装聊天消息
    const chatId = props.match.params.id;
    const chatType = 'single';
    const fromUserId = state.singleChatInfo.from_member_id.user_id._id;
    const toUserId = state.singleChatInfo.to_member_id.user_id._id;
    const fromMemberId = state.singleChatInfo.from_member_id._id;
    const toMemberId = state.singleChatInfo.to_member_id._id;
    const contentType = messageInfo.type;
    const content = messageInfo.content;

    const userId = localStorage.getItem('userid');
    const newFromUserId = userId === fromUserId
      ? fromUserId
      : userId === toUserId
        ? toUserId
        : '';
    const newToUserId = userId === fromUserId
      ? toUserId
      : userId === toUserId
        ? fromUserId
        : '';
    const newFromMemberId = userId === fromUserId
      ? fromMemberId
      : userId === toUserId
        ? toMemberId
        : '';
    const newToMemberId = userId === fromUserId
      ? toMemberId
      : userId === toUserId
        ? fromMemberId
        : '';

    chatSocket.emit('sendChatSingleMessage', {
      chatId,
      chatType,
      fromUserId: newFromUserId,
      toUserId: newToUserId,
      fromMemberId: newFromMemberId,
      toMemberId: newToMemberId,
      contentType,
      content,
    });
  }

  return (
    <SingleWrapper>
      <SingleMain>
        {/* 顶部标题栏 */}
        <ChatInterfacesViewSingleTitle singleChatInfo={state.singleChatInfo} />

        {/* 中部消息栏 */}
        <ChatInterfacesViewSingleContent
          singleChatMessage={state.singleChatInfo.message}
        />

        {/* 底部操作栏 */}
        <ChatInterfacesViewSingleAction
          onChatMessageSend={handleChatMessageSend}
        />
      </SingleMain>
    </SingleWrapper>
  );
});

export default withRouter(ChatInterfacesViewSingle);