import * as React from 'react';
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

const initialState = {
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

type IChatInterfacesViewSingleState = typeof initialState;
export interface IStaticChatMessageParams {

};

const ChatInterfacesViewSingle = React.memo((props: IChatInterfacesViewSingleProps) => {
  const [state, setState] = React.useState<IChatInterfacesViewSingleState>(initialState);

  React.useEffect(() => {
    _getSingleChatMessageList();
  }, [props.match.params.id]);

  /**
   * 后台 - 获取单聊信息
   */
  function _getSingleChatMessageList() {
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
   * 处理 - 发送聊天消息
   */
  function handleChatMessageSend(
    messageInfo: {
      type: string,
      content: string,
    },
  ) {
    // TODO 组装聊天消息到message列表
  }

  return (
    <SingleWrapper>
      <SingleMain>
        {/* 顶部标题栏 */}
        <ChatInterfacesViewSingleTitle toMemberInfo={state.singleChatInfo.to_member_id}/>

        {/* 中部消息栏 */}
        <ChatInterfacesViewSingleContent />

        {/* 底部操作栏 */}
        <ChatInterfacesViewSingleAction
          onChatMessageSend={handleChatMessageSend}
        />
      </SingleMain>
    </SingleWrapper>
  );
});

export default withRouter(ChatInterfacesViewSingle);