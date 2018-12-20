import * as React from 'react';
import {
  Link,
} from 'react-router-dom';
import {
  Icon,
  List,
} from 'antd';

import {
  PostsWrapper,
} from './style';
import { formatTime } from 'src/utils/utils';


export interface IArticleMainViewPostsProps {
  articles: any[];
};
interface IArticleMainViewPostsState { };


/**
 * 文章展示
 */
class ArticleMainViewPosts extends React.PureComponent<IArticleMainViewPostsProps, IArticleMainViewPostsState> {

  /**
   * 初始化列表数据
   */
  public initListData = () => {
    const articleList = this.props.articles || [];

    return articleList.length
      ? articleList
        .filter((item) => {
          return item && item;
        })
        .map((item) => {
          return {
            id: item._id || item.uniquekey,
            url: item.url,
            title: item.title,
            author_name: item.author_name || item.author.username,
            pic_url: item.thumbnail_pic_s || item.img || '',
            create_time: item.date || formatTime(item.create_time),
            star: item.star || 0,
            watch: item.watch || 0,
          };
        })

      : [];
  }

  /**
   * 初始化信息栏
   */
  public initIconText = (
    data: { type: string, text: string, id?: string, tip: string }
  ) => {

    return (
      <span
        data-type={data.type}
        data-id={data.id}
      >
        <Icon
          type={data.type}
          style={{ marginRight: 8 }}
        />
        <span>{data.text}</span>
      </span>
    );
  }

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <PostsWrapper>
          <List
            itemLayout="vertical"
            size="large"
            grid={{ gutter: 16 }}
            dataSource={this.initListData()}
            renderItem={(item: any) => (
              <List.Item
                key={item.title}
                style={{
                  marginTop: '1.5625rem',
                  padding: '0 3rem',
                  borderBottom: '1px solid #f7f7f7',
                }}
                actions={[
                  this.initIconText({
                    type: 'eye-o',
                    text: '150',
                    tip: '浏览量',
                  }),
                  this.initIconText({
                    type: 'like-o',
                    text: '156',
                    tip: '点赞',
                  }),
                  this.initIconText({
                    type: 'clock-circle-o',
                    text: item.create_time,
                    tip: '发布于',
                  }),
                  this.initIconText({
                    type: 'info-circle',
                    text: item.author_name,
                    tip: '作者',
                  })
                ]}
                extra={
                  <div style={{
                    width: '7.5rem',
                    height: '7.5rem',
                  }}>
                    <img width={120} height={120}
                      alt="extra_logo" src={item.pic_url} />
                  </div>
                }
              >
                <List.Item.Meta
                  title={
                    <Link
                      to={`/details/${item.id}`}
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold'
                      }}
                    >{item.title}</Link>
                  }
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </PostsWrapper>
      </React.Fragment>
    );
  }

}


export default ArticleMainViewPosts;