import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  message,
  Card,
  Icon,
  Row,
  Col,
  Divider,
  Popconfirm,
  Empty,
} from 'antd';

import {
  ViewWrapper,
  ViewMain,
} from './style';
import { query } from 'services/request';
import {
  IBaseCommonCollectionArticleInfo,
  IBaseCommonCollectionPinInfo,
} from 'pages/user/User.types';


export interface IUserMainContentCollectionViewProps extends RouteComponentProps<{
  id: string,
  type: string,
}> {
  // ? 标识当前是访问者还是主人
  isOwner: boolean;
};
export interface IUserMainContentCollectionViewState {
  // ? 收藏夹列表
  collectionList: IBaseCommonCollectionArticleInfo[] | IBaseCommonCollectionPinInfo[];
};


const UserMainContentCollectionView = React.memo((props: IUserMainContentCollectionViewProps) => {
  const [state, setState] = React.useState<IUserMainContentCollectionViewState>({
    collectionList: [],
  });

  React.useEffect(() => {
    _getCollectionListFromServer();
  }, [props.location.pathname]);


  /**
   * @description 从后台根据获取收藏夹列表
   * @summary 两种类型(pin: 沸点; article: 文章)
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/14
   */
  function _getCollectionListFromServer() {
    const ownerId = props.match.params.id;
    const collectionType = props.match.params.type;

    query({
      method: 'GET',
      url: '/api/user/info/partial/collection/list_by_type',
      jsonp: false,
      data: {
        ownerId,
        collectionType,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;
      const resData = res.data;

      if (resCode === 0) {
        const collectionList = resData.collectionList;

        setState({
          ...state,
          collectionList,
        });
      } else if (resCode === 1) {
        message.info(resMessage);
      } else {
        message.error(resMessage);
      }
    });
  }

  /**
   * @description 初始化用户的收藏夹列表
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/14
   */
  function _initCollectionList() {
    const collectionType = props.match.params.type;

    if (collectionType === 'article') {
      const collectionList = state.collectionList as IBaseCommonCollectionArticleInfo[];

      return collectionList.length !== 0
        ? collectionList.map((v) => {
        return (
          <Col key={v._id} span={8}>
            <Card
              hoverable
              style={{
                width: 200,
                marginTop: 20,
              }}
              cover={
                <div
                  style={{
                    height: 110,
                    backgroundImage: `url(${v.cover_img})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              }
              actions={[
                <Icon type="home" key="home" onClick={() => { handleCollectionArticleHomeBtnClick(v._id) }} />,
                props.isOwner
                  ? (
                    <Popconfirm
                      title="确认要删除该收藏夹吗?"
                      onConfirm={() => { handleCollectionArticleDeleteBtnClick(v._id) }}
                    >
                      <Icon type="close-circle" key="close" />
                    </Popconfirm>
                  )
                  : (
                    <Popconfirm
                      title="要关注该收藏夹吗?"
                    >
                      <Icon type="plus-circle" key="plus" />
                    </Popconfirm>
                  ),
              ]}
            >
              <Card.Meta
                title={v.name}
                description={
                  <div>
                    <span>
                      {v.articles.length} 篇文章
                    </span>
                    <Divider
                      type="vertical"
                      style={{
                        width: 3,
                        height: 3,
                        borderRadius: '50%',
                      }}
                    />
                    <span>
                      {v.followers.length}  人关注
                    </span>
                  </div>
                }
              />
            </Card>
          </Col>
        );
          })
        : (
          <Empty
            description="暂时没有收藏夹..."
          />
        )
    } else if (collectionType === 'pin') {
      const collectionList = state.collectionList as IBaseCommonCollectionPinInfo[];

      return collectionList.length !== 0
        ? collectionList.map((v) => {
            return (
              <React.Fragment key={v._id} />
            );
          })
        : (
          <Empty
            description="暂时没有收藏夹..."
          />
        )
    }

    return null;
  }

  /**
   * @description 处理点击文章收藏夹的去往主页按钮
   * @summary 跳转至收藏夹详情页
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/13
   */
  function handleCollectionArticleHomeBtnClick(collectionId: string) {
    props.history.push({
      pathname: `/collection/${collectionId}`,
      state: {
        isOwner: props.isOwner,
      },
    });
  }

  /**
   * @description 处理删除收藏夹
   * @summary 访客不具有删除权限, 加以区分
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/14
   */
  function handleCollectionArticleDeleteBtnClick(collectionId: string) {
    const ownerId = props.match.params.id;

    query({
      method: 'POST',
      jsonp: false,
      url: '/api/collection/article/delete/self',
      data: {
        ownerId,
        collectionId,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;

      if (resCode === 0) {
        const newCollectionList = state.collectionList.filter((v) => {
          return v._id !== collectionId;
        });

        setState({
          ...state,
          collectionList: newCollectionList,
        });

        message.success(resMessage);
      } else {
        message.error(resMessage);
      }
    });
  }

  return (
    <ViewWrapper>
      <ViewMain>
        <Row>
          {_initCollectionList()}
        </Row>
      </ViewMain>
    </ViewWrapper>
  );
});


export default withRouter(UserMainContentCollectionView);