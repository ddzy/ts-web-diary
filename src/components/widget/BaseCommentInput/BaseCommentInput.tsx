import * as React from 'react';
import {
  Row,
  Col,
  Button,
  Avatar,
  Icon,
  Popover,
} from 'antd';
import {
  CommentInputBox,
  InputTop,
  InputBottom,
  InputTopAvatar,
  InputTopText,
  TopTextMain,
  EmojiWrapper,
  EmojiItem,
} from './style';
import { Emojify } from 'react-emojione';


export interface IBaseCommentInputProps { };


/**
 * 评论|回复输入框 通用组件
 */
const BaseCommentInput: React.SFC<IBaseCommentInputProps> = (): JSX.Element => {

  return (
    <CommentInputBox>
      <InputTop>
        <Row>
          <Col span={2}>
            <InputTopAvatar>
              <Avatar
                src={''}
                shape="circle"
                icon="user"
                size="large"
                alt="useravatar"
              />
            </InputTopAvatar>
          </Col>
          <Col span={22}>
            <InputTopText>
              <TopTextMain
                contentEditable={true}
                spellCheck={false}
                placeholder={'请理性评论...'}
              />
            </InputTopText>
          </Col>
        </Row>
      </InputTop>
      <InputBottom>
        <Row>
          <Col span={12}>
            <Popover
              trigger="click"
              placement="left"
              content={
                <EmojiWrapper>
                  <Emojify
                    style={{
                      width: '20',
                      height: '20px',
                      margin: '4px',
                    }}
                  >
                    <EmojiItem>:smile:</EmojiItem>
                  </Emojify>
                </EmojiWrapper>
              }
            >
              <div
                style={{
                  marginLeft: '16%',
                  cursor: 'pointer',
                }}
              >
                <Icon
                  type="smile"
                  theme="twoTone"
                  style={{
                    fontSize: '18px',
                    display: 'inline-block',
                    verticalAlign: 'middle',
                  }}
                />
                <span style={{
                  color: '#1890ff',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                }}>表情</span>
              </div>
            </Popover>
          </Col>
          <Col span={12}>
            <Button
              className="same-show-action-box"
              htmlType="button"
              type="primary"
              style={{
                float: 'right',
              }}
            >发表</Button>
          </Col>
        </Row>
      </InputBottom>
    </CommentInputBox>
  );
}


export default BaseCommentInput;