import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  notification,
  message,
} from 'antd';

import {
  CommentContainer,
} from './style';
import DetailsMainCommentTitle from './title/DetailsMainCommentTitle';
import DetailsMainCommentShow from './show/DetailsMainCommentShow';
import {
  COMMENT_PAGE_SIZE,
  REPLY_PAGE_SIZE,
} from 'constants/constants';
import {
  ICommonBaseArticleCommentInfo,
  ICommonBaseSendReplyParams,
} from '../../Details.types';
import { query } from 'services/request';


export interface IDetailsMainCommentProps extends RouteComponentProps<{
  id: string
}> {
  // ? 当前登录的用户头像
  useravatar: string;

  // ? 当前的评论列表
  comments: ICommonBaseArticleCommentInfo[];
};
interface IDetailsMainCommentState {
  // ? 文章评论列表
  comments: ICommonBaseArticleCommentInfo[];
  // ? 评论分页: 是否还有更多评论
  commentHasMore: boolean;
  // ? 回复分页: 是否还有更多回复
  replyHasMore: boolean;
}


const DetailsMainComment = React.memo<IDetailsMainCommentProps>((
  props: IDetailsMainCommentProps,
): JSX.Element => {

  const [state, setState] = React.useState<IDetailsMainCommentState>({
    comments: [],
    commentHasMore: true,
    replyHasMore: true,
  });

  React.useEffect(() => {
    setState({
      ...state,
      commentHasMore: props.comments.length !== 0,
      comments: props.comments,
    });
  }, [props.comments]);

  /**
   * [处理] - socket评论提交
   * @param inputEl 输入框DOM元素
   * @param value 参数
   */
  function handleSendComment(
    inputEl: HTMLElement,
    value: {
      plainContent: string,
      imageContent: string[],
    },
  ): void {
    const userId = localStorage.getItem('userid');

    if (!userId || typeof userId !== 'string') {
      notification.error({
        message: '错误',
        description: '用户凭证已过期, 请登录后再发表评论!',
      });

      return props.history.push('/login');
    }

    // TODO 过滤评论
    if (value.plainContent === '') {
      message.info('评论不能为空!');

      return;
    }

    const articleId = props.match.params.id;

    query({
      method: 'POST',
      jsonp: false,
      url: '/api/comment/article/create',
      data: {
        userId,
        articleId,
        ...value,
      },
    }).then((res) => {
      const { commentInfo } = res.data;

      setState({
        ...state,
        comments: [commentInfo].concat(state.comments),
      });
    });
  }

  /**
   * [处理] - 回复提交
   */
  function handleSendReply(
    inputEl: any,
    value: Partial<ICommonBaseSendReplyParams>,
  ): void {
    const userId = localStorage.getItem('userid');

    if (!userId || typeof userId !== 'string') {
      notification.error({
        message: '错误',
        description: '用户凭证已过期, 请登录后再发表回复!',
      });

      return props.history.push('/login');
    }

    // TODO 过滤回复
    if (value.plainContent === '') {
      message.info('回复不能为空!');

      return;
    }

    const articleId = props.match.params.id;

    query({
      method: 'POST',
      jsonp: false,
      url: '/api/reply/article/create',
      data: {
        articleId,
        commentId: value.commentId,
        from: userId,
        to: value.to,
        plainContent: value.plainContent,
        imageContent: value.imageContent,
      },
    }).then((res) => {
      const { code } = res;
      const { replyInfo } = res.data;

      if (code === 0) {
        // 更新本地回复列表
        const newComments = state.comments.map((item) => {
          if (item._id === replyInfo.comment) {
            return {
              ...item,
              replys: [
                replyInfo,
                ...item.replys,
              ],
            };
          }
          return item;
        })

        setState({
          ...state,
          comments: newComments,
        });
      }
    });


    // const { id } = props.match.params;

    // if (v.value) {
    //   serviceHandleSendReply(
    //     {
    //       ...v,
    //       articleId: id,
    //     },
    //     (data: any) => {
    //       const {
    //         replyInfo,
    //       } = data.info;

    //       setState({
    //         ...state,
    //         comments: state.comments.map((item: any) => {
    //           if (
    //             item._id === replyInfo.comment
    //           ) {
    //             return {
    //               ...item,
    //               replys: [
    //                 replyInfo,
    //                 ...item.replys,
    //               ],
    //             };
    //           }
    //           return item;
    //         }),
    //       });
    //       notification.success({
    //         message: '提示',
    //         description: `回复发表成功`,
    //       });
    //     },
    //   );
    // } else {
    //   notification.error({
    //     message: '错误',
    //     description: '回复信息不能为空!',
    //   });
    // }
  }

  /**
   * [处理] - 分页获取评论
   * @param value 评论分页的相关信息
   * @param callback 回调处理器
   */
  function handleLoadMoreComment(
    value: {
      lastCommentId: string,
    },
    callback?: () => void,
  ): void {
    const userId = localStorage.getItem('userid');

    if (!userId || typeof userId !== 'string') {
      notification.error({
        message: '错误',
        description: '用户凭证已过期, 请登录后再查看更多评论!',
      });

      return props.history.push('/login');
    }

    const articleId = props.match.params.id;
    const lastCommentId = value.lastCommentId;

    query({
      url: '/api/comment/article/info/list',
      method: 'GET',
      jsonp: false,
      data: {
        userId,
        articleId,
        lastCommentId,
        commentPageSize: COMMENT_PAGE_SIZE,
        replyPageSize: REPLY_PAGE_SIZE,
      },
    }).then((res) => {
      const { code } = res;
      const { commentList } = res.data;

      if (code === 0) {
        setState({
          ...state,
          comments: state.comments.concat(commentList),
          commentHasMore: commentList.length !== 0,
        });
      }

      callback && callback();
    });
  }

  /**
   * [处理] - 分页获取回复
   */
  function handleLoadMoreReply(
    value: {
      lastReplyId: string,
      commentId: string,
    },
    callback?: () => void,
  ) {
    const userId = localStorage.getItem('userid');

    if (!userId || typeof userId !== 'string') {
      notification.error({
        message: '错误',
        description: '用户凭证已过期, 请登录后再查看更多评论!',
      });

      return props.history.push('/login');
    }

    const articleId = props.match.params.id;
    const commentId = value.commentId;
    const lastReplyId = value.lastReplyId;
    const replyPageSize = REPLY_PAGE_SIZE;

    query({
      url: '/api/reply/article/info/list',
      method: 'GET',
      jsonp: false,
      data: {
        userId,
        articleId,
        commentId,
        lastReplyId,
        replyPageSize,
      },
    }).then((res) => {
      const { code } = res;
      const { replyList } = res.data;

      if (code === 0) {
        setState({
          ...state,
          comments: state.comments.map((comment) => {
            if (comment._id === commentId) {
              return {
                ...comment,
                replys: comment.replys.concat(replyList),
              };
            }
            return comment;
          }),
          replyHasMore: replyList.length !== 0,
        });
      }

      callback && callback();
    });
  }

  return (
    <CommentContainer
      id="left-comment-container"
    >
      {/* 根评论输入框 */}
      <DetailsMainCommentTitle
        useravatar={props.useravatar}
        onSendComment={handleSendComment}
      />

      {/* 根评论展示栏 */}
      <DetailsMainCommentShow
        commentHasMore={state.commentHasMore}
        replyHasMore={state.replyHasMore}
        comments={state.comments}
        useravatar={props.useravatar}
        onSendReply={handleSendReply}
        onLoadMoreComment={handleLoadMoreComment}
        onLoadMoreReply={handleLoadMoreReply}
      />
    </CommentContainer>
  );
});


export default withRouter(DetailsMainComment);