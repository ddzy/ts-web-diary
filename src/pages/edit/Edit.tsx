import * as React from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import { notification } from 'antd';

import Header from '../../components/header/Header';
import Write from '../../components/write/Write';
import { 
  getEditArticleInfo, 
  sendEditArticleInfo,
} from './Edit.redux';


export interface IEditProps {
  match: any;
  history: History;

  EditReducer: { articleInfo: any };
  AuthRoueReducer: { username: string };

  getEditArticleInfo: (
    articleid: string,
  ) => void;
  sendEditArticleInfo: (
    data: any,
    callback: () => void,
  ) => void;
};
interface IEditState {};


/**
 * 编辑文章页
 */
class Edit extends React.PureComponent<IEditProps, IEditState> {

  public readonly state = {}


  public componentDidMount(): void {
    /// 要编辑的文章id
    const { id } = this.props.match.params;

    this.props.getEditArticleInfo(id);
  }



  //// 提交编辑后的文章
  public handleSendArticle = (
    values: any,
  ) => {
    this.props.sendEditArticleInfo(
      { ...values, articleid: this.props.match.params.id },
      () => {
        notification.success({
          message: '提示信息',
          description: '更新文章成功!!!',
        });

        setTimeout(() => {
          this.props.history.push('/me');
        }, 1000);
      }
    );
  }


  public render(): JSX.Element {
    return (
      <React.Fragment>
        <Header />
        <Write
          username={this.props.AuthRoueReducer.username}  
          onSendArticle={this.handleSendArticle}
          defaultEditValue={this.props.EditReducer.articleInfo}
        />
      </React.Fragment>
    );
  }

}


function mapStateToProps(state: any) {
  return {
    AuthRouteReducer: state.AuthRouteReducer,
    EditReducer: state.EditReducer,
  };
}
function mapDispatchToProps() {
  return {  
    getEditArticleInfo,
    sendEditArticleInfo,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(Edit) as React.ComponentClass<any>;