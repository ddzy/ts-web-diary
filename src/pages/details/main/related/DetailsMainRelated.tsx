import * as React from 'react';
import {
  withRouter, RouteComponentProps,
} from 'react-router-dom';

import {
  RelatedWrapper,
  RelatedMain,
} from './style';
import {
  ICommonBaseArticleInfo,
} from 'pages/details/Details.types';
import DetailsMainRelatedTitle from './title/DetailsMainRelatedTitle';
import DetailsMainRelatedShow from './show/DetailsMainRelatedShow';


export interface IDetailsMainRelatedProps extends RouteComponentProps {
  // ? 文章相关信息
  articleInfo: {
    related_article: ICommonBaseArticleInfo[],
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


export default withRouter(DetailsMainRelated);