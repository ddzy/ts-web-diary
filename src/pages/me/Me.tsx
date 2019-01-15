import * as React from 'react';
import { connect } from 'react-redux';
import { notification } from 'antd';
import { History } from 'history';
import { hot } from 'react-hot-loader';

import {
  MeWrapper,
  MeContent,
} from './style';
import MeInfo from './me_info/MeInfo';
import MeDashboard from './me_dashboard/MeDashboard';
import {
  IStaticOptions,
  serviceHandleGetMyArticleList,
  serviceHandleDeleteMyArticle,
  serviceHandleGetMyArticle,
  serviceHandleDeleteMyCollection,
  serviceHandleGetMyCollection,
} from './Me.service';


export interface IMeProps {
  history: History;

  AuthRouteReducer: {
    username: string,
    usergender: string,
    useravatar: string,
  };
};
interface IMeState {
  serviceState: IStaticOptions;
};


@(connect(mapStateToProps) as any)
class Me extends React.Component<IMeProps, IMeState> {

  public readonly state = {
    serviceState: {
      my_article_list: [],
      delete_article_title: '',
      my_collection_list: [],
    },
  }

  public componentDidMount(): void {
    serviceHandleGetMyArticleList((data) => {
      this.setState((prevState) => {
        return {
          ...prevState,
          articleInfo: {
            ...prevState.serviceState,
            my_article_list: data.myArticleList,
          },
        };
      });
    });
  }

  /**
   * 处理 删除成功提示
   */
  public handleDeleteSuccess = (): void => {
    this.state.serviceState.delete_article_title
      && notification.success({
        message: '成功删除文章',
        description: this.state.serviceState.delete_article_title,
      });
  }

  /**
   * 处理 删除我的文章
   */
  public handleArticleDelete = (
    e: React.MouseEvent,
    id: string,
  ): void => {
    serviceHandleDeleteMyArticle(id, (data) => {
      this.setState((prevState) => {
        return {
          ...prevState,
          serviceState: {
            ...prevState.serviceState,
            delete_article_title: data.title,
            my_article_list: data.myArticleList,
          },
        };
      }, () => {
          this.handleDeleteSuccess();
      });
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
    serviceHandleGetMyArticle(type, (data) => {
      this.setState((prevState) => {
        return {
          ...prevState,
          serviceState: {
            ...prevState.serviceState,
            my_article_list: data.myArticleList,
          },
        };
      });
    });
  }

  /**
   * 处理 我的收藏分类管理
   * @param type tab名称
   */
  public handleSupTabChange = (
    type: string,
  ): void => {
    type === '收藏'
      && serviceHandleGetMyCollection((data) => {
        this.setState((prevState) => {
          return {
            ...prevState,
            serviceState: {
              ...prevState.serviceState,
              my_collection_list: data.my_collection_list,
            },
          };
        });
      });
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
    serviceHandleDeleteMyCollection(collectionId, (data) => {
      this.setState((prevState) => {
        return {
          ...prevState,
          serviceState: {
            ...prevState.serviceState,
            my_collection_list: prevState.serviceState.my_collection_list.filter((item) => {
              return item._id !== data.collectionId;
            }),
          },
        };
      });
    });
  }


  public render(): JSX.Element {
    return (
      <React.Fragment>
        <MeWrapper>
          <MeContent>
            {/* 个人信息 */}
            <MeInfo
              {...this.props.AuthRouteReducer}
            />

            {/* 个人文章 */}
            <MeDashboard
              {...this.state.serviceState}
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
  };
}


export default hot(module)(Me);