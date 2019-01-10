import * as React from 'react';

import {
  RelatedWrapper,
  RelatedMain,
} from './style';
import DetailsMainRelatedTitle from './details_main_related_title/DetailsMainRelatedTitle';


export interface IDetailsMainRelatedProps { };


const DetailsMainRelated = React.memo<IDetailsMainRelatedProps>((
  props: IDetailsMainRelatedProps,
): JSX.Element => {

  return (
    <RelatedWrapper>
      <RelatedMain>
        <DetailsMainRelatedTitle />
      </RelatedMain>
    </RelatedWrapper>
  );

});


export default DetailsMainRelated;