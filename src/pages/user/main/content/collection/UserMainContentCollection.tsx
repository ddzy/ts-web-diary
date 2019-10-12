import * as React from 'react';
import {
  Route,
  Switch,
  withRouter,
  RouteComponentProps,
  Redirect,
} from 'react-router-dom';

import {
  CollectionContainer,
  CollectionMain,
} from './style';
import UserMainContentCollectionNav from './nav/UserMainContentCollectionNav';
import UserMainContentCollectionView from './view/UserMainContentCollectionView';


export interface IUserMainContentCollectionProps extends RouteComponentProps {
  // ? 标识当前是访问者还是主人
  isOwner: boolean;
};


const UserMainContentCollection = React.memo<IUserMainContentCollectionProps>((
  props: IUserMainContentCollectionProps,
): JSX.Element => {

  return (
    <CollectionContainer>
      <CollectionMain>
        {/* 导航区块 */}
        <UserMainContentCollectionNav />

        {/* 视图区块 */}
        <Switch>
          <Route exact={true} path="/user/:id/collection" render={(v) => <Redirect to={`${v.match.url}/article`} />} />

          <Route path="/user/:id/collection/:type" render={() => <UserMainContentCollectionView isOwner={props.isOwner} />} />
        </Switch>
      </CollectionMain>
    </CollectionContainer>
  );

});


export default withRouter(UserMainContentCollection);