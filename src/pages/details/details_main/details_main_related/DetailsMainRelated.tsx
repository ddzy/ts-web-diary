import * as React from 'react';

import {
  RelatedWrapper,
  RelatedMain,
} from './style';
import DetailsMainRelatedTitle from './details_main_related_title/DetailsMainRelatedTitle';
import DetailsMainRelatedShow from './details_main_related_show/DetailsMainRelatedShow';


export interface IDetailsMainRelatedProps { };


const DetailsMainRelated = React.memo<IDetailsMainRelatedProps>((
  props: IDetailsMainRelatedProps,
): JSX.Element => {

  return (
    <RelatedWrapper>
      <RelatedMain>
        <DetailsMainRelatedTitle />
        <DetailsMainRelatedShow />
      </RelatedMain>
    </RelatedWrapper>
  );

});


export default DetailsMainRelated;