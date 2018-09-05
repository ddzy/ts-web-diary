import * as React from 'react';
import {
  Avatar,
  Divider,
  Icon,
  Form,
  Input,
  Button,
  Row,
  Col,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import {
  CommentShowListItem,
  ItemTopBox,
  ItemMiddleBox,
  MiddleCommentText,
  ItemBottomBox,
  ItemReplyBox,
  ItemReplyContent,
  ReplyList,
  ReplyListItem,
  ReplyInput,
} from '../style';
import { formatTime, isArray } from '../../../utils/utils';



export interface ICommentListItemProps extends FormComponentProps {
  _id: string;            // 评论id
  whom: {                 // 评论人信息
    _id: string,
    username: string,
    useravatar: string,
  };
  article: string;        // 当前文章id
  commentValue: string;   // 评论内容
  create_time: number;    // 评论时间

  replys: any[];          // 回复信息列表


  onToggleReply: (        // 切换reply框显示隐藏
    e: React.MouseEvent,
  ) => void;


  replyInputValue: string | '';     // 回复值
  onReplyInputChange: (   // 处理回复输入框
    changedFields: any,
  ) => void;
  onSendReply: (          // 处理回复提交      
    e: React.MouseEvent,
    inputRef: any,
    commentid: string,
  ) => void;
};
interface ICommentListItemState { };


/**
 * 评论列表 单个评论
 */
class CommentlistItem extends React.PureComponent<
  ICommentListItemProps,
  ICommentListItemState
  > {

  public inputRef = null


  public readonly state = {}


  //// 获取ref
  public handleSetInputRef = (el: any): void => {
    this.inputRef = el;
  }


  //// 初始化回复列表
  public handleInitReplysList = (): JSX.Element[] => {
    const { replys } = this.props;

    return isArray(replys) 
      && replys.length !== 0
      ? replys.map((item) => (
          <React.Fragment
            key={item._id}
          >
            <ReplyListItem>
              {/* 回复用户信息框 */}
              <ItemTopBox>
                <Avatar
                  icon="user"
                  size="small"
                  shape="circle"
                  alt="回复者"
                  src={item.whom.useravatar}
                />
                <Divider type="vertical" />
                <span
                  style={{
                    color: '#999',
                  }}
                >{item.whom.username}</span>
                <Divider type="vertical" />
                <span
                  style={{
                    color: '#999',
                  }}
                >{formatTime(item.create_time)}</span>
              </ItemTopBox>

              {/* 回复内容框 */}
              <ItemMiddleBox>
                <MiddleCommentText>
                  {item.replyValue}
                      </MiddleCommentText>
              </ItemMiddleBox>

            </ReplyListItem>
            <Divider
              style={{
                margin: '0',
              }}
            />
          </React.Fragment>
        ))
      : []
  }


  public render(): JSX.Element {
    const { getFieldDecorator } = this.props.form;

    console.log(this.props.replys);

    return (
      <CommentShowListItem>

        {/* 评论用户信息框 */}
        <ItemTopBox>
          <Avatar
            src={this.props.whom.useravatar}
            icon="user"
            size="default"
            shape="circle"
            alt="评论者"
          />
          <Divider type="vertical" />
          <span
            style={{
              color: '#999',
            }}
          >{this.props.whom.username}</span>
        </ItemTopBox>

        {/* 评论内容框 */}
        <ItemMiddleBox>
          <MiddleCommentText>
            {this.props.commentValue}
          </MiddleCommentText>
        </ItemMiddleBox>

        {/* 评论控制栏 */}
        <ItemBottomBox>
          <Icon type="like-o" />
          <Divider type="vertical" />

          <Icon
            data-id={this.props._id}
            type="message"
            onClick={this.props.onToggleReply}
          />
          <Divider type="vertical" />

          <span>{formatTime(this.props.create_time)}</span>
        </ItemBottomBox>

        {/* 回复框 */}
        <ItemReplyBox
          className="comment-reply-box"
          data-id={this.props._id}
          style={{
            display: 'none',
          }}
        >
          <ItemReplyContent>
            {/* 回复展示框 */}
            <ReplyList>
              {this.handleInitReplysList()}
            </ReplyList>

            {/* 回复输入框 */}
            <ReplyInput>
              <Form>
                <Row>
                  <Col span={20}>
                    <Form.Item>
                      {getFieldDecorator('reply_input', {
                        rules: [{ required: true, message: '评论不能为空!' }],
                      })(
                        <Input
                          placeholder="在这里回复..."
                          ref={(el: any) => this.handleSetInputRef(el)}
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item>
                      <Button
                        htmlType="button"
                        type="primary"
                        onClick={(
                          e: React.MouseEvent
                        ) => this.props.onSendReply(
                          e,
                          this.inputRef,
                          this.props._id,
                        )}
                      >回复</Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </ReplyInput>
          </ItemReplyContent>
        </ItemReplyBox>

      </CommentShowListItem>
    );
  }

}


export default Form.create({
  onFieldsChange(props: any, changedFields) {
    props.onReplyInputChange(changedFields);
  },

  mapPropsToFields(props) {
    return {
      reply_input: Form.createFormField({
        ...props.replyInputValue,
        value: props.replyInputValue.value || '',
      }),
    };
  },
})(CommentlistItem) as React.ComponentClass<any>;