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
const Collection = React.memo<ICollectionProps>((
  props: ICollectionProps,
): JSX.Element => {
  const [
    state,
    setState,
  ] = React.useState<ICollectionState>({
    serviceState: {
      collectionInfo: {
        name: '',
        articles: [],
      },
    },
  });

  React.useEffect(() => {
    handleGetCollectionInfo();
  }, [])

  /**
   * 处理 获取单个收藏夹信息
   */
  function handleGetCollectionInfo(): void {
    const { id } = props.match.params;

    serviceHandleGetCollectionInfo(id, (data) => {
      setState({
        ...state,
        serviceState: {
          ...state.serviceState,
          collectionInfo: {
            ...state.serviceState.collectionInfo,
            ...data.collectionInfo,
          },
        },
      });
    });
  }

  /**
   * 处理 初始化单个收藏夹 文章列表
   */
  function handleInitShowItem(): JSX.Element {
    return (
      <CollectionShowItem
        {...state.serviceState.collectionInfo}
        onDeleteCollectionArticle={
          handleDeleteCollectionArticle
        }
      />
    );
  }

  /**
   * 处理 删除单个文章
   */
  function handleDeleteCollectionArticle(
    e: React.MouseEvent,
    articleId: string,
  ): void {
    serviceHandleDeleteCollectionArticle(
      articleId,
      props.match.params.id,
      (data) => {
        setState({
          ...state,
          serviceState: {
            ...state.serviceState,
            collectionInfo: {
              ...state.serviceState.collectionInfo,
              articles: state.serviceState.collectionInfo.articles.filter((item: any) => item._id !== data.result.articleId),
            },
          },
        });

        notification.success({
          message: '成功',
          description: '成功移除该文章!',
        });
      },
    );
  }

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
                {state.serviceState.collectionInfo.name}
              </MainContentTipText>
            </MainContentTipBox>

            <MainContentShowBox>
              {handleInitShowItem()}
            </MainContentShowBox>
          </MainContentWrapper>
        </CollectionMain>
      </CollectionContainer>
    </React.Fragment>
  );
});


export default Collection;