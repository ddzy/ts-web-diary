import * as React from 'react';

import {
  RelatedWrapper,
  RelatedMain,
} from './style';
import {
  IStaticArticleInfoRelatedArticlesOptions,
} from '../../Details.service';
import DetailsMainRelatedTitle from './details_main_related_title/DetailsMainRelatedTitle';
import DetailsMainRelatedShow from './details_main_related_show/DetailsMainRelatedShow';


export interface IDetailsMainRelatedProps {
  relatedArticles: IStaticArticleInfoRelatedArticlesOptions[];
};


const DetailsMainRelated = React.memo<IDetailsMainRelatedProps>((
  props: IDetailsMainRelatedProps,
): JSX.Element => {
  return (
    <RelatedWrapper>
      <RelatedMain>
        <DetailsMainRelatedTitle />
        <DetailsMainRelatedShow
          {...props}
        />
      </RelatedMain>
    </RelatedWrapper>
  );

});


export default DetailsMainRelated;