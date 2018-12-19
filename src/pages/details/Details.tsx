import * as React from 'react';
import {
  Row,
  Col,
  notification,
  message,
} from 'antd';
import { History } from 'history';
import { match } from 'react-router';
import { connect } from 'react-redux';

import Header from '../../components/header/Header';
import DetailsMain from './details_main/DetailsMain';
import DetailsRight from './details_action/DetailsAction';
import DetailsControl from './details_control/DetailsControl';
import BaseLoading from 'src/components/widget/BaseLoading/BaseLoading';
import { getWindowWH } from '../../utils/utils';
import {
  DetailsWrapper,
  DetailsContent,
} from './style';
import {
  IStaticOptions,
  serviceHandleGetOneArticleInfo,
  serviceHandleFixedControlBarStar,
  serviceHandleCreateCollection,
  serviceHandleSaveToCollection,
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
  loadingWrapperWidth: number;
  loadingWrapperHeight: number;

  // ** 固定栏相关props **
  collectionInputValue: {
    value: string | '',
  };

  serviceState: IStaticOptions;
};


/**
 * 单个文章详情页
 */
class Details extends React.PureComponent<IDetailsProps, IDetailsState> {

  public readonly state = {
    visible: false,
    loadingWrapperWidth: 0,
    loadingWrapperHeight: 0,
    collectionInputValue: {
      value: '',
    },
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
      isLiked: false,     // 是否点过赞
      comments: [],      // 评论信息
      collections: [],   // 我的收藏夹列表
      collectionName: '',   // 添加至的收藏夹名称
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
    const { winWidth, winHeight } = getWindowWH();

    this.setState({
      visible: true,
      loadingWrapperWidth: winWidth,
      loadingWrapperHeight: winHeight,
    });
  }

  /**
   * 处理固钉栏 点赞
   */
  public handleControlBarStar: React.MouseEventHandler = (
    e: React.MouseEvent,
  ): void => {
    e.currentTarget.classList
      .contains('fixed-control-bar-star-active')
      ? serviceHandleFixedControlBarStar(
        this.props.match.params.id,
        false,
        () => {
          message.info('取消了赞!');
        },
      )
      : serviceHandleFixedControlBarStar(
        this.props.match.params.id,
        true,
        () => {
          message.success(`
                你赞了 ${this.state.serviceState.author} 的文章
              `);
        },
      );

    e.currentTarget.classList
      .toggle('fixed-control-bar-star-active');
  }

  /**
   * 处理 添加收藏表单
   * @param changedFields 值
   */
  public handleCollectionsInputChange = (
    changedFields: any,
  ) => {
    this.setState({
      collectionInputValue: {
        value: changedFields.collection_input.value,
      },
    });
  }

  /**
   * 处理 提交添加收藏表单
   * @param e mouseEvent
   * @param inputRef input输入框
   */
  public handleSendCollection = (
    e: React.MouseEvent,
    inputRef: any,
  ) => {
    this.state.collectionInputValue.value
      && serviceHandleCreateCollection(
        this.state.collectionInputValue.value,
        (data) => {
          this.setState((prevState) => {
            return {
              ...prevState,
              serviceState: {
                ...prevState.serviceState,
                collections: prevState.serviceState.collections.concat(
                  data.collection
                ),
              },
            };
          });
          inputRef.input.value = '';
        },
      );
  }

  /**
   * 处理 确认添加至收藏夹
   * @param collectionId 收藏夹id
   */
  public handleSaveToCollection = (
    collectionId: string,
  ) => {
    serviceHandleSaveToCollection(
      this.props.match.params.id,
      collectionId,
      (data) => {
        this.setState((prevState) => {
          return {
            ...prevState,
            serviceState: {
              ...prevState.serviceState,
              collectionName: data.collectionName,
            },
          };
        }, () => {
          notification.success({
            message: '提示',
            description: `成功添加到 ${
              this.state.serviceState.collectionName
              }`,
          });
        });
      }
    );
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
        <Header />
        <DetailsWrapper>
          <DetailsContent>
            <Row>
              <Col span={18}>
                {/* 左边内容区域 */}
                <DetailsMain
                  {...this.state.serviceState}
                  {...this.props.AuthRouteReducer}
                  onSendComment={this.handleSendComment}
                  onSendReply={this.handleSendReply}
                />
              </Col>
              <Col span={6}>
                {/* 右边侧边栏区域 */}
                <DetailsRight
                  {...this.state.serviceState}
                />
              </Col>
            </Row>
          </DetailsContent>
        </DetailsWrapper>

        {/* 左侧固钉控制栏 */}
        <DetailsControl
          collections={this.state.serviceState.collections}

          isLiked={this.state.serviceState.isLiked}
          onControlBarStar={this.handleControlBarStar}

          onCollectionsInputChange={this.handleCollectionsInputChange}
          onSendCollection={this.handleSendCollection}
          collectionInputValue={this.state.collectionInputValue}

          onSaveToCollection={this.handleSaveToCollection}
        />

        {/* Loading */}
        <BaseLoading visible={this.state.visible} />
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