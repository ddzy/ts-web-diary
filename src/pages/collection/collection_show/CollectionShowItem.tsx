import * as React from 'react';
import { Link } from 'react-router-dom';

import {
  Row,
  Col,
  Card,
  Icon,
  Divider,
  Tag,
  Popconfirm,
} from 'antd';

import {
  ItemContentBox,
  ContentTip,
  ContentTitle,
  ContentTag,
  ItemExtraBox,
} from '../style';
import { 
  formatTime, 
  isArray, 
} from '../../../utils/utils';
import {
  MERGED_ARTICLE_TAG,
} from '../../../constants/constants';



export interface ICollectionShowItemProps {
  articles: any[],

  onDeleteCollectionArticle: (
    e: React.MouseEvent,
    articleId: string,
  ) => void,
};



const CollectionShowItem: React.SFC<
  ICollectionShowItemProps
  > = (
    props: ICollectionShowItemProps,
  ): JSX.Element => {

    /**
     * 初始化列表数据
     */
    function handleInitArticleItem() {
      const articles = props.articles;

      return isArray(articles)
        && articles.length !== 0
        ? articles.map((item) => {
          return (
            <Row 
              key={item._id}
              style={{
                marginTop: '10px',
              }}  
            >
              <Card hoverable={true}>
                {/* 文章信息 */}
                <Col 
                  span={18} 
                  style={{ 
                    paddingLeft: '8px' 
                  }}>
                  <ItemContentBox>
                    <ContentTip>
                      <Icon
                        type="tag-o"
                        style={{ marginLeft: '5px' }}
                      />
                      {item.type}
                      <Divider type="vertical" />
                      {item.star}
                      <Icon
                        type="like-o"
                        style={{ marginLeft: '5px' }}
                      />
                      <Divider type="vertical" />
                      <span>{item.author.username}</span>
                      <Divider type="vertical" />
                      发布于:&nbsp;&nbsp;
                  {formatTime(item.create_time)}

                    </ContentTip>
                    <ContentTitle>
                      <Link
                        to={`/details/${item._id}`}
                        style={{
                          fontWeight: 'bold',
                          fontSize: '20px',
                          color: 'initial'
                        }}
                      >
                        {item.title}
                      </Link>
                    </ContentTitle>
                    <ContentTag>
                      {handleInitItemTag(item.tag)}
                    </ContentTag>
                  </ItemContentBox>
                </Col>
                <Col span={4}>
                  <ItemExtraBox>
                    <img
                      src={item.author.useravatar || ''}
                      width="80"
                      height="80"
                      alt="文章说明"
                    />
                  </ItemExtraBox>
                </Col>

                {/* 删除收藏夹文章 */}
                <Col
                  span={2}
                  style={{
                    textAlign: 'right',
                  }}
                  title="删除"
                >
                  <Popconfirm
                    title="要移除此文章吗?"
                    onConfirm={(e: React.MouseEvent) => props.onDeleteCollectionArticle(
                      e,
                      item._id,
                    )}
                  >
                    <Icon
                      type="close"
                    />
                  </Popconfirm>
                </Col>
              </Card>
            </Row>
          );
        })
        : (
          <div
            style={{
              lineHeight: '66px',
              textAlign: 'center',
              fontWeight: "bold",
              fontSize: '18px',
            }}
          >
            <h3>该收藏夹没有文章...</h3>
            <p>
              去
              <Link to="/article">
                这里
              </Link>
              发现更多文章!
            </p>
          </div>
        );
    }


    /**
     * 初始化列表 标签数据 
     */
    function handleInitItemTag(
      tag: string,
    ): JSX.Element[] {
      return tag
        .split(',')
        .map((item) => {
          return (
            <Tag
              key={item}
              color={MERGED_ARTICLE_TAG[item]}
            >
              {item}
            </Tag>
          );
        });
    }


    return (
      <React.Fragment>
        {handleInitArticleItem()}
      </React.Fragment>
    );

  }


export default CollectionShowItem;