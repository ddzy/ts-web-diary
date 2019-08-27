import * as React from 'react';
import {
  Icon,
  Anchor,
} from 'antd';

import {
  GlobalStyleSet,
  FixedControlContainer,
  FixedControlContent,
  FixedControlList,
  FixedControlListItem,
} from './style';
import {
  ICommonBaseArticleInfo,
} from '../Details.types';
import DetailsControlCollection from './collection/DetailsControlCollection';
import DetailsControlComment from './comment/DetailsControlComment';
import DetailsControlStar from './star/DetailsControlStar';


export interface IDetailsControlProps {
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
    // * 文章的获赞用户列表
    stared_user: string[],
  },
};


/**
 * 左侧固钉控制栏
 */
const DetailsControl = React.memo<IDetailsControlProps>((
  props: IDetailsControlProps,
): JSX.Element => {
  return (
    <React.Fragment>
      <Anchor offsetTop={70}>
        <FixedControlContainer>
          <FixedControlContent>
            <FixedControlList>
              {/* 点赞 */}
              <FixedControlListItem>
                <DetailsControlStar
                  {...props}
                />
              </FixedControlListItem>
              {/* 评论 */}
              <FixedControlListItem>
                <DetailsControlComment />
              </FixedControlListItem>
              {/* 收藏 */}
              <FixedControlListItem>
                <DetailsControlCollection />
              </FixedControlListItem>
              <FixedControlListItem>
                分享
              </FixedControlListItem>
              <FixedControlListItem>
                <Icon
                  type="qq"
                  theme="outlined"
                />
              </FixedControlListItem>
              <FixedControlListItem>
                <Icon
                  type="twitter"
                  theme="outlined"
                />
              </FixedControlListItem>
              <FixedControlListItem>
                <Icon
                  type="weibo-circle"
                  theme="outlined"
                />
              </FixedControlListItem>
            </FixedControlList>
          </FixedControlContent>
        </FixedControlContainer>
      </Anchor>

      {/* Global Style Set */}
      <GlobalStyleSet />
    </React.Fragment>
  );
})


export default DetailsControl;
