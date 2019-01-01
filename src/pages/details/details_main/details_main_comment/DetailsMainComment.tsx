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
import { serviceHandleSendReply, serviceHandleSendComment } from '../../Details.service';


export interface IDetailsMainCommentProps extends RouteComponentProps<any> {
  useravatar: string;

  comments: any[];
};
interface IDetailsMainCommentState {
  comments: any[];
}

/**
 * 评论区域
 */
const DetailsMainComment = React.memo<IDetailsMainCommentProps>((
  props: IDetailsMainCommentProps,
): JSX.Element => {

  const [state, setState] = React.useState<IDetailsMainCommentState>({
    comments: [],
  });

  React.useEffect(() => {
    setState({
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
      // TODO 敏感词过滤
      serviceHandleSendComment({
        value,
        articleId: id || '',
        from: localStorage.getItem('userid') || '',
      }, (data) => {
        setState({
          comments: [
            data.comment,
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
    v: any,
  ): void {
    const { id } = props.match.params;

    if (v.value) {
      serviceHandleSendReply(
        {
          ...v,
          articleId: id,
        },
        (data) => {
          setState({
            comments: state.comments.map((item) => {
              if (
                item._id === data.reply.comment
              ) {
                return {
                  ...item,
                  replys: [
                    data.reply,
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
        comments={state.comments}
        useravatar={props.useravatar}
        onSendReply={handleSendReply}
      />
    </LeftCommentContainer>
  );
});


export default withRouter(DetailsMainComment);