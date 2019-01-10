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
interface IDetailsMainRelatedState {
  relatedArticles: IStaticArticleInfoRelatedArticlesOptions[];
};


const DetailsMainRelated = React.memo<IDetailsMainRelatedProps>((
  props: IDetailsMainRelatedProps,
): JSX.Element => {

  const [
    state,
    setState,
  ] = React.useState<IDetailsMainRelatedState>({
    relatedArticles: [],
  });

  React.useEffect(() => {
    setState({ relatedArticles: props.relatedArticles });
  }, [props.relatedArticles]);

  return (
    <RelatedWrapper>
      <RelatedMain>
        <DetailsMainRelatedTitle />
        <DetailsMainRelatedShow
          {...state}
        />
      </RelatedMain>
    </RelatedWrapper>
  );

});


export default DetailsMainRelated;