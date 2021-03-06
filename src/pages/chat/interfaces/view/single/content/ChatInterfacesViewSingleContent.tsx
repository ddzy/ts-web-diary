import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroller';
import RcViewer from '@hanyk/rc-viewer';
import {
  withRouter,
  RouteComponentProps,
  match,
} from 'react-router-dom';
import {
} from 'antd';
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';

import {
  ContentWrapper,
  ContentMain,
  ContentMainList,
  ContentMainItem,
} from './style';
import { formatTime } from 'utils/utils';
import BaseChatMessage from 'components/widget/base_chat_message/BaseChatMessage';
import { IBasicChatSingleMessageInfo, IBasicChatMessgaeType } from 'pages/basic.types';


export interface IChatInterfacesViewSingleContentProps extends RouteComponentProps {
  match: match<{
    // ? 单聊唯一标识id
    id: string;
  }>;

  // ? 单聊消息列表
  singleChatMessage: IBasicChatSingleMessageInfo[];
  // ? 分页相关: 标识是否处于发送状态, 便于进行吸顶处理
  isMessageSend: boolean;
  // ? 分页相关: 是否还有更多消息
  hasMoreMessage: boolean;
  // ? 分页相关: 处理消息分页
  onLoadMore: (page: number) => void;
};
export interface IChatInterfacesViewSingleContentState { };


const ChatInterfacesViewSingleContent = React.memo((props: IChatInterfacesViewSingleContentProps) => {
  const $scrollWrapper = React.useRef(null);

  React.useEffect(() => {
    _setScrollWrapperToAffixBottom();
  }, [props.isMessageSend]);

  /**
   * [初始化] - 单聊消息列表
   */
  function _initMessageList() {
    const { singleChatMessage } = props;
    const userId = localStorage.getItem('userid');

    if (singleChatMessage.length) {
      return singleChatMessage.map((v) => {
        // 根据发送方 or 接收方初始化相关信息
        const fromMemberId = v.from_member_id._id;
        const fromUserId = v.from_member_id.user_id._id;
        const fromUserName = v.from_member_id.user_id.username;
        const fromUserAvatar = v.from_member_id.user_id.useravatar;
        const content = v.content;
        const contentType = v.content_type as IBasicChatMessgaeType;
        const time = formatTime(v.create_time);

        const isSend = userId === fromUserId;
        const chatMessageInfo = {
          id: fromMemberId,
          name: fromUserName,
          avatar: fromUserAvatar,
          time,
          content,
          content_type: contentType,
        };

        return (
          <CSSTransition
            key={v._id}
            timeout={300}
            exit={false}
            classNames={'fadeTranslateZ'}
          >
            <ContentMainItem>
              <BaseChatMessage
                isSend={isSend}
                chatMessageInfo={chatMessageInfo}
              />
            </ContentMainItem>
          </CSSTransition>
        );
      });
    }

    return [];
  }

  /**
   * [设置] - 聊天消息视图吸顶, 避免自行滚动
   */
  function _setScrollWrapperToAffixBottom() {
    if ($scrollWrapper && $scrollWrapper.current) {
      const oDiv = ($scrollWrapper.current) as unknown as HTMLDivElement;

      oDiv.scrollTop = oDiv.scrollHeight;
    }
  }

  return (
    <ContentWrapper>
      <ContentMain ref={$scrollWrapper}>
        <RcViewer
          options={{
            url: 'data-src',
            button: false,
          }}
        >
          <InfiniteScroll
            isReverse={true}
            useWindow={false}
            hasMore={props.hasMoreMessage}
            pageStart={1}
            initialLoad={false}
            getScrollParent={() => $scrollWrapper.current}
            loadMore={props.onLoadMore}
          >
            <ContentMainList>
              <TransitionGroup>
                {_initMessageList()}
              </TransitionGroup>
            </ContentMainList>
          </InfiniteScroll>
        </RcViewer>
      </ContentMain>
    </ContentWrapper>
  );
});

export default withRouter(ChatInterfacesViewSingleContent);