import * as React from "react";
import { RouteComponentProps } from "react-router";
import { message } from "antd";

import {
  CollectionContainer,
  CollectionMain,
  MainHeaderWrapper,
  MainHeaderContent,
  MainContentWrapper,
  MainContentTipBox,
  MainContentTipText
} from "./style";
import collection_bg from "../../static/images/bg_img.png";
import CollectionShow from "./show/CollectionShow";

import { query } from "services/request";
import { IBasicCollectionInfo } from "pages/basic.types";

export interface ICollectionProps
  extends RouteComponentProps<{
    id: string;
  }> {}
export interface ICollectionState {
  isOwner: boolean; // 标识是主人还是访客
  collectionInfo: IBasicCollectionInfo; // 收藏夹详细信息
}

/**
 * @description 单个文章收藏夹详情页
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/14
 */
const Collection = React.memo<ICollectionProps>(
  (props: ICollectionProps): JSX.Element => {
    const [state, setState] = React.useState<ICollectionState>({
      isOwner: false,
      collectionInfo: {
        name: "",
        articles: [],
        create_time: Date.now(),
        _id: "",
        author: {
          _id: "",
          username: "",
          userpwd: "",
          usergender: "",
          useravatar: "",
          profile_cover_img: "",
          address: "",
          website: "",
          introduction: "",
          job: "",
          education: "",
          bind_third_party: {
            github: {
              type: 0
            }
          },
          collections: [],
          articles: [],
          attention: {
            users: [],
            topics: []
          },
          followers: [],
          friends: [],
          chat_memory: [],
          notifications: [],
          activities: [],
          tracks: [],
          pins: [],

          create_time: Date.now(),
          update_time: Date.now()
        },
        description: "",
        cover_img: "",
        followers: [],
        watchers: [],
        update_time: Date.now()
      }
    });

    React.useEffect(() => {
      handleGetCollectionInfo();
    }, []);

    /**
     * @description 检查当前是主人还是访客
     * @author ddzy<1766083035@qq.com>
     * @since 2020/1/14
     */
    function handleCheckIsOwner() {
      const queryParams = props.location.state;
      const isOwner = queryParams.isOwner;

      return isOwner;
    }

    /**
     * @description 获取收藏夹详情信息
     * @author ddzy<1766083035@qq.com>
     * @since 2020/1/13
     */
    function handleGetCollectionInfo(): void {
      const { id } = props.match.params;

      query({
        method: "GET",
        jsonp: false,
        url: "/api/collection/article/info/single",
        data: {
          collectionId: id
        }
      }).then(res => {
        const resCode = res.code;
        const resMessage = res.message;
        const resData = res.data;

        if (resCode === 0) {
          const pendingCollectionInfo = resData.collectionInfo;
          const pendingIsOwner = handleCheckIsOwner();

          setState({
            ...state,
            isOwner: pendingIsOwner,
            collectionInfo: pendingCollectionInfo
          });
        } else {
          message.error(resMessage);
        }
      });
    }

    /**
     * @description 删除收藏夹下的指定文章
     * @summary 只有主人才具有删除的权限
     * @author ddzy<1766083035@qq.com>
     * @since 2020/1/14
     */
    function handleDeleteCollectionArticle(
      e: React.MouseEvent,
      articleId: string
    ): void {
      const { id } = props.match.params;

      query({
        method: "POST",
        url: "/api/collection/article/delete/post",
        jsonp: false,
        data: {
          articleId,
          collectionId: id
        }
      }).then(res => {
        const resCode = res.code;
        const resMessage = res.message;

        if (resCode === 0) {
          // TODO: 删除成功, 从当前列表中移除该文章
          const newArticleList = state.collectionInfo.articles.filter(v => {
            return v._id !== articleId;
          });

          setState({
            ...state,
            collectionInfo: {
              ...state.collectionInfo,
              articles: newArticleList
            }
          });

          message.success(resMessage);
        } else {
          message.error(resMessage);
        }
      });
    }

    return (
      <React.Fragment>
        <CollectionContainer>
          <CollectionMain>
            <MainHeaderWrapper>
              <MainHeaderContent bg_img_url={collection_bg} />
            </MainHeaderWrapper>

            <MainContentWrapper>
              {/* 提示区域 */}
              <MainContentTipBox>
                <MainContentTipText>
                  {state.collectionInfo.name}
                </MainContentTipText>
              </MainContentTipBox>

              {/* 内容区域 */}
              <CollectionShow
                isOwner={state.isOwner}
                collectionInfo={state.collectionInfo}
                onDeleteCollectionArticle={handleDeleteCollectionArticle}
              />
            </MainContentWrapper>
          </CollectionMain>
        </CollectionContainer>
      </React.Fragment>
    );
  }
);

export default Collection;
