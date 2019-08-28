import * as React from 'react';
import {
  Row,
  Col,
  notification,
  BackTop,
} from 'antd';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
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
  PAGE_SIZE,
} from 'constants/constants';
import { query } from 'services/request';
import {
  ICommonBaseArticleInfo,
} from './Details.types';


export interface IDetailsProps extends RouteComponentProps<{
  id: string,
}> {
  AuthRouteReducer: { useravatar: string, };
};
export interface IDetailsState {
  // ? 文章详细信息
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

  // ? 全局loading状态
  globalLoading: boolean,
};


const Details = React.memo((props: IDetailsProps) => {
  const [state, setState] = React.useState<IDetailsState>({
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
      related_article: [],
      new_article: [],
      created_article_total: 0,
      stared_total: 0,
      stared_user: [],
    },
    globalLoading: false,
  });

  React.useEffect(() => {
    _getArticleInfo();
  }, [props.match.params.id]);

  function _getArticleInfo() {
    setState({
      ...state,
      globalLoading: true,
    });

    const userId = localStorage.getItem('userid');

    if (!userId || typeof userId !== 'string') {
      notification.error({
        message: '错误',
        description: 'token已过期, 请登录后再试!',
      });

      props.history.push('/login');
    }

    const articleId = props.match.params.id;

    query({
      method: 'GET',
      url: '/api/article/info/single/detail',
      data: {
        userId,
        articleId,
        newArticlePage: 1,
        newArticlePageSize: PAGE_SIZE,
        relatedArticlePage: 1,
        relatedArticlePageSize: PAGE_SIZE,
        commentPage: 1,
        commentPageSize: COMMENT_PAGE_SIZE,
        replyPage: 1,
        replyPageSize: REPLY_PAGE_SIZE,
      },
      jsonp: false,
    }).then((res) => {
      const { articleInfo } = res.data;

      setState({
        ...state,
        articleInfo,
        globalLoading: false,
      });
    });
  }

  return (
    <React.Fragment>
      <DetailsWrapper>
        <DetailsContent>
          <Row gutter={16}>
            <Col span={2}>
              {/* 左侧固钉控制栏 */}
              <DetailsControl
                {...state}
              />
            </Col>
            <Col span={15}>
              {/* 中间内容区域 */}
              <DetailsMain
                {...state}
                {...props.AuthRouteReducer}
              />
            </Col>
            <Col span={7}>
              {/* 右边侧边栏区域 */}
              <DetailsAction
                {...state}
              />
            </Col>
          </Row>

          {/* 右下角回到顶部按钮 */}
          <BackTop />
        </DetailsContent>
      </DetailsWrapper>
    </React.Fragment>
  );
});


function mapStateToProps(state: any) {
  return {
    AuthRouteReducer: state.AuthRouteReducer,
  };
}

export default withRouter(connect(mapStateToProps)(Details) as any);