import * as React from 'react';
import {
  Row,
  Col,
} from 'antd';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';

import DetailsMain from './details_main/DetailsMain';
import DetailsAction from './details_action/DetailsAction';
import DetailsControl from './details_control/DetailsControl';
import {
  DetailsWrapper,
  DetailsContent,
} from './style';
import {
  serviceHandleGetOneArticleInfo,
  IServiceState,
} from './Details.service';
import {
  COMMENT_PAGE_SIZE,
  REPLY_PAGE_SIZE,
} from 'src/constants/constants';


export interface IDetailsProps extends RouteComponentProps<{
  id: string,
}> {
  AuthRouteReducer: { useravatar: string, };
};
interface IDetailsState extends IServiceState {
  // ** 全局loading **
  globalLoading: boolean;
};


/**
 * 单个文章详情页
 */
@(connect(mapStateToProps) as any)
class Details extends React.PureComponent<IDetailsProps, IDetailsState> {

  public readonly state = {
    globalLoading: false,

    articleInfo: {
      author: '',
      articleContent: '',
      articleTitle: '',
      articleCount: 0,
      authorAvatar: '',
      create_time: 0,
      mode: '',
      newArticle: [],
      tag: '',
      type: '',
      watchCount: 0,
      img: '',
      isLiked: false,
      comments: [],
      collectionName: '',
    },
  }

  public componentDidMount(): void {
    this.handleInitLoading();

    serviceHandleGetOneArticleInfo({
      articleId: this.props.match.params.id,
      commentPageSize: COMMENT_PAGE_SIZE,
      replyPageSize: REPLY_PAGE_SIZE,
    }, (data) => {
      this.setState((prevState) => {
        return {
          ...prevState,
          globalLoading: false,
          articleInfo: {
            ...prevState.articleInfo,
            ...data.info.articleInfo,
          },
        };
      });
    });
  }

  /**
   * 处理loading状态
   */
  public handleInitLoading = (): void => {
    this.setState({
      globalLoading: true,
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
                  controlStarAreaState={{
                    isLiked: this.state.articleInfo.isLiked,
                    author: this.state.articleInfo.author,
                  }}
                />
              </Col>
              <Col span={15}>
                {/* 左边内容区域 */}
                <DetailsMain
                  {...this.state}
                  {...this.state.articleInfo}
                  {...this.props.AuthRouteReducer}
                />
              </Col>
              <Col span={5}>
                {/* 右边侧边栏区域 */}
                <DetailsAction
                  {...this.state}
                  {...this.state.articleInfo}
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