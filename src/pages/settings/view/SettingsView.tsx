import * as React from 'react';
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
import SettingsViewProfile from './profile/SettingsViewProfile';


export interface ISettingsNavViewProps extends RouteComponentProps { };
export interface ISettingsNavViewState { }


const SettingsNavView = React.memo((props: ISettingsNavViewProps) => {
  return (
    <ViewWrapper>
      <ViewMain>
        <Switch>
          <Route exact path="/settings" render={() => <Redirect to="/settings/profile" />} />

          {/* 个人资料路由 */}
          <Route path="/settings/profile" render={() => <SettingsViewProfile />} />
        </Switch>
      </ViewMain>
    </ViewWrapper>
  );
});

export default withRouter(SettingsNavView);