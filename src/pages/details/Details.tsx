import * as React from 'react';
import {
  Row,
  Col,
  Spin,
  notification,
} from 'antd';
import { History } from 'history';
import { match } from 'react-router';
import { connect } from 'react-redux';

import Header from '../../components/header/Header';
import DetailsLeft from './details_left/DetailsLeft';
import DetailsRight from './details_right/DetailsRight';
import { 
  getOneArticleInfo, 
  reduxHandleSendComment, 
} from './Details.redux';
import { getWindowWH } from '../../utils/utils';
import {
  DetailsWrapper,
  DetailsContent,
} from './style';



export interface IDetailsProps {
  location: Location;
  history: History;
  match: match<any>;

  DetailsReducer: { detailsInfo: any };
  getOneArticleInfo: (
    articleid: string,
    callback: () => void,
  ) => void;
  reduxHandleSendComment: (
    articleid: string,
    commentValue: string,
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


  //// 处理loading框
  public initLoadingWrapper = (): void => {
    const { winWidth, winHeight } = getWindowWH();

    this.setState({
      visible: true,
      loadingWrapperWidth: winWidth,
      loadingWrapperHeight: winHeight,
    });
  }


  //// 处理评论输入
  public handleCommentInputChange = (changedFields: any) => {
    this.setState({
      commentInputValue: {
        value: changedFields.comment_input.value,
      },
    });
  }


  //// 处理评论提交
  public handleSendComment = (e: React.MouseEvent) => {
    this.state.commentInputValue.value
      ? this.props.reduxHandleSendComment(
          this.props.match.params.id,
          this.state.commentInputValue.value,
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
                  onCommentInputChange={this.handleCommentInputChange}
                  onSendComment={this.handleSendComment}
                  commentInputValue={this.state.commentInputValue}
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
  };
}
function mapDispatchToProps() {
  return {
    getOneArticleInfo,
    reduxHandleSendComment,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(Details) as React.ComponentClass<any>;