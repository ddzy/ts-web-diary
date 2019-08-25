import * as React from 'react';
import {
  Row,
  Col,
  notification,
} from 'antd';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';

import DetailsMain from './main/DetailsMain';
import DetailsAction from './action/DetailsAction';
import DetailsControl from './control/DetailsControl';
import {
  DetailsWrapper,
  DetailsContent,
} from './style';
import {
  COMMENT_PAGE_SIZE,
  REPLY_PAGE_SIZE,
} from 'constants/constants';
import { query } from 'services/request';
import {
  ICommonBaseArticleInfo,
  ICommonBaseUserInfo,
} from './Details.types';


export interface IDetailsProps extends RouteComponentProps<{
  id: string,
}> {
  AuthRouteReducer: { useravatar: string, };
};
export interface IDetailsState {
  // ? 文章详细信息
  articleInfo: ICommonBaseArticleInfo & {
    stared_user: ICommonBaseUserInfo[],
    unstared_user: ICommonBaseUserInfo[],
    related_article: ICommonBaseArticleInfo[],
    new_article: ICommonBaseArticleInfo[],
    created_article_total: number,
  },

  // ? 全局loading状态
  globalLoading: boolean,
};


@(connect(mapStateToProps) as any)
class Details extends React.PureComponent<IDetailsProps, IDetailsState> {

  public readonly state: IDetailsState = {
    articleInfo: {
      _id: '',
      author: {
        _id: '',
        username: '',
        useravatar: '',
      },
      create_time: Date.now(),
      cover_img: '',
      update_time: Date.now(),
      mode: '',
      type: '',
      tag: '',
      title: '',
      description: '',
      content: '',
      watched_user: [],
      comments: [],
      collected_user: [],
      stared_user: [],
      unstared_user: [],
      related_article: [],
      new_article: [],
      created_article_total: 0,
    },
    globalLoading: false,
  };

  public componentDidMount(): void {
    this._getArticleInfo();
  }

  /**
   * [获取] - 文章详细信息
   */
  public _getArticleInfo = () => {
    const userId = localStorage.getItem('userid');

    if (!userId || typeof userId !== 'string') {
      notification.error({
        message: '错误',
        description: 'token已过期, 请登录后再试!',
      });

      this.props.history.push('/login');
    }

    const articleId = this.props.match.params.id;

    query({
      method: 'GET',
      url: '/api/article/info/all',
      data: {
        userId: localStorage.getItem('userid'),
        articleId,
        commentPageSize: COMMENT_PAGE_SIZE,
        replyPageSize: REPLY_PAGE_SIZE,
      },
      jsonp: false,
    }).then((res) => {
      const { articleInfo } = res.data;

      this.setState({
        ...this.state,
        articleInfo,
        globalLoading: false,
      });
    });
  }

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <DetailsWrapper>
          <DetailsContent>
            <Row gutter={16}>
              <Col span={2}>
                {/* 左侧固钉控制栏 */}
                <DetailsControl
                  {...this.state}
                />
              </Col>
              <Col span={15}>
                {/* 左边内容区域 */}
                <DetailsMain
                  {...this.state}
                  {...this.props.AuthRouteReducer}
                />
              </Col>
              <Col span={5}>
                {/* 右边侧边栏区域 */}
                <DetailsAction
                  {...this.state}
                />
              </Col>
            </Row>
          </DetailsContent>
        </DetailsWrapper>
      </React.Fragment>
    );
  }
}


function mapStateToProps(state: any) {
  return {
    AuthRouteReducer: state.AuthRouteReducer,
  };
}

export default Details;