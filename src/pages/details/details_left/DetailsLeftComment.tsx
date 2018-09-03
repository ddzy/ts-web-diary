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
  ) => void;
  onCommentInputChange: (
    changedFields: any,
  ) => void;
};
interface IDetailLeftCommentState { };


/**
 * 评论区域
 */
class DetailsLeftComment extends React.PureComponent<
  IDetailsLeftCommentProps,
  IDetailLeftCommentState
  > {


  public readonly state = {}


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
            />
            <Divider />
          </React.Fragment>
        );
      })
    : []; 
  }


  public render(): JSX.Element {
    const { getFieldDecorator } = this.props.form;

    return (
      <LeftCommentContainer>
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
                          rows={4}
                          placeholder="请输入评论内容..."
                        />
                      )}
                    </Form.Item>
                  </Form>

                </InputTopText>
              </Col>
            </Row>
          </InputTop>
          <InputBottom>
            <Row>
              <Col>
                <Button
                  htmlType="button"
                  type="primary"
                  style={{ 
                    float: 'right', 
                    width: '15%',
                    marginTop: '10px',
                  }}
                  onClick={this.props.onSendComment}
                >发表</Button>
              </Col>
            </Row>
          </InputBottom>
        </CommentInputBox>
        
        {/* 展示栏 */}
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