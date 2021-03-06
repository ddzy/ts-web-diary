import * as React from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import { notification } from 'antd';
import { match } from 'react-router';
import { hot } from 'react-hot-loader';

import Header from '../../components/header/Header';
import Write from '../../components/write/Write';
import {
  // serviceHandleGetEditArticleInfo,
  serviceHandleSendEditArticleInfo,
} from './Edit.service';
import { Delta } from 'quill';


export interface IEditProps {
  match: match<any>;
  history: History;

  AuthRoueReducer: { username: string };
};
type IEditState = typeof initialState;


const initialState = {
  articleInfo: {
    // 文章标题
    title: '',
    // 文章内容
    content: new Delta(),
    // 文章主题图片
    cover_img: '',
    // 文章模式
    mode: '',
    // 文章分类
    type: '',
    // 文章标签
    tag: [],
  },
};


@(connect(mapStateToProps) as any)
class Edit extends React.PureComponent<IEditProps, IEditState> {

  public readonly state = initialState;

  // public componentDidMount(): void {
  //   // ** 要编辑的文章id **
  //   const { id } = this.props.match.params;

  //   // serviceHandleGetEditArticleInfo(id, (data) => {
  //   //   this.setState({ articleInfo: data.articleInfo });
  //   // });
  // }

  /**
   * 提交编辑后的文章
   */
  public handleSendArticle = (
    values: any,
  ) => {
    serviceHandleSendEditArticleInfo(
      { ...values, articleid: this.props.match.params.id },
      (data) => {
        this.setState({ articleInfo: data.articleInfo }, () => {
          notification.success({
            message: '提示信息',
            description: '更新文章信息!!!',
          });

          setTimeout(() => {
            this.props.history.push('/me');
          }, 1000);
        });
      },
    );
  }

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <Header />
        <Write
          username={this.props.AuthRoueReducer.username}
          onSendArticle={this.handleSendArticle}
          defaultArticleInfo={this.state.articleInfo}
        />
      </React.Fragment>
    );
  }

}


function mapStateToProps(state: any) {
  return {
    AuthRouteReducer: state.AuthRouteReducer,
  };
}


export default hot(module)(Edit);