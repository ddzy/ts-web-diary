import * as React from 'react';

import {
  ShowWrapper,
  ShowMain,
} from './style';
import {
  IStaticArticleInfoRelatedArticlesOptions,
} from '../../../Details.service';


export interface IDetailsMainRelatedShowProps {
  relatedArticles: IStaticArticleInfoRelatedArticlesOptions[];
};


const DetailsMainRelatedShow = React.memo((
  props: IDetailsMainRelatedShowProps,
): JSX.Element => {

  console.log(props.relatedArticles);

  return (
    <ShowWrapper>
      <ShowMain>
        相关推荐文章列表
      </ShowMain>
    </ShowWrapper>
  );

});


export default DetailsMainRelatedShow;