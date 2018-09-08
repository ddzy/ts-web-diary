import * as React from 'react';
import { connect } from 'react-redux';
import { notification } from 'antd';

import {
  MeWrapper,
  MeContent,
} from './style';
import Header from '../../components/header/Header';
import MeInfo from './me_info/MeInfo';
import MeArticle from './me_article/MeArticle';
import { 
  getMyArticleList, 
  deleteMyArticle,
  reduxHandleGetMyArticle,
  reduxHandleGetMyCollection,
} from './Me.redux';
import { History } from 'history';


export interface IMeProps {
  history: History;

  AuthRouteReducer: { 
    username: string, 
    usergender: string,
    useravatar: string, 
  };
  MeReducer: {
    my_article_list: any[];   // 我的文章列表
    delete_article_title: string;   // 删除的文章标题
    my_collection_list: any[];      // 我的收藏列表
  },

  getMyArticleList: () => void;   // 获取文章列表
  deleteMyArticle: (              // 删除我的文章
    id: string,
    callback: (title: string) => void,
  ) => void;
  reduxHandleGetMyArticle: (      // 我的文章 分类管理
    type: string,
  ) => void;           
  
  reduxHandleGetMyCollection: (     // 获取我的收藏
    callback?: () => void,
  ) => void;   
};
interface IMeState {};



/**
 * 个人中心
 */
class Me extends React.Component<IMeProps, IMeState> {

  public readonly state = {}

  
  public componentDidMount(): void {
    this.props.getMyArticleList();
  }


  /**
   * 处理 删除成功提示
   */
  public handleDeleteSuccess = () => {
    this.props.MeReducer.delete_article_title
      && notification.success({
          message: '成功删除文章',
          description: this.props.MeReducer.delete_article_title,
        });
  }


  /**
   * 处理 删除我的文章
   */
  public handleArticleDelete = (
    e: React.MouseEvent,
    id: string,
  ) => {
    this.props.deleteMyArticle(id, () => {
      this.handleDeleteSuccess();
    });
  }


  /**
   * 处理 编辑我的文章
   */
  public handleArticleEdit = (
    e: React.MouseEvent,
    id: string,
  ) => {
    this.props.history.push(`/edit/${id}`);
  }


  /**
   * 处理 我的文章分类管理
   */
  public handleMyArticleTabChange = (
    type: string,
  ) => {
    this.props.reduxHandleGetMyArticle(
      type,
    );
  }


  /**
   * 处理 我的收藏分类管理
   * @param type tab名称
   */
  public handleSupTabChange = (
    type: string,
  ) => {
    type === '收藏'
      && this.props.reduxHandleGetMyCollection();  
  }


  public render(): JSX.Element {
    return (
      <React.Fragment>
        <Header />

        <MeWrapper>
          <MeContent>
            {/* 个人信息 */}
            <MeInfo 
              {...this.props.AuthRouteReducer}
            />

            {/* 个人文章 */}
            <MeArticle 
              {...this.props.MeReducer}
              onArticleDelete={this.handleArticleDelete}
              onArticleEdit={this.handleArticleEdit}
              onMyArticleTabChange={this.handleMyArticleTabChange}

              onSupTabChange={this.handleSupTabChange}
            />
          </MeContent>
        </MeWrapper>
      </React.Fragment>
    );
  }

}


function mapStateToProps(state: any) {
  return {
    AuthRouteReducer: state.AuthRouteReducer,
    MeReducer: state.MeReducer,
  };
}

function mapDispatchToProps() {
  return {
    getMyArticleList,
    deleteMyArticle,
    reduxHandleGetMyArticle,
    reduxHandleGetMyCollection,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(Me) as React.ComponentClass<any>;