import * as React from 'react';
import * as Loadable from 'react-loadable';
import {
  withRouter,
  Route,
  Switch,
  RouteComponentProps,
} from 'react-router-dom';

import GlobalStyle from './GlobalStyle';

const LoadableAdmin = Loadable({
  loader: () => import('pages/admin/Admin'),
  loading: () => null,
});
const LoadableLogin = Loadable({
  loader: () => import('pages/login/Login'),
  loading: () => null,
});
const LoadableRegister = Loadable({
  loader: () => import('pages/register/Register'),
  loading: () => null,
});


export interface IAppProps extends RouteComponentProps<any> {
};


const App = React.memo<IAppProps>((
  props: IAppProps,
): JSX.Element => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/login" component={LoadableLogin} />
        <Route exact path="/register" component={LoadableRegister} />
        <Route path="*" component={LoadableAdmin} />
      </Switch>

      <GlobalStyle />
    </React.Fragment>
  );
});


export default withRouter(App);