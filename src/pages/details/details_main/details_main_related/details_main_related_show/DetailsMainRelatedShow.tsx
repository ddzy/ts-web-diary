import * as React from 'react';

import {
  ShowWrapper,
  ShowMain,
} from './style';
import {
  IStaticArticleInfoRelatedArticlesOptions,
} from '../../../Details.service';
import DetailsMainRelatedShowItem from './details_main_related_show_item/DetailsMainRelatedShowItem';


export interface IDetailsMainRelatedShowProps {
  relatedArticles: IStaticArticleInfoRelatedArticlesOptions[];
};


const DetailsMainRelatedShow = React.memo((
  props: IDetailsMainRelatedShowProps,
): JSX.Element => {

  function handleInitArticleList(): JSX.Element[] {
    const { relatedArticles } = props;
    const { length } = relatedArticles;

    return length === 0
      ? []
      : relatedArticles.map((v, i) => {
        return (
          <DetailsMainRelatedShowItem
            key={i}
            {...v}
          />
        );
      });
  }

  return (
    <ShowWrapper>
      <ShowMain>
        {handleInitArticleList()}
      </ShowMain>
    </ShowWrapper>
  );

});


export default DetailsMainRelatedShow;