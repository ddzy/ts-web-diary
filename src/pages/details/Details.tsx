import * as React from 'react';
import {
  Row,
  Col,
  Spin,
  notification,
  message,
} from 'antd';
import { History } from 'history';
import { match } from 'react-router';
import { connect } from 'react-redux';

import Header from '../../components/header/Header';
import DetailsLeft from './details_left/DetailsLeft';
import DetailsRight from './details_right/DetailsRight';
import DetailsControl from './details_control/DetailsControl';
import { 
  getOneArticleInfo, 
  reduxHandleSendComment, 
  reduxHandleSendReply,
  reduxHandleFixedControlBarStar,
  reduxHandleCreateCollection,
  reduxHandleSaveToCollection,
} from './Details.redux';
import { getWindowWH } from '../../utils/utils';
import {
  DetailsWrapper,
  DetailsContent,
} from './style';
import { emojify } from 'react-emojione';

export interface IDetailsProps {
  location: Location;
  history: History;
  match: match<any>;

  DetailsReducer: { detailsInfo: any };
  AuthRouteReducer: { useravatar: string, };

  getOneArticleInfo: (
    articleid: string,
    callback: () => void,
  ) => void;
  reduxHandleSendComment: (
    articleid: string,
    commentValue: string,
    callback?: () => void,
  ) => void;
  reduxHandleSendReply: (
    commentid: string,
    commentValue: string,
    articleid: string,
    callback?: () => void,
  ) => void;
  reduxHandleFixedControlBarStar: (
    articleid: string,
    liked: boolean,
    callback?: () => void,
  ) => void;
  reduxHandleCreateCollection: (
    collectionName: string,
    callback?: () => void,
  ) => void;
  reduxHandleSaveToCollection: (
    articleId: string,
    collectionId: string,
    callback?: () => void,
  ) => void;
};
interface IDetailsState {
  visible: boolean;       // loading显示隐藏
  loadingWrapperWidth: number;      // loading宽
  loadingWrapperHeight: number;   // loading高

  commentInputValue: {                   // 评论输入框
    value: string | '',                 
  },

  replyInputValue: {
    value: string | '',           // 回复输入框
  },

  collectionInputValue: {
    value: string | '',           // 收藏弹出层输入框
  },


  commentInputValueNew: string;
};


/**
 * 单个文章详情页
 */
class Details extends React.PureComponent<IDetailsProps, IDetailsState> {


  public readonly state = {
    visible: false,
    loadingWrapperWidth: 0,
    loadingWrapperHeight: 0,
    commentInputValue: {
      value: '',
    },
    replyInputValue: {
      value: '',
    },
    collectionInputValue: {
      value: '',
    },


    // 重构
    commentInputValueNew: '',
  }


