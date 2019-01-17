import * as React from 'react';

import {
  CollectionContainer,
  CollectionMain,
} from './style';


export interface IUserMainContentCollectionProps { };


const UserMainContentCollection = React.memo<IUserMainContentCollectionProps>((
  props: IUserMainContentCollectionProps,
): JSX.Element => {

  return (
    <CollectionContainer>
      <CollectionMain>
        我的收藏相关内容
      </CollectionMain>
    </CollectionContainer>
  );

});


export default UserMainContentCollection;