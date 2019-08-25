import * as React from 'react';

import {
  RelatedWrapper,
  RelatedMain,
} from './style';
import DetailsMainRelatedTitle from './title/DetailsMainRelatedTitle';
import DetailsMainRelatedShow from './show/DetailsMainRelatedShow';


export interface IDetailsMainRelatedProps {
  articleInfo: {
    related_article: any[],
  },
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