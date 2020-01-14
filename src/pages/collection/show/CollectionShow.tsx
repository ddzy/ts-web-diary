import * as React from "react";
import {
  Empty,
} from 'antd';
// import { Link } from "react-router-dom";

import { CollectionShowWrapper, CollectionShowMain } from "./style";
import CollectionShowItem from "./item/CollectionShowItem";
import { ICollectionState } from "../Collection";
import { isArray } from "utils/utils";

export interface ICollectionShowProps {
  collectionInfo: ICollectionState["collectionInfo"];
  isOwner: ICollectionState["isOwner"];

  onDeleteCollectionArticle: (e: React.MouseEvent, articleId: string) => void;
}
export interface ICollectionShowState {}


const CollectionShow = React.memo((props: ICollectionShowProps) => {
  /**
   * @description 初始化文章列表
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/14
   */
  function handleInitArticleList(): any {
    const articles = props.collectionInfo.articles;

    return isArray(articles) && articles.length !== 0 ? (
      articles.map(v => {
        return (
          <CollectionShowItem
            key={v._id}
            isOwner={props.isOwner}
            articleInfo={v}
            onDeleteCollectionArticle={props.onDeleteCollectionArticle}
          />
        );
      })
    ) : (
      // <div
      //   style={{
      //     lineHeight: "66px",
      //     textAlign: "center",
      //     fontWeight: "bold",
      //     fontSize: "18px"
      //   }}
      // >
      //   <h3>该收藏夹没有文章...</h3>
      //   <p>
      //     去<Link to="/article">这里</Link>
      //     发现更多文章!
      //   </p>
      // </div>
        <Empty
          description="该收藏夹下暂时没有文章..."
        />
    );
  }

  return (
    <CollectionShowWrapper>
      <CollectionShowMain>{handleInitArticleList()}</CollectionShowMain>
    </CollectionShowWrapper>
  );
});

export default CollectionShow;
