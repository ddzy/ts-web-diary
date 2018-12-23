import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import App from '../App';
import Admin from '../Admin';
import Login from '../pages/login/Login';
import Home from '../pages/home/Home';
import Register from '../pages/register/Register';
import NotFound from '../pages/404/NotFound';
import Article from '../pages/article/Article';
import Publish from '../pages/publish/Publish';
import Me from '../pages/me/Me';
import AuthRoute from '../components/authroute/AuthRoute';
import Details from '../pages/details/Details';
import Edit from '../pages/edit/Edit';
import Collection from '../pages/collection/Collection';


export interface IRouterConfigProps { };


const RouterConfig = React.memo<IRouterConfigProps>((): JSX.Element => {
  return (
    <Router>
      <App>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route
            path="/"
            render={(props) => (
              <Admin location={props.location}>
                <AuthRoute />
                <Switch>
                  <Route path="/home" exact component={Home} />
                  <Route path="/publish" component={Publish} />
                  <Route path="/article" render={() => (
                    <Switch>
                      <Route path="/article/android" component={Article} />
                      <Route path="/article/frontend" component={Article} />
                      <Route path="/article/ios" component={Article} />
                      <Route path="/article/backend" component={Article} />
                      <Route path="/article/design" component={Article} />
                      <Route path="/article/product" component={Article} />
                      <Route path="/article/tool" component={Article} />
                      <Route path="/article/read" component={Article} />
                      <Route path="/article/ai" component={Article} />
                      <Route path="/article/devops" component={Article} />
                      <Redirect to="/article/frontend" />
                    </Switch>
                  )} />
                  <Route path="/me" component={Me} />
                  <Route path="/details/:id" component={Details} />
                  <Route path="/edit/:id" component={Edit} />
                  <Route path="/collection/:id" component={Collection} />
                  <Route component={NotFound} />
                </Switch>
              </Admin>
            )}
          />
        </Switch>
      </App>

    </Router>
  );
});


export default RouterConfig;