import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
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


class RouterConfig extends React.PureComponent<{}, {}> {
  public render(): JSX.Element {
    return (
      <Router>
        <App>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route
              path="/"
              render={() => (
                <Admin>
                  <AuthRoute />
                  <Switch>
                    <Route path="/home" exact component={Home} />
                    <Route path="/publish" component={Publish} />
                    <Route path="/article" component={Article} />
                    <Route path="/me" component={Me} />
                    <Route path="/details/:id" component={Details} />
                    <Route path="/edit/:id" component={Edit} />
                    <Route component={NotFound} />
                  </Switch>
                </Admin>
              )}
            />
          </Switch>
        </App>
      </Router>
    );
  }
}


export default RouterConfig;