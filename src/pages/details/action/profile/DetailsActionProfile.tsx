import * as React from 'react';
import {
  Row,
  Col,
  Skeleton,
  Avatar,
} from 'antd';

import {
  ProfileWrapper,
  ProfileMain,
  ProfileMainAvatar,
  ProfileMainName,
  ProfileMainCountList,
  ProfileMainCountItem,
  ProfileMainCountItemNumber,
  ProfileMainCountItemText,
} from './style';
import {
  ICommonBaseArticleInfo,
} from 'pages/details/Details.types';


export interface IDetailsActionProfileProps {
  // ? Details页全局loading
  globalLoading: boolean;

  // ? 文章相关信息
  articleInfo: ICommonBaseArticleInfo & {
    // * 最新文章
    new_article: ICommonBaseArticleInfo[],
    // * 当前文章作者发表的文章总数
    created_article_total: number,
  };
};


const DetailsActionProfile = React.memo((props: IDetailsActionProfileProps) => {
  return (
    <ProfileWrapper>
      <ProfileMain>
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
          <Row>
            <Col span={24}>
              <ProfileMainAvatar>
                {/* 头像 */}
                <Avatar
                  icon="user"
                  size={120}
                  alt={'作者头像'}
                  src={props.articleInfo.author.useravatar}
                />
              </ProfileMainAvatar>
            </Col>
            <Col span={24}>
              {/* 作者名称 */}
              <ProfileMainName>
                {props.articleInfo.author.username}
              </ProfileMainName>
            </Col>
            <Col span={24}>
              {/* 文章数 & 阅读量 */}
              <ProfileMainCountList>
                <ProfileMainCountItem>
                  <ProfileMainCountItemNumber>
                    {props.articleInfo.created_article_total}
                  </ProfileMainCountItemNumber>
                  <ProfileMainCountItemText>
                    文章数
                  </ProfileMainCountItemText>
                </ProfileMainCountItem>
                <ProfileMainCountItem>
                  <ProfileMainCountItemNumber>
                    {props.articleInfo.watched_user.length}
                  </ProfileMainCountItemNumber>
                  <ProfileMainCountItemText>
                    阅读量
                  </ProfileMainCountItemText>
                </ProfileMainCountItem>
              </ProfileMainCountList>
            </Col>
          </Row>
        </Skeleton>
      </ProfileMain>
    </ProfileWrapper>
  );
});

export default DetailsActionProfile;