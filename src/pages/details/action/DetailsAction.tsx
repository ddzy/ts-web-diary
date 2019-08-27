import * as React from 'react';
import {
  Row,
  Col,
  Affix,
  Skeleton,
  Avatar,
} from 'antd';
import { Link } from 'react-router-dom';

import {
  DetailsRightWrapper,
  RightMain,
  RightMeInfoBox,
  RightNewArticleBox,
  MeInfoAvatar,
  MeInfoName,
  MeInfoCount,
  MeInfoCountItem,
  MeInfoCountItemNumber,
  MeInfoCountItemText,
  NewArticleTip,
  NewArticleList,
  NewArticleListItem,
} from './style';
import {
  ICommonBaseArticleInfo
} from '../Details.types';


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
  /**
   * [初始化] - 最新文章列表
   */
  function _initLatestArticle() {
    const newArticle = props.articleInfo.new_article;

    return newArticle.length === 0
      ? []
      : newArticle.map((item: any) => {
        return (
          <NewArticleListItem
            key={item._id}
          >
            <Link to={`/details/${item._id}`}>{item.title}</Link>
          </NewArticleListItem>
        );
      });
  }

  return (
    <Affix offsetTop={70}>
      <DetailsRightWrapper>
        <Skeleton
          active={true}
          avatar={{
            size: 80,
            shape: 'circle',
          }}
          paragraph={{
            rows: 6,
          }}
          loading={props.globalLoading}
        >
          <RightMain>
            <RightMeInfoBox>
              <Row>
                <Col span={24}>
                  <MeInfoAvatar>
                    {/* 头像 */}
                    <Avatar
                      icon="user"
                      size={120}
                      alt={'作者头像'}
                      src={props.articleInfo.author.useravatar}
                    />
                  </MeInfoAvatar>
                </Col>
                <Col span={24}>
                  {/* 作者名称 */}
                  <MeInfoName>
                    {props.articleInfo.author.username}
                  </MeInfoName>
                </Col>
                <Col span={24}>
                  {/* 文章数 & 阅读量 */}
                  <MeInfoCount>
                    <MeInfoCountItem>
                      <MeInfoCountItemNumber>
                        {props.articleInfo.created_article_total}
                      </MeInfoCountItemNumber>
                      <MeInfoCountItemText>
                        文章数
                    </MeInfoCountItemText>
                    </MeInfoCountItem>
                    <MeInfoCountItem>
                      <MeInfoCountItemNumber>
                        {props.articleInfo.watched_user.length}
                      </MeInfoCountItemNumber>
                      <MeInfoCountItemText>
                        阅读量
                    </MeInfoCountItemText>
                    </MeInfoCountItem>
                  </MeInfoCount>
                </Col>
              </Row>
            </RightMeInfoBox>
            <RightNewArticleBox>
              <NewArticleTip>
                最新文章
            </NewArticleTip>
              <NewArticleList>
                {_initLatestArticle()}
              </NewArticleList>
            </RightNewArticleBox>
          </RightMain>
        </Skeleton>
      </DetailsRightWrapper>
    </Affix>
  );
});

export default DetailsAction;