import * as React from 'react';

import {
  ShowWrapper,
  ShowMain,
} from './style';


export interface IDetailsMainRelatedShowProps { };


const DetailsMainRelatedShow = React.memo((
  props: IDetailsMainRelatedShowProps,
): JSX.Element => {

  return (
    <ShowWrapper>
      <ShowMain>
        相关推荐文章列表
      </ShowMain>
    </ShowWrapper>
  );

});


export default DetailsMainRelatedShow;