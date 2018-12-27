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
  loader: () => import('../Admin'),
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
const LoadableArticle = Loadable({
  loader: () => import('../pages/article/Article'),
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
              <LoadableAdmin location={props.location}>
                <LoadableAuthRoute />
                <TransitionGroup>
                  <CSSTransition
                    classNames='fadeTranslate'
                    key={props.location.key}
                    timeout={{
                      enter: 1000,
                      exit: 500,
                    }}
                    mountOnEnter
                    unmountOnExit
                  >
                    <Switch location={props.location}>
                      <Route path="/home" exact component={LoadableHome} />
                      <Route path="/publish" component={LoadablePublish} />
                      <Route path="/article" render={() => (
                        <Switch>
                          <Route path="/article/android" component={LoadableArticle} />
                          <Route path="/article/frontend" component={LoadableArticle} />
                          <Route path="/article/ios" component={LoadableArticle} />
                          <Route path="/article/backend" component={LoadableArticle} />
                          <Route path="/article/design" component={LoadableArticle} />
                          <Route path="/article/product" component={LoadableArticle} />
                          <Route path="/article/tool" component={LoadableArticle} />
                          <Route path="/article/read" component={LoadableArticle} />
                          <Route path="/article/ai" component={LoadableArticle} />
                          <Route path="/article/devops" component={LoadableArticle} />
                          <Redirect to="/article/frontend" />
                        </Switch>
                      )} />
                      <Route path="/me" component={LoadableMe} />
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