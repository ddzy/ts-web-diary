import * as React from 'react';
import {
  // Form,
  Divider,
} from 'antd';

import {
  LeftCommentContainer,
  CommentWrapper,
  CommentShowBox,
  CommentShowList,
  CommentTipBox,
  TipText,
  EmojiItem,
} from './style';
// import CommentListItem from './CommentListItem';
import { isArray } from 'util';
import { EMOJI_PICKER } from '../../../../constants/constants';
import BaseCommentInput from '../../../../components/widget/BaseCommentInput/BaseCommentInput';
import CommentListItem from './details_main_comment_list_item/CommentListItem';

export interface IDetailsLeftCommentProps {
  useravatar: string;

  comments: any[];

  commentInputValue: string;
  onCommentInputChange: (
    e: React.ChangeEvent,
  ) => void;
  onSendComment: () => void;
  onCommentEmojiChange: (
    e: React.MouseEvent,
  ) => void;
};
interface IDetailLeftCommentState {
  // 控制提交评论区域显隐
  isShowSendBtnBox: boolean;
  // 控制评论框emoji框显隐
  isShowCommentEmojiBox: boolean;
};


/**
 * 评论区域
 */
class DetailsLeftComment extends React.PureComponent<
  IDetailsLeftCommentProps,
  IDetailLeftCommentState
  > {

  public readonly state = {
    isShowSendBtnBox: false,
    isShowCommentEmojiBox: false,
  }

  public componentDidMount(): void {
    this.handleToggleComment();
  }

  /**
   * 处理切换commentBox
   */
  public handleToggleComment = (): void => {
    document.body.addEventListener('click', (
      e: MouseEvent
    ) => {
      const oTarget = e.target as HTMLElement;
      const hasClass = oTarget.classList.contains('same-show-action-box') as boolean;

      this.setState({ isShowSendBtnBox: hasClass });
    }, false);
  }

  /**
   * 处理切换评论框 emoji显隐
   */
  public handleToggleCommentEmoji = () => {
    this.setState(() => ({
      isShowCommentEmojiBox: true,
      isShowSendBtnBox: true,
    }));
  }

  /**
   * 初始化评论列表
   */
  public initCommentListItem = (): JSX.Element[] | [] => {
    const comments = this.props.comments;

    return isArray(comments)
      && comments.length !== 0
      ? comments.map((item) => {
        return (
          <React.Fragment key={item._id}>
            <CommentListItem
              isReply={false}
              {...item}
            />
            <Divider />
          </React.Fragment>
        );
      })
      : [];
  }

  /**
   * 初始化评论表情框内容
   */
  public initCommentEmoji = () => {
    return EMOJI_PICKER.map((emoji: string, i: number) => {
      return (
        <EmojiItem
          key={i}
        >{emoji}</EmojiItem>
      );
    });
  }

  public render(): JSX.Element {
    return (
      <LeftCommentContainer
        id="left-comment-container"
      >
        <CommentWrapper id="comment-wrapper">
          {/* 提示文字 */}
          <CommentTipBox>
            <TipText>
              评论
            </TipText>
          </CommentTipBox>

          {/* 重构输入框 */}
          <BaseCommentInput
            useravatar={this.props.useravatar}
            onInputChange={this.props.onCommentInputChange}
            inputValue={this.props.commentInputValue}
            onSend={this.props.onSendComment}
            onEmojiChange={this.props.onCommentEmojiChange}
          />
        </CommentWrapper>

        {/* 根评论展示栏 */}
        <CommentShowBox>
          <CommentShowList>
            {this.initCommentListItem()}
          </CommentShowList>
        </CommentShowBox>
      </LeftCommentContainer>
    );
  }

}

export default DetailsLeftComment;