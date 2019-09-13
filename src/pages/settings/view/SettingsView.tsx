import * as React from 'react';
import * as Loadable from 'react-loadable';
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';
import {
  Route,
  Switch,
  withRouter,
  RouteComponentProps,
  Redirect,
} from 'react-router-dom';

import {
  ViewWrapper,
  ViewMain,
} from './style';


const LoadableSettingsViewProfile = Loadable({
  loader: () => import('./profile/SettingsViewProfile'),
  loading: () => null,
});
const LoadableSettingsViewAccount = Loadable({
  loader: () => import('./account/SettingsViewAccount'),
  loading: () => null,
});
const LoadableSettingsViewPassword = Loadable({
  loader: () => import('./password/SettingsViewPassword'),
  loading: () => null,
});


export interface ISettingsNavViewProps extends RouteComponentProps { };
export interface ISettingsNavViewState { }


const SettingsNavView = React.memo((props: ISettingsNavViewProps) => {
  return (
    <ViewWrapper>
      <ViewMain>
        <TransitionGroup>
          <CSSTransition
            exit={false}
            key={props.location.pathname}
            classNames={'fadeTranslate'}
            timeout={1000}
          >
            <Switch location={props.location}>
              <Route exact path="/settings" render={() => <Redirect to="/settings/profile" />} />

              {/* 个人资料路由 */}
              <Route path="/settings/profile" render={() => <LoadableSettingsViewProfile />} />

              {/* 账号关联路由 */}
              <Route path="/settings/account" render={() => <LoadableSettingsViewAccount />} />

              {/* 修改密码路由 */}
              <Route path="/settings/password" render={() => <LoadableSettingsViewPassword />} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </ViewMain>
    </ViewWrapper>
  );
});

export default withRouter(SettingsNavView);