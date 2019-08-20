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
import ChatInterfacesViewSingleTitleInfoContent from './content/ChatInterfacesViewSingleTitleInfoContent';


export interface IChatInterfacesViewSingleTitleInfoProps {

};
export interface IChatInterfacesViewSingleTitleInfoState {
  // ? 是否显示单聊信息抽屉
  isShowDrawer: boolean;
};


const ChatInterfacesViewSingleTitleInfo = React.memo((props: IChatInterfacesViewSingleTitleInfoProps) => {
  const [state, setState] = React.useState<IChatInterfacesViewSingleTitleInfoState>({
    isShowDrawer: false,
  });

  /**
   * [处理] - 显示单聊信息模态框
   */
  function handleShowDrawer() {
    setState({
      ...state,
      isShowDrawer: true,
    });
  }

  /**
   * [处理] - 隐藏单聊信息模态框
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
        <Tooltip title={'单聊信息'}>
          <Icon
            type="info-circle"
            style={{
              color: '#1da57a',
              fontSize: '22px',
              cursor: 'pointer',
            }}
            onClick={handleShowDrawer}
          />
        </Tooltip>

        {/* 单聊信息抽屉 */}
        <Drawer
          width={'400px'}
          visible={state.isShowDrawer}
          destroyOnClose={true}
          onClose={handleCloseDrawer}
        >
          {/* 单聊信息抽屉内容 */}
          <ChatInterfacesViewSingleTitleInfoContent />
        </Drawer>
      </InfoMain>
    </InfoWrapper>
  );
});

export default ChatInterfacesViewSingleTitleInfo;