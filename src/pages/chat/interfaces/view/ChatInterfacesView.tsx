import * as React from 'react';
import * as Loadable from 'react-loadable';
import {
  withRouter,
  Switch,
  Route,
  RouteComponentProps,
} from 'react-router-dom';

import {
  ViewWrapper,
  ViewMain,
} from './style';

const LoadableChatInterfacesViewSingle = Loadable({
  loader: () => import('./single/ChatInterfacesViewSingle'),
  loading: () => null,
});
const LoadableChatInterfacesViewGroup = Loadable({
  loader: () => import('./group/ChatInterfacesViewGroup'),
  loading: () => null,
});


export interface IChatInterfacesViewProps extends RouteComponentProps {

};

const ChatInterfacesView = React.memo((props: IChatInterfacesViewProps) => {
  return (
    <ViewWrapper>
      <ViewMain>
        <Switch>
          {/* 单聊路由视图 */}
          <Route path="/chat/interfaces/single/:id" render={() => <LoadableChatInterfacesViewSingle />} />

          {/* 群聊路由视图 */}
          <Route path="/chat/interfaces/group/:id" render={() => <LoadableChatInterfacesViewGroup />} />
        </Switch>
      </ViewMain>
    </ViewWrapper>
  );
});

export default withRouter(ChatInterfacesView);