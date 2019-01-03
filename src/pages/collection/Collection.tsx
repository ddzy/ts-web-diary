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
  IServiceState,
  serviceHandleGetCollectionInfo,
  serviceHandleDeleteCollectionArticle,
} from './Collection.service';


export interface ICollectionProps {
  match: match<any>;
};
interface ICollectionState extends IServiceState {
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
    collectionInfo: {
      name: '',
      articles: [],
      create_time: Date.now(),
      _id: '',
    },
  });

  React.useEffect(() => {
    handleGetCollectionInfo();
  }, [])

  /**
   * 处理 获取收藏夹信息
   */
  function handleGetCollectionInfo(): void {
    const { id } = props.match.params;

    serviceHandleGetCollectionInfo({
      collectionId: id,
    }, (data) => {
      const {
        collectionInfo,
      } = data.info;

      setState({
        collectionInfo,
      });
    });
  }

  /**
   * 处理 初始化收藏夹 文章列表
   */
  function handleInitShowItem(): JSX.Element {
    return (
      <CollectionShowItem
        {...state.collectionInfo}
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
    const {
      id
    } = props.match.params;

    serviceHandleDeleteCollectionArticle(
      {
        articleId,
        collectionId: id,
      },
      (data) => {
        const {
          collectionInfo,
        } = data.info;

        setState({
          ...state,
          collectionInfo: {
            ...state.collectionInfo,
            articles: state.collectionInfo.articles.filter((v) => v._id !== collectionInfo.articleId),
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
                {state.collectionInfo.name}
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