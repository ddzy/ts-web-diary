import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { History } from 'history';

import { reduxHandleCheckAuth } from './AuthRoute.redux';



export interface IAuthRouteProps extends RouteComponentProps<any> {
  history: History;

  AuthRouteReducer: { isAuth: boolean };
  reduxHandleCheckAuth: (callback: () => void) => void;
};
interface IAuthRouteState {};


// 权限路由
class AuthRoute extends React.Component<IAuthRouteProps, IAuthRouteState> {

  public readonly state = {}


  public componentDidMount(): void {

    // Home & Article & Details页 不需要权限
    // 点赞 & 写文章 需要权限
    const publicPath: any = [
      '/home',
      '/article',
    ];

    const regPath = /\/details\/\w*/;

    this.props.reduxHandleCheckAuth(() => {
      if(!this.props.AuthRouteReducer.isAuth) {
        localStorage.removeItem('userid');

        if(!publicPath.includes(
          this.props.location.pathname
        ) && !(regPath.test(
          this.props.location.pathname
        ))) {
          this.props.history.push('/login');
        }
      }
    });
  }


  public render(): JSX.Element {
    return(
      <React.Fragment />
    );
  }

}


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