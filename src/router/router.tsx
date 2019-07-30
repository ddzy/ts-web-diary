import * as React from 'react';
import * as Loadable from 'react-loadable';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';


const LoadableApp = Loadable({
  loader: () => import('../App'),
  loading: () => null,
});
const LoadableAdmin = Loadable({
  loader: () => import('../pages/admin/Admin'),
  loading: () => null,
});
const LoadableLogin = Loadable({
  loader: () => import('../pages/login/Login'),
  loading: () => null,
});
const LoadableHome = Loadable({
  loader: () => import('../pages/home/Home'),
  loading: () => null,
});
const LoadableRegister = Loadable({
  loader: () => import('../pages/register/Register'),
  loading: () => null,
});
const LoadableNotFound = Loadable({
  loader: () => import('../pages/404/NotFound'),
  loading: () => null,
});
const LoadablePublish = Loadable({
  loader: () => import('../pages/publish/Publish'),
  loading: () => null,
});
const LoadableMe = Loadable({
  loader: () => import('../pages/me/Me'),
  loading: () => null,
});
const LoadableAuthRoute = Loadable({
  loader: () => import('../components/authroute/AuthRoute'),
  loading: () => null,
});
const LoadableDetails = Loadable({
  loader: () => import('../pages/details/Details'),
  loading: () => null,
});
const LoadableEdit = Loadable({
  loader: () => import('../pages/edit/Edit'),
  loading: () => null,
});
const LoadableCollection = Loadable({
  loader: () => import('../pages/collection/Collection'),
  loading: () => null,
});
const LoadableUser = Loadable({
  loader: () => import('../pages/user/User'),
  loading: () => null,
});


export interface IRouterConfigProps { };


const RouterConfig = React.memo<IRouterConfigProps>((): JSX.Element => {

  return (
    <Router>
      <LoadableApp>
        <Switch>
          <Route path="/login" component={LoadableLogin} />
          <Route path="/register" component={LoadableRegister} />
          <Route
            path="/"
            render={(props) => (
              <LoadableAdmin>
                <LoadableAuthRoute />
                <TransitionGroup>
                  <CSSTransition
                    classNames='fadeTranslate'
                    key={(/\/user\/.+/.test(props.location.pathname)) ? '' : props.location.pathname}
                    timeout={{
                      enter: 1000,
                      exit: 500,
                    }}
                    mountOnEnter
                    unmountOnExit
                  >
                    <Switch location={props.location}>
                      <Route path="/home" render={() => (
                        <Switch>
                          <Route exact path="/home/android" component={LoadableHome} />
                          <Route exact path="/home/frontend" component={LoadableHome} />
                          <Route exact path="/home/ios" component={LoadableHome} />
                          <Route exact path="/home/backend" component={LoadableHome} />
                          <Route exact path="/home/design" component={LoadableHome} />
                          <Route exact path="/home/product" component={LoadableHome} />
                          <Route exact path="/home/tool" component={LoadableHome} />
                          <Route exact path="/home/read" component={LoadableHome} />
                          <Route exact path="/home/ai" component={LoadableHome} />
                          <Route exact path="/home/devops" component={LoadableHome} />
                          <Redirect exact to="/home/frontend" />
                        </Switch>
                      )} />
                      <Route path="/publish" component={LoadablePublish} />
                      <Route path="/me" component={LoadableMe} />
                      {/* <Route path="/user/:id" component={LoadableUser} children={() => (
                        <Switch>
                          <Route exact path="/user/:id/activity" component={UserMainContentActivity} />
                          <Route exact path="/user/:id/post" component={UserMainContentPost} />
                          <Route exact path="/user/:id/collection" component={UserMainContentCollection} />
                          <Route path="/user/:id/attention" render={() => (
                            <Switch>
                              <Route exact path="/user/:id/attention/user" component={LoadableUser} />
                              <Route exact path="/user/:id/attention/topic" component={LoadableUser} />
                            </Switch>
                          )} />
                          <Route exact path="/user/:id/follower" component={LoadableUser} />
                        </Switch>
                      )} /> */}
                      <Route path="/user/:id" component={LoadableUser} />
                      <Route path="/details/:id" component={LoadableDetails} />
                      <Route path="/edit/:id" component={LoadableEdit} />
                      <Route path="/collection/:id" component={LoadableCollection} />
                      <Route component={LoadableNotFound} />
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              </LoadableAdmin>
            )}
          />
        </Switch>
      </LoadableApp>
    </Router>
  );
});


export default RouterConfig;