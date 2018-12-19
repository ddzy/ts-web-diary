import * as React from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import { notification } from 'antd';
import { match } from 'react-router';

import Header from '../../components/header/Header';
import Write from '../../components/write/Write';
import {
  serviceHandleGetEditArticleInfo,
  serviceHandleSendEditArticleInfo,
} from './Edit.service';


export interface IEditProps {
  match: match<any>;
  history: History;

  AuthRoueReducer: { username: string };
};
interface IEditState {
  articleInfo: any;
};


/**
 * 编辑文章页
 */
class Edit extends React.PureComponent<IEditProps, IEditState> {

  public readonly state = {
    articleInfo: {},
  }

  public componentDidMount(): void {
    // ** 要编辑的文章id **
    const { id } = this.props.match.params;

    serviceHandleGetEditArticleInfo(id, (data) => {
      this.setState({ articleInfo: data.articleInfo });
    });
  }

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
          defaultEditValue={this.state.articleInfo}
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

export default connect(
  mapStateToProps,
)(Edit) as React.ComponentClass<any>;