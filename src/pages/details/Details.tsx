import * as React from 'react';
import {
  Row,
  Col,
  notification,
} from 'antd';
import { History } from 'history';
import { match } from 'react-router';
import { connect } from 'react-redux';

import DetailsMain from './details_main/DetailsMain';
import DetailsAction from './details_action/DetailsAction';
import DetailsControl from './details_control/DetailsControl';
import {
  DetailsWrapper,
  DetailsContent,
} from './style';
import {
  IStaticOptions,
  serviceHandleGetOneArticleInfo,
  serviceHandleSendComment,
  serviceHandleSendReply,
} from './Details.service';


export interface IDetailsProps {
  location: Location;
  history: History;
  match: match<any>;

  AuthRouteReducer: { useravatar: string, };
};
interface IDetailsState {
  // ** loading组件相关props **
  visible: boolean;
  serviceState: IStaticOptions;
};


/**
 * 单个文章详情页
 */
class Details extends React.PureComponent<IDetailsProps, IDetailsState> {

  public readonly state = {
    visible: false,
    commentInputValue: '',

    serviceState: {
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
      collections: [],
      collectionName: '',
    },
  }

  public componentDidMount(): void {
    this.initLoadingWrapper();

    serviceHandleGetOneArticleInfo(this.props.match.params.id, (data) => {
      this.setState((prevState) => {
        return {
          ...prevState,
          visible: false,
          serviceState: {
            ...prevState.serviceState,
            ...data.result,
          },
        };
      });
    });
  }

  /**
   * 处理loading状态
   */
  public initLoadingWrapper = (): void => {
    this.setState({
      visible: true,
    });
  }

  /**
   * 处理评论提交
   */
  public handleSendComment = (
    inputEl: HTMLElement,
    value: string,
  ): void => {
    const { id } = this.props.match.params;

    if (value) {
      // TODO 敏感词过滤
      serviceHandleSendComment({
        value,
        articleId: id || '',
        from: localStorage.getItem('userid') || '',
      }, (data) => {

        this.setState((prevState) => {
          return {
            ...prevState,
            serviceState: {
              ...prevState.serviceState,
              comments: [
                data.comment,
                ...prevState.serviceState.comments,
              ]
            },
          };
        }, () => {
          inputEl.textContent = '';
          inputEl.focus();
          notification.success({
            message: '提示',
            description: `评论发表成功`,
          });
        });
      });
    } else {
      notification.error({
        message: '错误',
        description: '评论内容不能为空!',
      });
    }
  }

  /**
   * 处理回复提交
   */
  public handleSendReply = (
    inputEl: HTMLElement,
    v: any,
  ): void => {
    const { id } = this.props.match.params;

    if (v.value) {
      serviceHandleSendReply(
        {
          ...v,
          articleId: id,
        },
        (data) => {
          this.setState((prevState) => ({
            ...prevState,
            serviceState: {
              ...prevState.serviceState,
              comments: prevState.serviceState.comments.map((item) => {
                if (
                  item._id === data.reply.comment
                ) {
                  return {
                    ...item,
                    replys: [
                      data.reply,
                      ...item.replys,
                    ],
                  };
                }
                return item;
              }),
            },
          }), () => {
            inputEl.textContent = '';
            inputEl.focus();
            notification.success({
              message: '提示',
              description: `回复发表成功`,
            });
          });
        },
      );
    } else {
      notification.error({
        message: '错误',
        description: '回复信息不能为空!',
      });
    }
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
                    isLiked: this.state.serviceState.isLiked,
                    author: this.state.serviceState.author,
                  }}
                />
              </Col>
              <Col span={15}>
                {/* 左边内容区域 */}
                <DetailsMain
                  {...this.state}
                  {...this.state.serviceState}
                  {...this.props.AuthRouteReducer}
                  onSendComment={this.handleSendComment}
                  onSendReply={this.handleSendReply}
                />
              </Col>
              <Col span={5}>
                {/* 右边侧边栏区域 */}
                <DetailsAction
                  {...this.state}
                  {...this.state.serviceState}
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

export default connect(
  mapStateToProps,
)(Details) as React.ComponentClass<any>;