import * as React from 'react';
import {
  Button,
} from 'antd';

import {
  ShowLoadMoreBox,
  ShowLoadMoreText,
  ItemContainer,
  CommentContainer,
  ReplyContainer,
  ReplyList,
  ReplyListItem,
} from './style';
import {
  BaseCommentItem,
} from 'components/widget/base_comment_item/BaseCommentItem';
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';
import {
  ICommonBaseArticleCommentInfo,
  ICommonBaseSendReplyParams,
} from 'pages/details/Details.types';


export interface IDetailsMainCommentShowItemProps {
  // ? 当前登录用户的头像
  currentMainUserAvatar: string;
  // ? 单条评论的详细信息
  singleCommentInfo: ICommonBaseArticleCommentInfo;

  onSendReply: (
    inputEl: HTMLElement,
    value: Partial<ICommonBaseSendReplyParams>,
  ) => void;
  onLoadMoreReply: (
    value: {
      lastReplyId: string,
      commentId: string,
    },
    callback?: () => void,
  ) => void;
};
interface IDetailsMainCommentShowItemState {
  // ? 更多回复按钮的内容
  loadMoreText: string;
};


const DetailsMainCommentsShowItem = React.memo<IDetailsMainCommentShowItemProps>((
  props: IDetailsMainCommentShowItemProps,
): JSX.Element => {

  const [state, setState] = React.useState<IDetailsMainCommentShowItemState>({
    loadMoreText: '加载更多',
  });

  /**
   * [初始化] - 回复列表
   */
  function _initReplyList(): JSX.Element[] {
    const replys = props.singleCommentInfo.replys;
    const replysLength = replys.length;

    if (Array.isArray(replys) && replysLength !== 0) {
      return replys.map((reply) => {
        return (
          <CSSTransition
            key={reply._id}
            classNames="fadeTranslateZ"
            timeout={2000}
          >
            <ReplyListItem>
              <BaseCommentItem
                isAllowAvatarHover={true}
                baseInputContainerStyle={{
                  backgroundColor: '#fff',
                }}
                currentMainUserAvatar={props.currentMainUserAvatar}
                isReply={true}
                commentInfo={{
                  _id: reply._id,
                  fromUserInfo: {
                    _id: reply.from._id,
                    username: reply.from.username,
                    useravatar: reply.from.useravatar,
                  },
                  toUserInfo: {
                    _id: reply.to._id,
                    username: reply.to.username,
                    useravatar: reply.to.useravatar,
                  },
                  createTime: reply.create_time,
                  plainContent: reply.content_plain,
                  imageContent: reply.content_image,
                }}
                onSend={handleSendReply}
              />
            </ReplyListItem>
          </CSSTransition>
        );
      });
    }
    return [];
  }

  /**
   * [初始化] - 回复的加载更多按钮
   */
  function _initReplyLoadMoreButton(): JSX.Element {
    const replys = props.singleCommentInfo.replys;

    const loadMoreButton = replys.length !== 0
      ? (
        <ShowLoadMoreBox>
          <ShowLoadMoreText>
            <Button
              type="link"
              onClick={handleLoadMoreReply}
            >
              {state.loadMoreText}
            </Button>
          </ShowLoadMoreText>
        </ShowLoadMoreBox>
      )
      : <React.Fragment />;

    return loadMoreButton;
  }

  /**
   * [处理] - 提交回复
   */
  function handleSendReply(
    el: HTMLElement,
    value: Partial<ICommonBaseSendReplyParams>,
  ): void {
    props.onSendReply(el, {
      ...value,
      commentId: props.singleCommentInfo._id,
    });
  }

  /**
   * [处理] - 回复加载更多
   */
  function handleLoadMoreReply(): void {
    const replys = props.singleCommentInfo.replys;
    const lastReplyId = replys[replys.length - 1]._id;
    const commentId = props.singleCommentInfo._id;

    setState({
      ...state,
      loadMoreText: '加载中',
    });

    props.onLoadMoreReply({
      lastReplyId,
      commentId,
    }, () => {
      setState({
        ...state,
        loadMoreText: '加载更多',
      });
    });
  }

  return (
    <ItemContainer>
      {/* 单个评论项 评论展示 */}
      <CommentContainer>
        <BaseCommentItem
          isAllowAvatarHover={true}
          baseInputStyle={{
            backgroundColor: '#fff',
          }}
          isReply={false}
          commentInfo={{
            _id: props.singleCommentInfo._id,
            fromUserInfo: {
              _id: props.singleCommentInfo.from._id,
              username: props.singleCommentInfo.from.username,
              useravatar: props.singleCommentInfo.from.useravatar,
            },
            plainContent: props.singleCommentInfo.content_plain,
            imageContent: props.singleCommentInfo.content_image,
            createTime: props.singleCommentInfo.create_time,
          }}
          onSend={handleSendReply}
          currentMainUserAvatar={props.currentMainUserAvatar}
        />
      </CommentContainer>

      {/* 单个评论项 回复展示 */}
      <ReplyContainer>
        <ReplyList>
          <TransitionGroup>
            {_initReplyList()}
          </TransitionGroup>

          {_initReplyLoadMoreButton()}
        </ReplyList>
      </ReplyContainer>
    </ItemContainer>
  );
});


export default DetailsMainCommentsShowItem;