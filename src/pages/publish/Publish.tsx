import * as React from 'react';
import {  Modal, notification } from 'antd';
import { connect } from 'react-redux';
import { History } from 'history';

import Header from '../../components/header/Header';
import Write from '../../components/write/Write';
import { reduxHandleSendArticle } from './Publish.redux';


export interface IPublishProps {
  history: History;

  AuthRouteReducer: any;
  PublishReducer: { message: string, articleid: string };

  reduxHandleSendArticle: (
    data: any, 
    callback: () => void
  ) => void;
};
interface IPublishState {};


/**
 * 发表文章
 */
class Publish extends React.PureComponent<IPublishProps, IPublishState> {

  public componentDidMount(): void {
    this.handleShowTipModal();
  }


  //// 显示写作规范
  public handleShowTipModal = () => {
    this.props.AuthRouteReducer.isAuth
      ? Modal.warning({
          title: '请仔细阅读写作规范!',
          content: (
            <div>
              <ol>
                <li>不得出现暴力、色情、犯罪等内容</li>
                <li>不能发布虚假信息</li>
                <li>不得包含个人广告, 任何二维码等信息</li>
                <li>尊重原创, 转载请注明出处</li>
              </ol>
            </div>
          ),
          okText: '已阅',
        })
      : notification.error({
          message: '错误!',
          description: '请登录后再发表文章!'
        });
  }


  //// 提交文章
  public handleSendArticle = (
    data: any,
  ) => {
    this.props.reduxHandleSendArticle(data, () => {
      notification.success({
        message: '提示',
        description: this.props.PublishReducer.message,
      })
      setTimeout(() => {
        this.props.history.push('/article');
      }, 1000);
    });
  }


  public render(): JSX.Element {
    return (
      <React.Fragment>
        <Header />
        <Write 
          onSendArticle={this.handleSendArticle}
        />
      </React.Fragment>
    );
  }

}


function mapStateToProps(state: any) {
  return {
    PublishReducer: state.PublishReducer,
    AuthRouteReducer: state.AuthRouteReducer,
  };
}
function mapDispatchToProps() {
  return {
    reduxHandleSendArticle,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(Publish) as React.ComponentClass<any>;





