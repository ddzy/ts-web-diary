import * as React from 'react';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Popconfirm,
  notification,
  Tooltip,
  Popover,
  Icon,
  Empty,
  message,
  Divider,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router';

import {
  CollectionPopContentContainer,
  CollectionPopFormBox,
  CollectionsPopShowList,
  CollectionsPopShowListItem,
} from './style';
import { query } from 'services/request';
import { IBaseCommonCollectionArticleInfo } from 'pages/details/Details.types';
import { PAGE_SIZE } from 'constants/constants';


export interface IDetailsControlCollectionProps extends FormComponentProps, RouteComponentProps<{
  id: string,
}> {
};
interface IDetailsControlCollectionState {
  // ? 收藏夹列表
  collectionList: IBaseCommonCollectionArticleInfo[];
};


const DetailsControlCollection = React.memo<IDetailsControlCollectionProps>((
  props: IDetailsControlCollectionProps,
): JSX.Element => {

  const [state, setState] = React.useState<IDetailsControlCollectionState>({
    collectionList: [],
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
    const {
      getFieldDecorator,
    } = props.form;
    const {
      collectionList,
    } = state;

    return (
      <CollectionPopContentContainer>
        <CollectionsPopShowList>
          {
            collectionList.length !== 0
              ? collectionList.map((item: IBaseCommonCollectionArticleInfo) => {
                return (
                  <Popconfirm
                    key={item._id}
                    title={
                      item.is_collect ? '要从当前收藏夹移除本文章吗?' : '要添加文章到该收藏夹吗?'
                    }
                    onConfirm={() => handleSaveToCollection(item._id, item.is_collect)}
                  >
                    <CollectionsPopShowListItem>
                      {item.name}
                      {
                        item.is_collect && (
                          <React.Fragment>
                            <Divider type="vertical" />
                            <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                          </React.Fragment>
                        )
                      }
                    </CollectionsPopShowListItem>
                  </Popconfirm>
                );
              })
              : <Empty description="没有更多数据..." />
          }
        </CollectionsPopShowList>
        <CollectionPopFormBox>
          <Form
            onSubmit={handleCreateCollection}
          >
            <Form.Item>
              {getFieldDecorator('collection_input', {})(
                <Row>
                  <Col span={20}>
                    <Input
                      type="text"
                      size="small"
                      placeholder="新建一个收藏夹..."
                    />
                  </Col>
                  <Col span={4}>
                    <Button
                      htmlType="submit"
                      type="default"
                      size="small"
                    >创建</Button>
                  </Col>
                </Row>
              )}
            </Form.Item>
          </Form>
        </CollectionPopFormBox>
      </CollectionPopContentContainer>
    );
  }

  /**
   * [处理] - 创建新的收藏夹
   * @param e mouseEvent
   */
  function handleCreateCollection(
    e: React.FormEvent,
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

    e.preventDefault();

    props.form.validateFields((err, values) => {
      const {
        collection_input
      } = values;

      if (!collection_input) {
        message.error('收藏夹名称不能为空!');

        return;
      }

      query({
        jsonp: false,
        url: '/api/collection/article/create',
        method: 'POST',
        data: {
          userId,
          collectionName: collection_input,
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

  return (
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
  );

});


export default withRouter((Form.create() as any)(DetailsControlCollection));