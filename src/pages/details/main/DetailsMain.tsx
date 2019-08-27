import * as React from 'react';
import { Divider } from 'antd';
import 'react-quill/dist/quill.snow.css';
import 'highlight.js/styles/atom-one-light.css';

import DetailsMainComment from './comment/DetailsMainComment';
import DetailsMainRich from './rich/DetailsMainRich';
import DetailsMainTitle from './title/DetailsMainTitle';
import DetailsMainRelated from './related/DetailsMainRelated';
import {
  DetailsLeftWrapper,
} from './style';
import {
  ICommonBaseArticleInfo,
} from '../Details.types';


export interface IDetailsMainProps {
  // ? 文章信息
  articleInfo: ICommonBaseArticleInfo & {
    // * 相关文章推荐
    related_article: ICommonBaseArticleInfo[],
    // * 最新文章推荐
    new_article: ICommonBaseArticleInfo[],
    // * 作者创建的文章总数
    created_article_total: number,
    // * 文章的获赞总数
    stared_total: number,
  };

  // ? 当前用户的头像
  useravatar: string;

  // ? 全局loading状态
  globalLoading: boolean;
};


const DetailsMain = React.memo<IDetailsMainProps>((
  props: IDetailsMainProps,
): JSX.Element => {
  return (
    <DetailsLeftWrapper>
      {/* 标题文章信息展示区 */}
      <React.Fragment>
        <DetailsMainTitle
          {...props}
        />
      </React.Fragment>

      {/* 文章内容展示区 */}
      <React.Fragment>
        <DetailsMainRich
          {...props}
        />
        <Divider />
      </React.Fragment>

      {/* 文章评论区 */}
      <React.Fragment>
        <DetailsMainComment
          useravatar={props.useravatar}
          comments={props.articleInfo.comments}
        />
        <Divider />
      </React.Fragment>

      {/* 文章相关推荐区 */}
      <React.Fragment>
        <DetailsMainRelated
          {...props}
        />
        <Divider />
      </React.Fragment>
    </DetailsLeftWrapper>
  );
});


export default DetailsMain;