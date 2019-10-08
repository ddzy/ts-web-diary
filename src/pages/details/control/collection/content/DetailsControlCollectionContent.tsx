import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroller';
import {
  Divider,
  Icon,
  Form,
  Input,
  Button,
  Popconfirm,
  Empty,
  message,
  Row,
  Col,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import {
  ContentWrapper,
  ContentMain,
  ContentMainDisplayBox,
  ContentMainDisplayList,
  ContentMainDisplayItem,
  ContentMainCreateBox,
} from './style';
import { IBaseCommonCollectionArticleInfo } from 'pages/details/Details.types';


export interface IDetailsControlCollectionContentProps extends FormComponentProps {
  // ? 收藏夹列表
  collectionList: IBaseCommonCollectionArticleInfo[];
  // ? 分页相关: 是否还有更多收藏夹
  hasMoreCollection: boolean;

  onSaveToCollection: (
    collectionId: string,
    isCollect: boolean,
  ) => void;
  onCreateCollection: (
    collectionName: string,
  ) => void;
  onLoadMoreCollection: (
    page: number,
  ) => void;
};
export interface IDetailsControlCollectionContentState { };


const DetailsControlCollectionContent = React.memo((props: IDetailsControlCollectionContentProps) => {
  const $scrollWrapper = React.useRef(null);


  /**
   * [初始化] - 收藏夹列表
   */
  function _initCollectionList() {
    const { collectionList } = props;

    return collectionList.length !== 0
      ? collectionList.map((item: IBaseCommonCollectionArticleInfo) => {
        return (
          <Popconfirm
            key={item._id}
            title={
              item.is_collect ? '要从当前收藏夹移除本文章吗?' : '要添加文章到该收藏夹吗?'
            }
            onConfirm={() => props.onSaveToCollection(item._id, item.is_collect)}
          >
            <ContentMainDisplayItem>
              {item.name}
              {
                item.is_collect && (
                  <React.Fragment>
                    <Divider type="vertical" />
                    <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                  </React.Fragment>
                )
              }
            </ContentMainDisplayItem>
          </Popconfirm>
        );
      })
      : (<Empty description="没有更多数据..." />);
  }

  /**
   * [处理] - 创建新的收藏夹
   * @param e mouseEvent
   */
  function handleCreateCollection(
    e: React.FormEvent,
  ): void {
    e.preventDefault();

    props.form.validateFields((err, values) => {
      const {
        collection_input
      } = values;

      if (!collection_input) {
        message.error('收藏夹名称不能为空!');

        return;
      }

      props.onCreateCollection(collection_input);
    });
  }

  return (
    <ContentWrapper>
      <ContentMain>
        {/* 收藏夹列表展示区 */}
        <ContentMainDisplayBox ref={$scrollWrapper} >
          <InfiniteScroll
            useWindow={false}
            pageStart={1}
            initialLoad={false}
            getScrollParent={() => $scrollWrapper.current}
            loadMore={props.onLoadMoreCollection}
            hasMore={props.hasMoreCollection}
          >
            <ContentMainDisplayList>
              {_initCollectionList()}
            </ContentMainDisplayList>
          </InfiniteScroll>
        </ContentMainDisplayBox>

        {/* 新键收藏夹区 */}
        <ContentMainCreateBox>
          <Form onSubmit={handleCreateCollection}>
            <Form.Item>
              {props.form.getFieldDecorator('collection_input', {})(
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
        </ContentMainCreateBox>
      </ContentMain>
    </ContentWrapper>
  );
});


export default Form.create<IDetailsControlCollectionContentProps>()(DetailsControlCollectionContent);