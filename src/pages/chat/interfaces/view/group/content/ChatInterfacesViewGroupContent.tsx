import * as React from 'react';

import {
  ContentWrapper,
  ContentMain,
  ContentMainList,
  // ContentMainItem,
} from './style';
// import { formatTime } from 'utils/utils';
// import BaseChatMessage from 'components/widget/base_chat_message/BaseChatMessage';
import { IBasicChatGroupInfo } from 'pages/basic.types';


export interface IChatInterfacesViewGroupContentProps {
  groupInfo: IBasicChatGroupInfo; // 群聊信息
};

const ChatInterfacesViewGroupContent = React.memo((props: IChatInterfacesViewGroupContentProps) => {
  // const messageList = [
  //   {
  //     id: '1',
  //     avatar: '',
  //     name: '小红',
  //     time: formatTime(Date.now()),
  //     content: '今日新增了两个代码片段, 加快开发效率',
  //   },
  //   {
  //     id: '2',
  //     avatar: '',
  //     name: '阳哥',
  //     time: formatTime(Date.now()),
  //     content: '不错啊, 继续加油',
  //   },
  //   {
  //     id: '3',
  //     avatar: '',
  //     name: '小黑',
  //     time: formatTime(Date.now()),
  //     content: '我今天掌握了闭包的使用',
  //   },
  //   {
  //     id: '4',
  //     avatar: '',
  //     name: '咪咪老师',
  //     time: formatTime(Date.now()),
  //     content: '大家都很棒',
  //   },
  //   {
  //     id: '5',
  //     avatar: '',
  //     name: '前端布道师',
  //     time: formatTime(Date.now()),
  //     content: '今日前端新闻播报',
  //   },
  // ];

  /**
   * @description 初始化群聊消息列表
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/19
   */
  function _initMessageList() {
    // const messageList = props.groupInfo.messages;

    // return messageList.map((v) => {
    //   return (
    //     <ContentMainItem key={v._id}>
    //       <BaseChatMessage
    //         isSend={true}
    //         chatMessageInfo={{
    //           // ...v,
    //           // content_type: 'plain',
    //           id: v._id,
    //         }}
    //       />
    //     </ContentMainItem>
    //   );
    // });
    return [];
  }

  return (
    <ContentWrapper>
      <ContentMain>
        <ContentMainList>
          {_initMessageList()}
        </ContentMainList>
      </ContentMain>
    </ContentWrapper>
  );
});

export default ChatInterfacesViewGroupContent;