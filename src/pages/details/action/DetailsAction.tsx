import * as React from 'react';
import {
  Affix,
} from 'antd';

import {
  ActionWrapper,
  ActionMain,
} from './style';
import {
  ICommonBaseArticleInfo
} from '../Details.types';
import DetailsActionProfile from './profile/DetailsActionProfile';
import DetailsActionToc from './toc/DetailsActionToc';


export interface IDetailsActionProps {
  // ? 全局loading
  globalLoading: boolean;

  // ? 文章相关信息
  articleInfo: ICommonBaseArticleInfo & {
    // * 最新文章
    new_article: ICommonBaseArticleInfo[],
    // * 当前文章作者发表的文章总数
    created_article_total: number,
  },
};
export interface IDetailsActionState { };


const DetailsAction = React.memo((props: IDetailsActionProps) => {
  return (
    <Affix offsetTop={70}>
      <ActionWrapper>
        <ActionMain>
          {/* 作者信息区 */}
          <DetailsActionProfile
            globalLoading={props.globalLoading}
            articleInfo={props.articleInfo}
          />

          {/* 文章目录区 */}
          <DetailsActionToc
            globalLoading={props.globalLoading}
            articleInfo={props.articleInfo}
          />
        </ActionMain>
      </ActionWrapper>
    </Affix>
  );
});

export default DetailsAction;