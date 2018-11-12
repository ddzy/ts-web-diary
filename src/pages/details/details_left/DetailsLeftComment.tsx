import * as React from 'react';
import {
  Button,
  Avatar,
  Input,
  Row,
  Col,
  Form,
  Divider,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';


import {
  LeftCommentContainer,
  CommentInputBox,
  InputTop,
  InputTopAvatar,
  InputTopText,
  InputBottom,
  CommentShowBox,
  CommentShowList,
  CommentTipBox,
  TipText,
} from '../style';
import CommentListItem from './CommentListItem';
import { isArray } from 'util';


export interface IDetailsLeftCommentProps extends FormComponentProps {
  useravatar: string;

  comments: any[];      

  commentInputValue: string | '';   
  onSendComment: (
    e: React.MouseEvent,
    inputRef: any,
  ) => void;
  onCommentInputChange: (
    changedFields: any,
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
};
interface IDetailLeftCommentState {
  // 控制提交评论区域显隐
  isShowSendBtnBox: boolean;
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


  //// 初始化评论列表
  public initCommentListItem = (

  ): JSX.Element[] | []=> {
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


  public render(): JSX.Element {
    const { getFieldDecorator } = this.props.form;

    return (
      <LeftCommentContainer
        id="left-comment-container"
      >
        {/* 提示文字 */}
        <CommentTipBox>
          <TipText>
            评论
          </TipText>
        </CommentTipBox>

        {/* 输入框 */}
        <CommentInputBox>
          <InputTop>
            <Row>
              <Col span={2}>
                <InputTopAvatar>
                  <Avatar
                    src={this.props.useravatar}
                    shape="circle"
                    icon="user"
                    size="large"
                    alt="useravatar"
                  />
                </InputTopAvatar>
              </Col>
              <Col span={22}>
                <InputTopText>
                  <Form>
                    <Form.Item>
                      {getFieldDecorator('comment_input', {
                        rules: [{ required: true, message: '请填写评论!' }], 
                      })(
                        <Input.TextArea
                          placeholder="请理性评论..."
                          className="same-show-action-box"
                          ref={(el) => this.getInputRef(el)}
                          autosize={{ minRows: 1 }}
                        />
                      )}
                    </Form.Item>
                  </Form>

                </InputTopText>
              </Col>
            </Row>
          </InputTop>
          <InputBottom isShowSendBtnBox={this.state.isShowSendBtnBox}>
            <Row>
              <Col span={12}>
                表情框        
              </Col>
              <Col span={12}>
                <Button
                  className="same-show-action-box"
                  htmlType="button"
                  type="primary"
                  style={{ 
                    float: 'right',
                  }}
                  onClick={(e: React.MouseEvent) => this.props.onSendComment(
                    e,
                    this.inputRef,
                  )}
                >发表</Button>
              </Col>
            </Row>
          </InputBottom>
        </CommentInputBox>
        
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



export default Form.create({
  onFieldsChange(props: any, changedFields) {
    props.onCommentInputChange(changedFields);
  },

  mapPropsToFields(props) {
    return {
      comment_input: Form.createFormField({
        ...props.commentInputValue,
        value: props.commentInputValue.value || '',
      }),
    };
  },
})(DetailsLeftComment);