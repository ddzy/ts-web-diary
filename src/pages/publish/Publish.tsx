import * as React from 'react';
import {
  Modal,
  notification,
} from 'antd';
import { connect } from 'react-redux';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import { query } from 'services/request';
import {
  TRACK_TYPE,
} from 'constants/constants';
import Write from '../../components/write/Write';


export interface IPublishProps extends RouteComponentProps {
  AuthRouteReducer: { isAuth: boolean, username: string };
};
interface IPublishState {
};


class Publish extends React.PureComponent<IPublishProps, IPublishState> {

  public readonly state: IPublishState = {
  }

  public componentDidMount(): void {
    this.handleShowTipModal();
  }

  /**
   * [处理] - 显示写作规范
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
   * [处理] - 提交文章
   */
  public handleSendArticle = (
    data: any,
  ): void => {
    const userId = localStorage.getItem('userid');

    if (!userId || typeof userId !== 'string') {
      notification.error({
        message: '错误',
        description: '鉴权信息已失效, 请登录后再发表!',
      });

      this.props.history.push('/login');

      return;
    }

    const trackType = TRACK_TYPE.create.article;

    query({
      url: '/api/article/create',
      method: 'POST',
      jsonp: false,
      data: {
        ...data,
        userId,
        trackType,
      },
    }).then((res) => {
      const { code } = res;

      if (code === 0) {
        notification.success({
          message: '成功',
          description: '成功发表文章, 稍后直接进入首页查看',
        });

        this.props.history.push(`/home/${data.type}`);
      } else {
        notification.error({
          message: '失败',
          description: '发表文章时, 遇到了难以预计的错误, 请稍后重试!',
        });
      }
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


export default withRouter(connect(mapStateToProps)(Publish) as any);