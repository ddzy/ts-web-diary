import * as React from 'react';
import { match } from 'react-router';
import { notification } from 'antd';

import {
  CollectionContainer,
  CollectionMain,
  MainHeaderWrapper,
  MainHeaderContent,
  MainContentWrapper,
  MainContentTipBox,
  MainContentTipText,
  MainContentShowBox,
} from './style';
import collection_bg from '../../static/images/bg_img.png';
import CollectionShowItem from './collection_show/CollectionShowItem';

import {
  IStaticOptions,
  serviceHandleGetCollectionInfo,
  serviceHandleDeleteCollectionArticle,
} from './Collection.service';


export interface ICollectionProps {
  match: match<any>;
};
interface ICollectionState {
  serviceState: IStaticOptions;
};


/**
 * 收藏页
 */
class Collection extends React.PureComponent<
  ICollectionProps,
  ICollectionState
  > {

  public readonly state = {
    serviceState: {
      collectionInfo: {
        name: '',
        articles: [],
      },
    },
  };

  public componentDidMount(): void {
    this.handleGetCollectionInfo();
  }

  /**
   * 处理 获取单个收藏夹信息
   */
  public handleGetCollectionInfo = () => {
    const { id } = this.props.match.params;

    serviceHandleGetCollectionInfo(id, (data) => {
      this.setState((prevState) => {
        return {
          ...prevState,
          serviceState: {
            ...prevState.serviceState,
            collectionInfo: {
              ...prevState.serviceState,
              ...data,
            },
          },
        };
      });
    });
  }

  /**
   * 处理 初始化单个收藏夹 文章列表
   */
  public handleInitShowItem = () => {
    return (
      <CollectionShowItem
        {...this.state.serviceState.collectionInfo}
        onDeleteCollectionArticle={
          this.handleDeleteCollectionArticle
        }
      />
    );
  }

  /**
   * 处理 删除单个文章
   */
  public handleDeleteCollectionArticle = (
    e: React.MouseEvent,
    articleId: string,
  ) => {
    serviceHandleDeleteCollectionArticle(
      articleId,
      this.props.match.params.id,
      (data) => {
        this.setState((prevState) => {
          return {
            ...prevState,
            serviceState: {
              ...prevState.serviceState,
              collectionInfo: {
                ...prevState.serviceState.collectionInfo,
                articles: prevState.serviceState.collectionInfo.articles
                .filter((item: any) => {
                  return item._id !== data.result.articleId;
                }),
              },
            },
          };
        }, () => {
            notification.success({
              message: '提示',
              description: '成功移除此文章!',
            });
        });
      },
    );
  }

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <CollectionContainer>
          <CollectionMain>
            <MainHeaderWrapper>
              <MainHeaderContent
                bg_img_url={collection_bg}
              />
            </MainHeaderWrapper>

            <MainContentWrapper>
              <MainContentTipBox>
                <MainContentTipText>
                  {this.state.serviceState.collectionInfo.name}
                </MainContentTipText>
              </MainContentTipBox>

              <MainContentShowBox>
                {this.handleInitShowItem()}
              </MainContentShowBox>
            </MainContentWrapper>
          </CollectionMain>
        </CollectionContainer>
      </React.Fragment>
    );
  }

}


export default Collection;