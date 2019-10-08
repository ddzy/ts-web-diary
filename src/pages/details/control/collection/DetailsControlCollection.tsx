import * as React from 'react';
import {
  notification,
  Tooltip,
  Popover,
  Icon,
  message,
} from 'antd';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router';

import {
  CollectionWrapper,
  CollectionMain,
} from './style';
import { query } from 'services/request';
import { IBaseCommonCollectionArticleInfo } from 'pages/details/Details.types';
import { PAGE_SIZE } from 'constants/constants';
import DetailsControlCollectionContent from './content/DetailsControlCollectionContent';


export interface IDetailsControlCollectionProps extends RouteComponentProps<{
  id: string,
}> {};
interface IDetailsControlCollectionState {
  // ? 收藏夹列表
  collectionList: IBaseCommonCollectionArticleInfo[];
  // ? 分页相关: 是否还有更多收藏夹
  hasMoreCollection: boolean;
};


const DetailsControlCollection = React.memo<IDetailsControlCollectionProps>((
  props: IDetailsControlCollectionProps,
): JSX.Element => {

  const [state, setState] = React.useState<IDetailsControlCollectionState>({
    collectionList: [],
    hasMoreCollection: true,
  });


  /**
   * [处理] - 获取收藏夹列表
   * @param page 当前页数
   * @param initialLoad 是否首次加载
   */
  function _getCollectionListFromServer(
    page: number,
    initialLoad: boolean,
  ): void {
    // 用户鉴权
    const userId = localStorage.getItem('userid');

    if (!userId) {
      notification.error({
        message: '错误',
        description: '用户凭证已丢失, 请重新登录!',
      });

      props.history.push('/login');
    }

    const articleId = props.match.params.id;
    const pageSize = PAGE_SIZE;

    query({
      url: '/api/collection/article/info/list',
      method: 'POST',
      jsonp: false,
      data: {
        userId,
        articleId,
        page,
        pageSize,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;
      const resData = res.data;

      if (resCode === 0) {
        const collectionList = resData.collectionList;
        const newCollectionList = initialLoad
          ? collectionList
          : state.collectionList.concat(collectionList);

        setState({
          ...state,
          collectionList: newCollectionList,
          hasMoreCollection: collectionList.length !== 0,
        });
      } else if (resCode === 1) {
        message.info(resMessage);
      } else {
        message.error(resMessage);
      }
    });
  }

  /**
   * [处理] - 初始化气泡框内容
   */
  function _initPopoverContent(): JSX.Element {
    return (
      <DetailsControlCollectionContent
        collectionList={state.collectionList}
        hasMoreCollection={state.hasMoreCollection}
        onSaveToCollection={handleSaveToCollection}
        onCreateCollection={handleCreateCollection}
        onLoadMoreCollection={handleLoadMoreCollection}
      />
    );
  }

  /**
   * [处理] - 创建新的收藏夹
   * @param collectionName 收藏夹名称
   */
  function handleCreateCollection(
    collectionName: string,
  ): void {
    // 用户鉴权
    const userId = localStorage.getItem('userid');

    if (!userId) {
      notification.error({
        message: '错误',
        description: '用户凭证已丢失, 请重新登录!',
      });

      props.history.push('/login');
    }

    query({
      jsonp: false,
      url: '/api/collection/article/create',
      method: 'POST',
      data: {
        userId,
        collectionName,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;
      const resData = res.data;

      if (resCode === 0) {
        const collectionInfo = resData.collectionInfo;
        const newCollectionList = state.collectionList.concat(collectionInfo);

        setState({
          ...state,
          collectionList: newCollectionList,
        });
      } else if (resCode === 1) {
        message.info(resMessage);
      } else {
        message.error(resMessage);
      }
    });
  }

  /**
   * [处理] - 确认添加文章至收藏夹
   * @param collectionId 收藏夹id
   * @param isCollect 该收藏夹是否已经收藏过本文章
   */
  function handleSaveToCollection(
    collectionId: string,
    isCollect: boolean,
  ): void {
    const articleId = props.match.params.id;
    const newIsCollect = !isCollect;

    query({
      method: 'POST',
      url: '/api/collection/article/update/insert_or_remove',
      jsonp: false,
      data: {
        collectionId,
        articleId,
        isCollect: newIsCollect,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;

      if (resCode === 0) {
        const newCollectionList = state.collectionList.map((collection) => {
          if (collection._id === collectionId) {
            return {
              ...collection,
              is_collect: newIsCollect,
            };
          }

          return collection;
        });

        setState({
          ...state,
          collectionList: newCollectionList,
        });
      } else if (resCode === 1) {
        message.info(resMessage);
      } else {
        message.error(resMessage);
      }
    });
  }

  /**
   * [处理] - 收藏夹悬窗的可见状态
   * @param visible 弹出框是否可见
   */
  function handlePopoverChange(
    visible: boolean,
  ) {
    if (visible) {
      _getCollectionListFromServer(1, true);
    }
  }

  /**
   * [处理] - 加载更多收藏夹列表
   * @param page 当前页数
   */
  function handleLoadMoreCollection(
    page: number,
  ) {
    _getCollectionListFromServer(page, false);
  }

  return (
    <CollectionWrapper>
      <CollectionMain>
        <Tooltip title="收藏" placement="right">
          <Popover
            trigger="click"
            placement="right"
            title="我的收藏夹"
            content={_initPopoverContent()}
            onVisibleChange={handlePopoverChange}
          >
            <Icon
              className="fixed-control-bar-collection"
              type="heart"
              theme="filled"
            />
          </Popover>
        </Tooltip>
      </CollectionMain>
    </CollectionWrapper>
  );

});


export default withRouter(DetailsControlCollection);