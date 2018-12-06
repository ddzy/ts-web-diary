import * as React from 'react';
import { connect } from 'react-redux';
import { notification } from 'antd';

import {
  MeWrapper,
  MeContent,
} from './style';
import Header from '../../components/header/Header';
import MeInfo from './me_info/MeInfo';
import MeArticle from './me_dashboard/MeDashboard';
import { 
  getMyArticleList, 
  deleteMyArticle,
  reduxHandleGetMyArticle,
  reduxHandleGetMyCollection,
  reduxHandleDeleteMyCollection,
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
  
  reduxHandleGetMyCollection: (     // 获取我的收藏夹 
    callback?: () => void,
  ) => void; 
  
  reduxHandleDeleteMyCollection: (    // 删除我的收藏夹
    collectionId: string,
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
  public handleDeleteSuccess = (): void => {
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
  ): void => {
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
  ): void => {
    this.props.history.push(`/edit/${id}`);
  }


  /**
   * 处理 我的文章分类管理
   */
  public handleMyArticleTabChange = (
    type: string,
  ): void => {
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
  ): void => {
    type === '收藏'
      && this.props.reduxHandleGetMyCollection();  
  }


  /**
   * 处理 点击我的收藏列表 进入收藏页
   */
  public handleCollectionItemClick = (
    e: React.MouseEvent,
    collectionId: string,
  ): void => {
    this.props.history.push(
      `/collection/${collectionId}`,
    );
  }


  /**
   * 处理 删除我的收藏夹
   */
  public handleCollectionItemDelete = (
    e: React.MouseEvent,
    collectionId: string,
  ) => {
    this.props.reduxHandleDeleteMyCollection(
      collectionId,
      () => {
        notification.success({
          message: '提示',
          description: '成功移除该收藏夹!',
        });
      },
    );
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

              onCollectionItemClick={this.handleCollectionItemClick}

              onCollectionItemDelete={
                this.handleCollectionItemDelete
              }
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
    reduxHandleDeleteMyCollection,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(Me) as React.ComponentClass<any>;