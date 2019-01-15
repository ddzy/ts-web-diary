import * as React from 'react';
import {  Modal, notification } from 'antd';
import { connect } from 'react-redux';
import { History } from 'history';
import { hot } from 'react-hot-loader';

import Write from '../../components/write/Write';
import {
  IStaticOptions,
  serviceHandleSendArticle,
} from './Publish.service';


export interface IPublishProps {
  history: History;
  AuthRouteReducer: { isAuth: boolean, username: string };
};
interface IPublishState {
  serviceState: IStaticOptions;
};


@(connect(mapStateToProps) as any)
class Publish extends React.PureComponent<IPublishProps, IPublishState> {

  public readonly state = {
    serviceState: {
      message: '',
    },
  }

  public componentDidMount(): void {
    this.handleShowTipModal();
  }

  /**
   * 显示写作规范
   */
  public handleShowTipModal = (): void => {
    this.props.AuthRouteReducer.isAuth
      && Modal.warning({
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
      });
  }

  /**
   * 提交文章
   */
  public handleSendArticle = (
    data: any,
  ): void => {
    serviceHandleSendArticle(data, (v) => {
      this.setState((prevState) => {
        return {
          ...prevState,
          serviceState: {
            ...prevState.serviceState,
            message: data.message,
          },
        };
      }, () => {
          notification.success({
            message: '提示',
            description: this.state.serviceState.message || '成功发布了文章!!!',
          });

          this.props.history.push('/home/frontend');
      });
    });
  }

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <Write
          username={this.props.AuthRouteReducer.username}
          onSendArticle={this.handleSendArticle}
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


export default hot(module)(Publish);