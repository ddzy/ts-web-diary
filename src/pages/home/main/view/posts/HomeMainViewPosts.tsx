import * as React from 'react';
import * as Loadable from 'react-loadable';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';
// import * as InfiniteScroll from 'react-infinite-scroller';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';


const LoadableHomeMainViewPostsFrontend = Loadable({
  loader: () => import('./frontend/HomeMainViewPostsFrontend') as any,
  loading: () => null,
});
const LoadableHomeMainViewPostsBackend = Loadable({
  loader: () => import('./backend/HomeMainViewPostsBackend'),
  loading: () => null,
});
const LoadableHomeMainViewPostsAndroid = Loadable({
  loader: () => import('./android/HomeMainViewPostsAndroid'),
  loading: () => null,
});


export interface IHomeMainViewPostsProps extends RouteComponentProps {
};


const HomeMainViewPosts = React.memo<IHomeMainViewPostsProps>((
  props: IHomeMainViewPostsProps,
): JSX.Element => {
  return (
    <React.Fragment>
      <TransitionGroup>
        <CSSTransition
          exit={false}
          key={props.location.pathname}
          classNames={'fadeTranslateZ'}
          timeout={1000}
        >
          <Switch>
            <Route exact path="/home" render={() => <Redirect to="/home/frontend" />} />
            <Route path="/home/frontend" component={LoadableHomeMainViewPostsFrontend} />
            <Route path="/home/backend" component={LoadableHomeMainViewPostsBackend} />
            <Route path="/home/android" component={LoadableHomeMainViewPostsAndroid} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </React.Fragment>
  );
});


export default withRouter(HomeMainViewPosts);