  public componentDidMount(): void {

    this.initLoadingWrapper();

    this.props.getOneArticleInfo(
      this.props.match.params.id,
      () => {
        this.setState({
          visible: false,
        });
      },
    );
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
   * 处理评论提交
   */
  public handleSendComment = (
    e: React.MouseEvent,
    inputRef: any,
  ): void => {
    this.state.commentInputValueNew
      ? this.props.reduxHandleSendComment(
          this.props.match.params.id,
          this.state.commentInputValueNew,
          () => {
            // 清空输入框
            inputRef.textAreaRef.value = '';
            notification.success({
              message: '提示:',
              description: '评论发表成功!'
            });
          },
        )
      : notification.error({
          message: '错误:',
          description: '评论不能为空!'
        });
  }


  /**
   * 处理回复 输入
   */
  public handleReplyInputChange = (changedFields: any): void => {
    this.setState({
      replyInputValue: {
        value: changedFields.reply_input.value,
      },
    });
  }


  /**
   * 处理回复 提交
   */
  public handleSendReply = (
    e: React.MouseEvent,
    inputRef: any,
    commentid: string,
  ): void => {

    this.state.replyInputValue.value === ''
      ? notification.error({
          message: '提示',
          description: '回复不能为空!',
        })
      : this.props.reduxHandleSendReply(
          commentid,
          this.state.replyInputValue.value,
          this.props.match.params.id,
          () => {
            // 清空输入框
            inputRef.input.value = '';
            notification.success({
              message: '提示',
              description: '回复成功!'
            });
          },
        );
  }


  /**
   * 处理固钉栏 点赞
   */
  public handleControlBarStar: React.MouseEventHandler = (
    e: React.MouseEvent,
  ): void => {
    e.currentTarget.classList
      .contains('fixed-control-bar-star-active')
        ? this.props.reduxHandleFixedControlBarStar(
            this.props.match.params.id,
            false,
            () => {
              message.info('取消了赞!');
            },
          )
        : this.props.reduxHandleFixedControlBarStar(
            this.props.match.params.id,
            true,
            () => {
              message.success(`
                你赞了 ${this.props.DetailsReducer.detailsInfo.author} 的文章
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
      && this.props.reduxHandleCreateCollection(
          this.state.collectionInputValue.value,
          () => {
            inputRef.input.value = '';
          }
        );
  }

  
  /**
   * 处理 确认添加至收藏夹
   * @param collectionId 收藏夹id
   */
  public handleSaveToCollection = (
    collectionId: string,
  ) => {
    this.props.reduxHandleSaveToCollection(
      this.props.match.params.id,
      collectionId,
      () => {
        this.props.DetailsReducer.detailsInfo.collectionName
          && notification.success({
            message: '提示',
            description: `成功添加到 ${
              this.props.DetailsReducer.detailsInfo.collectionName
            }`,
          })
      }
    );
  }

  /// 重构
  public handleCommentInputChangeNew = (
    e: React.ChangeEvent,
  ): void => {
    const value = e.currentTarget.textContent as string;

    this.setState({
      commentInputValueNew: value,
    });
  }

  public handleSendCommentNew = (): void => {
    console.log(this.state.commentInputValueNew);

    this.state.commentInputValueNew
      ? this.props.reduxHandleSendComment(
          this.props.match.params.id,
          this.state.commentInputValueNew,
          () => {
            notification.success({
              message: '提示:',
              description: '评论发表成功!'
            });
          },
        )
      : notification.error({
          message: '错误:',
          description: '评论不能为空!'
        });
  }

  public handleCommentEmojiChange = (
    e: React.MouseEvent,
  ): void => {
    const target = e.currentTarget as HTMLElement;
    const tTitle = target.getAttribute('title') as string;
    const emoji = emojify(tTitle, { output: 'unicode' });

    this.setState((prevState) => ({
      commentInputValueNew: `${prevState.commentInputValueNew}${emoji}`,
    }));
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
                <DetailsLeft 
                  {...this.props.DetailsReducer.detailsInfo}
                  {...this.props.AuthRouteReducer}
                  onSendComment={this.handleSendComment}

                  onReplyInputChange={this.handleReplyInputChange}
                  onSendReply={this.handleSendReply}
                  replyInputValue={this.state.replyInputValue}


                  onCommentInputChangeNew={this.handleCommentInputChangeNew}
                  onSendCommentNew={this.handleSendCommentNew}
                  commentInputValueNew={this.state.commentInputValueNew}

                  onCommentEmojiChange={this.handleCommentEmojiChange}
                />
              </Col>
              <Col span={6}>
                {/* 右边侧边栏区域 */}
                <DetailsRight 
                  {...this.props.DetailsReducer.detailsInfo}
                />
              </Col>
            </Row>
          </DetailsContent>
        </DetailsWrapper>

        {/* 左侧固钉控制栏 */}
        <DetailsControl
          collections={this.props.DetailsReducer.detailsInfo.collections}

          isLiked={this.props.DetailsReducer.detailsInfo.isLiked} 
          onControlBarStar={this.handleControlBarStar}

          onCollectionsInputChange={this.handleCollectionsInputChange}
          onSendCollection={this.handleSendCollection}
          collectionInputValue={this.state.collectionInputValue}

          onSaveToCollection={this.handleSaveToCollection}
        />

        {/* Loading */}
        <div
          id="details-loading"
          style={{
            position: 'fixed',
            left: '0',
            top: '50px',
            display: this.state.visible
              ? 'block'
              : 'none',
            width: `${this.state.loadingWrapperWidth}px`,
            height: `${this.state.loadingWrapperHeight}px`,
            backgroundColor: 'rgba(0,0,0,.05)'
          }}
        >
          <div
            style={{ 
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Spin size="large" />
          </div>
        </div>
      </React.Fragment>
    );
  }

}


function mapStateToProps(state: any) {
  return {
    DetailsReducer: state.DetailsReducer,
    AuthRouteReducer: state.AuthRouteReducer,
  };
}
function mapDispatchToProps() {
  return {
    getOneArticleInfo,
    reduxHandleSendComment,
    reduxHandleSendReply,
    reduxHandleFixedControlBarStar,
    reduxHandleCreateCollection,
    reduxHandleSaveToCollection,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(Details) as React.ComponentClass<any>;