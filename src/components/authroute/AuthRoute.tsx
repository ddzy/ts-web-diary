import * as React from 'react';
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



export interface IAuthRouteProps extends RouteComponentProps<IAuthRouteProps> {
  history: History;

  AuthRouteReducer: IInitialState;
  reduxHandleCheckAuth: (callback: () => void) => void;
};


const AuthRoute = React.memo<IAuthRouteProps>((
  props: IAuthRouteProps,
): JSX.Element => {
  React.useEffect(() => {
    props.reduxHandleCheckAuth(() => {
      const { isAuth } = props.AuthRouteReducer;

      if (!isAuth) {
        localStorage.removeItem('userid');
        notification.error({
          message: '错误',
          description: '登录后再执行操作',
        });
        props.history.push('/login');
      }
    });
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