import * as React from 'react';
import * as IO from 'socket.io-client';
import {
  Popover,
  Icon,
} from 'antd';

import {
  StatusWrapper,
  StatusMain,
  MainPopContent,
  MainPopContentInner,
  MainPopContentInnerList,
  MainPopContentInnerItem,
} from './style';
import StatusOnLine from './online/statusOnLine';


export interface IStatusProps { };
export interface IStatusState {
  statusIO: SocketIOClient.Socket;

  // ? 在线用户各种信息
  userOnLineInfo: {
    online_total: number,
  };
};

const Status = React.memo((props: IStatusProps) => {
  const [state, setState] = React.useState<IStatusState>({
    statusIO: IO('ws://localhost:8888/status'),
    userOnLineInfo: {
      online_total: 0,
    },
  });

  React.useEffect(() => {
    // socket获取实时的在线用户信息
    state.statusIO.on('receiveUserOnLineInfo', (userOnLineInfo: {
      online_total: number;
    }) => {
      setState({
        ...state,
        userOnLineInfo: {
          ...state.userOnLineInfo,
          online_total: userOnLineInfo.online_total,
        },
      });
    });

    return () => {
      state.statusIO.close();
    }
  }, []);

  /**
   * [初始化] - 气泡框内容
   */
  function _initPopoverContent() {
    return (
      <MainPopContent>
        <MainPopContentInner>
          <MainPopContentInnerList>
            {/* 应用实时在线人数 */}
            <MainPopContentInnerItem>
              <StatusOnLine
                userOnLineTotal={state.userOnLineInfo.online_total}
              />
            </MainPopContentInnerItem>
          </MainPopContentInnerList>
        </MainPopContentInner>
      </MainPopContent>
    );
  }

  return (
    <Popover
      placement={'left'}
      mouseEnterDelay={.5}
      content={_initPopoverContent()}
    >
      <StatusWrapper>
        <StatusMain>
          <Icon
            type="bulb"
            theme="filled"
            style={{
              color: '#1da57a',
              fontSize: '22px',
            }}
            title={'站点状态'}
          />
        </StatusMain>
      </StatusWrapper>
    </Popover>
  );
});

export default Status;