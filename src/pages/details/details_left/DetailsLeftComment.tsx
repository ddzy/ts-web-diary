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
} from '../style';
import CommentListItem from './CommentListItem';
import { isArray } from 'util';
import { EMOJI_PICKER } from '../../../constants/constants';
import BaseCommentInput from '../../../components/widget/BaseCommentInput/BaseCommentInput';

export interface IDetailsLeftCommentProps {
  useravatar: string;

  comments: any[];

  onSendComment: (
    e: React.MouseEvent,
    inputRef: any,
  ) => void;

  replyInputValue: string | '';
  onReplyInputChange: (
    changedFields: any,
  ) => void;
  onSendReply: (
    e: React.MouseEvent,
    inputRef: any,
    commentid: string,
  ) => void;

  ///// 重构
  onCommentInputChangeNew: (
    e: React.ChangeEvent,
  ) => void;
  commentInputValueNew: string;
  onSendCommentNew: () => void;

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
  public inputRef: any;


  public readonly state = {
    isShowSendBtnBox: false,
    isShowCommentEmojiBox: false,
  }


  public componentDidMount(): void {
    this.handleToggleComment();
  }


  //// 处理切换ReplyBox
  public handleToggleReply = (
    e: React.MouseEvent,
  ) => {
    const oReplys = document
      .querySelectorAll('.comment-reply-box') as NodeListOf<any>;

    const oReplyNode = Array
      .from(oReplys)
      .find((item) => {
        return item.getAttribute('data-id') === e.currentTarget.getAttribute('data-id');
      });

    // 切换    BUG: 加类名×
    e.currentTarget.classList.toggle('comment-reply-icon-active');
    oReplyNode.style.display = oReplyNode.style.display
      === 'none'
      ? 'block'
      : 'none';
  }


  //// 处理切换commentBox
  public handleToggleComment = (): void => {
    document.body.addEventListener('click', (
      e: MouseEvent
    ) => {
      const oTarget = e.target as HTMLElement;
      const hasClass = oTarget.classList.contains('same-show-action-box') as boolean;

      this.setState({ isShowSendBtnBox: hasClass });
    }, false);
  }


  //// 处理切换评论框 emoji显隐
  public handleToggleCommentEmoji = () => {
    this.setState(() => ({
      isShowCommentEmojiBox: true,
      isShowSendBtnBox: true,
    }));
  }


  //// 初始化评论列表
  public initCommentListItem = (): JSX.Element[] | [] => {
    const comments = this.props.comments;

    return isArray(comments)
      && comments.length !== 0
      ? comments.map((item) => {
        return (
          <React.Fragment key={item._id}>
            <CommentListItem
              {...item}
              onToggleReply={this.handleToggleReply}
              onReplyInputChange={this.props.onReplyInputChange}
              onSendReply={this.props.onSendReply}
              replyInputValue={this.props.replyInputValue}
            />
            <Divider />
          </React.Fragment>
        );
      })
      : [];
  }


  //// 获取输入框ref
  public getInputRef = (el: any): void => {
    this.inputRef = el;
  }


  //// 初始化评论表情框内容
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
        <CommentWrapper>
          {/* 提示文字 */}
          <CommentTipBox>
            <TipText>
              评论
          </TipText>
          </CommentTipBox>

          {/* 重构输入框 */}
          <BaseCommentInput
            useravatar={this.props.useravatar}
            onInputChange={this.props.onCommentInputChangeNew}
            inputValue={this.props.commentInputValueNew}
            onSend={this.props.onSendCommentNew}
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



// export default Form.create({
//   onFieldsChange(props: any, changedFields) {
//     props.onCommentInputChange(changedFields);
//   },

//   mapPropsToFields(props) {
//     return {
//       comment_input: Form.createFormField({
//         ...props.commentInputValue,
//         value: props.commentInputValue.value || '',
//       }),
//     };
//   },
// })(DetailsLeftComment);
export default DetailsLeftComment;