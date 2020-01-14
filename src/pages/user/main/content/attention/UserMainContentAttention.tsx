import * as React from 'react';
import {
  Route,
  Switch,
  withRouter,
  RouteComponentProps,
  Redirect,
} from 'react-router-dom';

import {
  AttentionContainer,
  AttentionMain,
} from './style';
import UserMainContentAttentionNav from './nav/UserMainContentAttentionNav';
import UserMainContentAttentionView from './view/UserMainContentAttentionView';


export interface IUserMainContentAttentionProps extends RouteComponentProps {
  // ? 标识当前是访问者还是主人
  isOwner: boolean;
};


const UserMainContentAttention = React.memo<IUserMainContentAttentionProps>((
  props: IUserMainContentAttentionProps,
): JSX.Element => {
  return (
    <AttentionContainer>
      <AttentionMain>
        {/* 导航区块 */}
        <UserMainContentAttentionNav />

        {/* 视图区块 */}
        <Switch>
          <Route exact={true} path="/user/:id/attention" render={(v) => <Redirect to={`${v.match.url}/user`} />} />

          <Route path="/user/:id/attention/:type" render={() => <UserMainContentAttentionView isOwner={props.isOwner} />} />
        </Switch>
      </AttentionMain>
    </AttentionContainer>
  );
});


export default withRouter(UserMainContentAttention);