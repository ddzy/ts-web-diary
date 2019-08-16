import * as React from 'react';
import * as IO from 'socket.io-client';
import {
  notification,
} from 'antd';
import {
  connect,
} from 'react-redux';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import { History } from 'history';

import {
  IInitialState,
  reduxHandleCheckAuth,
} from './AuthRoute.redux';



export interface IAuthRouteProps extends RouteComponentProps<any> {
  history: History;

  AuthRouteReducer: IInitialState;
  reduxHandleCheckAuth: (callback: () => void) => void;
};
export interface IAuthRouteState {
  statusIO: SocketIOClient.Socket;
};


const AuthRoute = React.memo<IAuthRouteProps>((
  props: IAuthRouteProps,
): JSX.Element => {
  const [state] = React.useState<IAuthRouteState>({
    statusIO: IO('ws://localhost:8888/status'),
  });

  React.useEffect(() => {
    props.reduxHandleCheckAuth(() => {
      const { isAuth } = props.AuthRouteReducer;

      // 登录凭证已过期
      if (!isAuth) {
        const userId = localStorage.getItem('userid') || '';

        if (userId) {
          // socket处理用户登出(离线)
          state.statusIO.emit('sendUserOffLine', {
            userId,
          });

          // 清楚用户相关信息
          localStorage.removeItem('userid');
          notification.error({
            message: '错误',
            description: 'token已失效, 请重新登录!',
          });
          props.history.push('/login');
        }
      }
    });

    return () => {
      state.statusIO.close();
    }
  }, []);

  return (
    <React.Fragment />
  );
});


function mapStateToProps(state: any) {
  return {
    AuthRouteReducer: state.AuthRouteReducer,
  };
}
function mapDispatchToProps() {
  return {
    reduxHandleCheckAuth,
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps(),
)(AuthRoute));