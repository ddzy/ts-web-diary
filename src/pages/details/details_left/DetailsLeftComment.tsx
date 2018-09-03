import * as React from 'react';
import {
  Button,
  Avatar,
  Input,
  Row,
  Col,
} from 'antd';

import {
  LeftCommentContainer,
  CommentInputBox,
  InputTop,
  InputTopAvatar,
  InputTopText,
  InputBottom,
  CommentShowBox,
  CommentShowList,
} from '../style';


export interface IDetailsLeftCommentProps { };
interface IDetailLeftCommentState { };


/**
 * 评论
 */
class DetailsLeftComment extends React.PureComponent<
  IDetailsLeftCommentProps,
  IDetailLeftCommentState
  > {


  public readonly state = {}


  public render(): JSX.Element {
    return (
      <LeftCommentContainer>
        {/* 输入框 */}
        <CommentInputBox>
          <InputTop>
            <Row>
              <Col span={2}>
                <InputTopAvatar>
                  <Avatar
                    shape="circle"
                    icon="user"
                    size="large"
                    alt="useravatar"
                  />
                </InputTopAvatar>
              </Col>
              <Col span={22}>
                <InputTopText>
                  <Input.TextArea
                    rows={4}
                    placeholder="发表评论"
                  />
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
                >发表</Button>
              </Col>
            </Row>
          </InputBottom>
        </CommentInputBox>
        
        {/* 展示栏 */}
        <CommentShowBox>
          <CommentShowList>
            
          </CommentShowList>
        </CommentShowBox>
      </LeftCommentContainer>
    );
  }

}



export default DetailsLeftComment;