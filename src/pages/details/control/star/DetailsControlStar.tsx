import * as React from 'react';
import {
  Tooltip,
  Icon,
  notification,
  message,
} from 'antd';
import {
  withRouter,
  RouteComponentProps,
  match,
} from 'react-router-dom';

import {
  ICommonBaseArticleInfo,
} from '../../Details.types';
import { query } from 'services/request';
import {
  NOTIFICATION_TYPE, ACTIVITY_TYPE,
} from 'constants/constants';
import { notificationUserStarArticleIOClient } from 'services/websocket';


export interface IDetailsControlStarProps extends RouteComponentProps {
  match: match<{
    id: string,
  }>;

  // ? 文章信息
  articleInfo: ICommonBaseArticleInfo & {
    // * 文章的获赞总数
    stared_total: number,
    // * 文章的点赞用户列表
    stared_user: string[],
  };
};
export interface IDetailsControlStarState {
  // ? 用户点赞文章通知相关socket
  notificationUserStarArticleIOClient: SocketIOClient.Socket;

  // ? 是否点赞
  isStar: boolean;
};


const DetailsControlStar = React.memo<IDetailsControlStarProps>((
  props: IDetailsControlStarProps,
): JSX.Element => {

  const [state, setState] = React.useState<IDetailsControlStarState>({
    notificationUserStarArticleIOClient,
    isStar: false,
  });

  /**
   * [处理] - 页面首次加载完成后的点赞状态
   */
  React.useEffect(() => {
    // 首次加载, 获取文章的点赞状态
    const staredUserList = props.articleInfo.stared_user;
    const userId = localStorage.getItem('userid');

    if (!userId || typeof userId !== 'string') {
      notification.error({
        message: '错误',
        description: '用户凭证已过期, 请重新登录!',
      });

      return props.history.push('/login');
    }

    const isStar = staredUserList.indexOf(userId) !== -1;

    setState({
      ...state,
      isStar,
    });
  }, [props.articleInfo]);


  /**
   * [处理] - 文章点赞
   */
  function handleStar(
    e: React.MouseEvent,
  ): void {
    const userId = localStorage.getItem('userid');

    if (!userId || typeof userId !== 'string') {
      notification.error({
        message: '错误',
        description: '凭证已过期, 请重新登录!',
      });

      return props.history.push('/login');
    }

    const articleId = props.match.params.id;
    const newIsStar = !state.isStar;

    setState({
      ...state,
      isStar: newIsStar,
    });

    const activityType = ACTIVITY_TYPE.star.article.self;

    query({
      method: 'POST',
      jsonp: false,
      url: '/api/action/star/article',
      data: {
        userId,
        articleId,
        activityType,
        isStar: newIsStar,
      },
    }).then((res) => {
      // 点赞文章之后的处理逻辑
      const { code } = res;
      const { starInfo } = res.data;
      const notificationType = NOTIFICATION_TYPE.user.star.article.self;
      const authorId = props.articleInfo.author._id;
      const authorName = props.articleInfo.author.username;
      const isCurrentUserArticle = authorId === starInfo.userId;

      if (code === 0) {
        if (starInfo.isStar) {
          const content = (
            <span>
              你赞了
                <b
                style={{
                  color: '#1da57a',
                }}
              >
                {
                  isCurrentUserArticle ? '自己' : authorName
                }
              </b>
              的文章!
          </span>
          );

          // 点赞文章之后, 实时通知文章作者
          state.notificationUserStarArticleIOClient.emit('sendUserStarArticle', {
            notificationType,
            userId,
            authorId,
            articleId,
          });

          message.info(content);
        } else {
          message.info('你取消了赞!');
        }
      }
    });
  }

  return (
    <Tooltip
      title={state.isStar ? '取消赞' : '赞一个'}
      placement="right"
    >
      <Icon
        type="star"
        twoToneColor="#1da57a"
        theme={state.isStar ? 'twoTone' : 'outlined'}
        onClick={handleStar}
      />
    </Tooltip>
  );
});


export default withRouter(DetailsControlStar);