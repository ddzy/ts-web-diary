import * as React from 'react';
import {
  notification,
} from 'antd';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import {
  LeftCommentContainer,
} from './style';
import DetailsMainCommentTitle from './details_main_comment_title/DetailsMainCommentTitle';
import DetailsMainCommentShow from './details_main_comment_show/DetailsMainCommentShow';
import {
  ISendReplyParams,
  serviceHandleSendReply,
  serviceHandleSendComment,
  IStaticArticleInfoCommentsOptions,
  serviceHandleGetMoreComments,
  serviceHandleGetMoreReplys,
} from '../../Details.service';
import {
  COMMENT_PAGE_SIZE,
  REPLY_PAGE_SIZE,
} from 'src/constants/constants';


export interface IDetailsMainCommentProps extends RouteComponentProps<any> {
  useravatar: string;

  comments: IStaticArticleInfoCommentsOptions[];
};
interface IDetailsMainCommentState {
  comments: IStaticArticleInfoCommentsOptions[];
  commentHasMore: boolean;
  replyHasMore: boolean;
}

/**
 * 评论区域
 */
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
   * 处理评论提交
   */
  function handleSendComment(
    inputEl: HTMLElement,
    value: string,
  ): void {
    const { id } = props.match.params;

    if (value) {
      serviceHandleSendComment({
        value,
        articleId: id || '',
        from: localStorage.getItem('userid') || '',
      }, (data) => {
        const {
          commentInfo
        } = data.info;

          setState({
          ...state,
          comments: [
            commentInfo,
            ...state.comments,
          ]
        });

        notification.success({
          message: '提示',
          description: '评论发表成功',
        });
      });
    } else {
      notification.error({
        message: '错误',
        description: '评论内容不能为空!',
      });
    }
  }

  /**
   * 处理回复提交
   */
  function handleSendReply(
    inputEl: any,
    v: ISendReplyParams,
  ): void {
    const { id } = props.match.params;

    if (v.value) {
      serviceHandleSendReply(
        {
          ...v,
          articleId: id,
        },
        (data) => {
          const {
            replyInfo,
          } = data.info;

          setState({
            ...state,
            comments: state.comments.map((item) => {
              if (
                item._id === replyInfo.comment
              ) {
                return {
                  ...item,
                  replys: [
                    replyInfo,
                    ...item.replys,
                  ],
                };
              }
              return item;
            }),
          });
          notification.success({
            message: '提示',
            description: `回复发表成功`,
          });
        },
      );
    } else {
      notification.error({
        message: '错误',
        description: '回复信息不能为空!',
      });
    }
  }

  /**
   * 处理分页获取评论
   */
  function handleLoadMoreComment(
    v: {
      lastCommentId: string,
    },
  ): void {
    const { id } = props.match.params;

    serviceHandleGetMoreComments(
      { articleId: id, ...v, commentPageSize: COMMENT_PAGE_SIZE, replyPageSize: REPLY_PAGE_SIZE },
      (data) => {
        const {
          hasMore,
          comments,
        } = data.info.commentsInfo;

        setState({
          ...state,
          comments: state.comments.concat(...comments),
          commentHasMore: hasMore,
        });
      },
    );
  }

  /**
   * 处理分页获取回复
   */
  function handleLoadMoreReply(
    v: {
      lastReplyId: string,
      commentId: string,
    },
  ) {
    serviceHandleGetMoreReplys(
      { ...v, replyPageSize: REPLY_PAGE_SIZE, },
      (data) => {
        const {
          hasMore,
          replys,
        } = data.info.replysInfo;

        setState({
          ...state,
          replyHasMore: hasMore,
          comments: state.comments.map((comment) => {
            if (comment._id === v.commentId) {
              return {
                ...comment,
                replys: comment.replys.concat(...replys),
              };
            }
            return comment;
          }),
        });
      },
    );
  }

  return (
    <LeftCommentContainer
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
    </LeftCommentContainer>
  );
});


export default withRouter(DetailsMainComment);