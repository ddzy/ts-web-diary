import * as React from 'react';
import { Avatar, Divider, Icon, Form ,Input, Button } from 'antd';
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
import { formatTime } from '../../../utils/utils';



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

  onToggleReply: (        // 切换reply显示隐藏
    e: React.MouseEvent,
  ) => void;      
};
interface ICommentListItemState {
  
};


/**
 * 评论列表 单个评论
 */
class CommentlistItem extends React.PureComponent<
  ICommentListItemProps, 
  ICommentListItemState
> {

  public readonly state = {}


  public render(): JSX.Element {
    const { getFieldDecorator } = this.props.form;

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
            <ReplyList>
              <ReplyListItem>
                {/* 回复用户信息框 */}
                <ItemTopBox>
                  <Avatar
                    icon="user"
                    size="default"
                    shape="circle"
                    alt="回复者"
                  />
                  <Divider type="vertical" />
                  <span
                    style={{
                      color: '#999',
                    }}
                  >回复者</span>
                  <Divider type="vertical" />
                  <span
                    style={{
                      color: '#999',
                    }}
                  >10 分钟前</span>
                </ItemTopBox>
                
                {/* 回复内容框 */}
                <ItemMiddleBox>
                  <MiddleCommentText>
                    这是评论的回复测试内容
                  </MiddleCommentText>
                </ItemMiddleBox>
  
              </ReplyListItem>
              <Divider
                style={{
                  margin: '0',
                }}
              />
            </ReplyList>

            {/* 回复输入框 */}
            <ReplyInput>
              <Form>
                <Form.Item>
                  {getFieldDecorator('reply_input', {
                    rules: [{ required: true, message: '评论不能为空!' }],
                  })(
                    <Input 
                      addonAfter={
                        <Button
                          htmlType="button"

                        >回复</Button>
                      }
                    />
                  )}
                </Form.Item>
              </Form>
            </ReplyInput>
          </ItemReplyContent>
        </ItemReplyBox>

      </CommentShowListItem>
    );
  }

}


export default Form.create({
  
})(CommentlistItem) as React.ComponentClass<any>;