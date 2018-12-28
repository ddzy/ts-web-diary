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


export interface IDetailsActionProps {
  visible: boolean;

  author: string | '';
  authorAvatar: string | '';
  newArticle: object[];
  articleCount: number | '';
  watchCount: number | 0;
};
interface IDetailsActionState {};


class DetailsAction extends React.Component<IDetailsActionProps, IDetailsActionState> {


  public readonly state = {}


  //// 初始化最新文章
  public initNewArticleList = (): any[] => {
    const newArticle = this.props.newArticle;

    return newArticle.length === 0
      ? []
      : newArticle.map((item: any) => {
          return (
            <NewArticleListItem
              key={item.id}
            >
              <Link to={`/details/${item.id}`}>{item.title}</Link>
            </NewArticleListItem>
          );
        });
  }


  public render(): JSX.Element {
    return (
      <Affix offsetTop={70}>
        <DetailsRightWrapper>
          <Skeleton
            loading={this.props.visible}
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
                      src={this.props.authorAvatar}
                      alt="作者头像"
                    />
                  </MeInfoAvatar>
                </Col>
                <Col span={24}>
                  {/* 用户名 */}
                  <MeInfoName>
                    {this.props.author}
                  </MeInfoName>
                </Col>
                <Col span={24}>
                  {/* 文章数 & 阅读量 */}
                  <MeInfoCount>
                    <MeInfoCountItem>
                      <MeInfoCountItemNumber>
                        {this.props.articleCount}
                      </MeInfoCountItemNumber>
                      <MeInfoCountItemText>
                        文章数
                      </MeInfoCountItemText>
                    </MeInfoCountItem>
                    <MeInfoCountItem>
                      <MeInfoCountItemNumber>
                        {this.props.watchCount || 0}
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