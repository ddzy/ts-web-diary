import * as React from 'react';
import * as IO from 'socket.io-client';
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


const starArticleSocket = IO('ws://localhost:8888/star/article');

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
  // ? 是否点赞
  isStar: boolean;
};


const DetailsControlStar = React.memo<IDetailsControlStarProps>((
  props: IDetailsControlStarProps,
): JSX.Element => {

  const [state, setState] = React.useState<IDetailsControlStarState>({
    isStar: false,
  });

  React.useEffect(() => {
    starArticleSocket.removeAllListeners();

    const authorId = props.articleInfo.author._id;
    const authorName = props.articleInfo.author.username;
    const userId = localStorage.getItem('userid');
    // 判断当前文章的作者是否为当前点赞的用户
    const isCurrentUserArticle = userId === authorId;

    // socket处理点赞之后的逻辑
    starArticleSocket.on('receiveStarArticle', (
      starInfo: {
        data: {
          isStar: boolean,
        },
      },
    ) => {
      const isStar = starInfo.data.isStar;

      if (isStar) {
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

        message.info(content);
      } else {
        message.info('你取消了赞!');
      }
    });
  }, [props.articleInfo]);

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
  }, [props.articleInfo.stared_user]);

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

    setState({
      ...state,
      isStar: !state.isStar,
    });

    const articleId = props.match.params.id;

    starArticleSocket.emit('sendStarArticle', {
      userId,
      articleId,
      isStar: !state.isStar,
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