import * as React from 'react';

import {
  AllWrapper,
  AllMain,
} from './style';
import TopicAllMain from './main/TopicAllMain';


export interface ITopicAllProps { };
export interface ITopicAllState { };


const TopicAll = React.memo((props: ITopicAllProps) => {
  return (
    <AllWrapper>
      <AllMain>
        <TopicAllMain />
      </AllMain>
    </AllWrapper>
  );
});


export default TopicAll;