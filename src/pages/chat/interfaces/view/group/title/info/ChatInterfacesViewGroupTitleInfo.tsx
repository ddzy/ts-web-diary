import * as React from 'react';
import {
  Icon,
  Tooltip,
  Drawer,
} from 'antd';

import {
  InfoWrapper,
  InfoMain,
} from './style';
import ChatInterfacesViewGroupTitleInfoContent from './content/ChatInterfacesViewGroupTitleInfoContent';
import { IBasicChatGroupInfo } from 'pages/basic.types';


export interface IChatInterfacesViewGroupTitleInfoProps {
  groupInfo: IBasicChatGroupInfo; // 群聊信息
};
export interface IChatInterfacesViewGroupTitleInfoState {
  // ? 是否显示群聊信息抽屉
  isShowDrawer: boolean;
};


const ChatInterfacesViewGroupTitleInfo = React.memo((props: IChatInterfacesViewGroupTitleInfoProps) => {
  const [state, setState] = React.useState<IChatInterfacesViewGroupTitleInfoState>({
    isShowDrawer: false,
  });

  /**
   * @description 显示群聊信息模态框
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/19
   */
  function handleShowDrawer() {
    setState({
      ...state,
      isShowDrawer: true,
    });
  }

  /**
   * @description 隐藏群聊信息模态框
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/19
   */
  function handleCloseDrawer() {
    setState({
      ...state,
      isShowDrawer: false,
    });
  }

  return (
    <InfoWrapper>
      <InfoMain>
        <Tooltip title={'群聊信息'}>
          <Icon
            type="align-right"
            style={{
              color: '#1da57a',
              fontSize: '22px',
              cursor: 'pointer',
            }}
            onClick={handleShowDrawer}
          />
        </Tooltip>

        {/* 群聊信息抽屉 */}
        <Drawer
          width={'400px'}
          visible={state.isShowDrawer}
          destroyOnClose={true}
          onClose={handleCloseDrawer}
        >
          {/* 群聊信息抽屉内容 */}
          <ChatInterfacesViewGroupTitleInfoContent
            groupInfo={props.groupInfo}
          />
        </Drawer>
      </InfoMain>
    </InfoWrapper>
  );
});

export default ChatInterfacesViewGroupTitleInfo;