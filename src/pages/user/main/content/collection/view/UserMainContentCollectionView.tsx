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
   * [获取] - 后台获取不同类型的收藏夹列表
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
   * [初始化] - 用户的收藏夹列表
   */
  function _initCollectionList() {
    const collectionType = props.match.params.type;

    if (collectionType === 'article') {
      const collectionList = state.collectionList as IBaseCommonCollectionArticleInfo[];

      return collectionList.map((v) => {
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
                  ? (<Icon type="close-circle" key="close" />)
                  : (<Icon type="plus-circle" key="plus" />),
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
      });
    } else if (collectionType === 'pin') {
      const collectionList = state.collectionList as IBaseCommonCollectionPinInfo[];

      return collectionList.map((v) => {
        return (
          <React.Fragment key={v._id} />
        );
      });
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