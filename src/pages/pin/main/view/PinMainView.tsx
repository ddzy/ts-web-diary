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
import PinMainViewEdit from './edit/PinMainViewEdit';
import PinMainViewContent from './content/PinMainViewContent';


export interface IPinMainViewProps extends RouteComponentProps { };
export interface IPinMainViewState { }


const PinMainView = React.memo((props: IPinMainViewProps) => {
  return (
    <ViewWrapper>
      <ViewMain>
        {/* 沸点发表区 */}
        <PinMainViewEdit />

        {/* 沸点展示区 */}
        <Switch location={props.location}>
          <Route exact={true} path="/pin" render={() => (
            <Redirect to="/pin/recommend" />
          )} />
          <Route exact={true} path="/pin/:type" component={PinMainViewContent} />
          <Route exact={true} path="/pin/:type/:id" component={PinMainViewContent} />
        </Switch>
      </ViewMain>
    </ViewWrapper>
  );
});

export default withRouter(PinMainView);