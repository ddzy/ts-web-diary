import * as React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Icon, Divider, Tag, Popconfirm } from "antd";

import {
  ItemContentBox,
  ContentTip,
  ContentTitle,
  ContentTag,
  ItemExtraBox
} from "./style";
import { formatTime } from "../../../../utils/utils";
import { MERGED_ARTICLE_TAG } from "../../../../constants/constants";
import { IBasicArticleInfo } from "pages/basic.types";

export interface ICollectionShowItemProps {
  isOwner: boolean; // 标识是主人还是访客
  articleInfo: IBasicArticleInfo; // 文章信息

  onDeleteCollectionArticle: (e: React.MouseEvent, articleId: string) => void;
}

const CollectionShowItem: React.SFC<ICollectionShowItemProps> = (
  props: ICollectionShowItemProps
): JSX.Element => {
  /**
   * @description 初始化文章数据
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/14
   */
  function handleInitArticleItem() {
    const articleInfo = props.articleInfo;

    return (
      <Row
        key={articleInfo._id}
        style={{
          marginTop: "10px"
        }}
      >
        <Card hoverable={true}>
          {/* 文章信息 */}
          <Col
            span={18}
            style={{
              paddingLeft: "8px"
            }}
          >
            <ItemContentBox>
              <ContentTip>
                <Icon type="tag-o" style={{ marginRight: "5px" }} />
                {articleInfo.type}
                <Divider type="vertical" />
                <Icon type="like-o" style={{ marginRight: "5px" }} />
                999
                <Divider type="vertical" />
                <Icon type="user" style={{ marginRight: "5px" }} />
                {articleInfo.author.username}
                <Divider type="vertical" />
                <Icon type="clock-circle" style={{ marginRight: "5px" }} />
                {formatTime(articleInfo.create_time)}
              </ContentTip>
              <ContentTitle>
                <Link
                  to={`/details/${articleInfo._id}`}
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "initial"
                  }}
                >
                  {articleInfo.title}
                </Link>
              </ContentTitle>
              <ContentTag>{handleInitItemTag(articleInfo.tag)}</ContentTag>
            </ItemContentBox>
          </Col>
          <Col span={4}>
            <ItemExtraBox>
              <img
                src={articleInfo.cover_img || ""}
                width="80"
                height="80"
                alt=""
              />
            </ItemExtraBox>
          </Col>
          {props.isOwner ? (
            <Col
              span={2}
              style={{
                textAlign: "right"
              }}
              title="删除"
            >
              <Popconfirm
                title="要移除此文章吗?"
                onConfirm={(e: React.MouseEvent<HTMLElement>) =>
                  props.onDeleteCollectionArticle(e, articleInfo._id)
                }
              >
                <Icon type="close" />
              </Popconfirm>
            </Col>
          ) : (
            <React.Fragment />
          )}
        </Card>
      </Row>
    );
  }

  /**
   * @description 初始化列表的标签数据
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/14
   */
  function handleInitItemTag(tag: string): JSX.Element[] {
    return tag.split(",").map(item => {
      return (
        <Tag key={item} color={MERGED_ARTICLE_TAG[item]}>
          {item}
        </Tag>
      );
    });
  }

  // return <React.Fragment></React.Fragment>;

  return (
    <React.Fragment>
      {handleInitArticleItem()}
    </React.Fragment>
  );
};

export default CollectionShowItem;
