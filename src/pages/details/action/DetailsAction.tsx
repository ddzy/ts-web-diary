import * as React from 'react';
import {
  Row,
  Col,
  Affix,
  Skeleton,
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
  globalLoading: boolean;

  // author: string | '';
  // authorAvatar: string | '';
  // newArticle: object[];
  // articleCount: number | '';
  // watchCount: number | 0;

  articleInfo: ICommonBaseArticleInfo & {
    new_article: ICommonBaseArticleInfo[],
    created_article_total: number,
  },
};
interface IDetailsActionState {};


class DetailsAction extends React.Component<IDetailsActionProps, IDetailsActionState> {

  public readonly state = {}

  //// 初始化最新文章
  public initNewArticleList = (): any[] => {
    const newArticle = this.props.articleInfo.new_article;

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


  public render(): JSX.Element {
    return (
      <Affix offsetTop={70}>
        <DetailsRightWrapper>
          <Skeleton
            loading={this.props.globalLoading}
            active={true}
            avatar={{
              size: 'large',
              shape: 'circle',
            }}
            paragraph={{
              rows: 6,
            }}
          >
            <RightMain>
            <RightMeInfoBox>
              <Row>
                <Col span={24}>
                  <MeInfoAvatar>
                    {/* 头像 */}
                    <img
                      src={this.props.articleInfo.author.useravatar}
                      alt="作者头像"
                    />
                  </MeInfoAvatar>
                </Col>
                <Col span={24}>
                  {/* 用户名 */}
                  <MeInfoName>
                    {this.props.articleInfo.author.username}
                  </MeInfoName>
                </Col>
                <Col span={24}>
                  {/* 文章数 & 阅读量 */}
                  <MeInfoCount>
                    <MeInfoCountItem>
                      <MeInfoCountItemNumber>
                        {this.props.articleInfo.created_article_total}
                      </MeInfoCountItemNumber>
                      <MeInfoCountItemText>
                        文章数
                      </MeInfoCountItemText>
                    </MeInfoCountItem>
                    <MeInfoCountItem>
                      <MeInfoCountItemNumber>
                        {this.props.articleInfo.watched_user.length}
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
                {this.initNewArticleList()}
              </NewArticleList>
            </RightNewArticleBox>
          </RightMain>
          </Skeleton>
        </DetailsRightWrapper>
      </Affix>
    );
  }

}


export default DetailsAction;