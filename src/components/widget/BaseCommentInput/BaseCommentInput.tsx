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
  EmojiWrapper,
  EmojiItem,
} from './style';
import { Emojify } from 'react-emojione';
import ContentEditable from 'react-contenteditable';
import {
  EMOJI_PICKER,
} from '../../../constants/constants';
import {BaseContentEditable} from '../BaseContentEditable/BaseContentEditable';


export interface IBaseCommentInputProps {
  useravatar: string;

  onInputChange: (e: React.ChangeEvent) => void;
  inputValue: string;
  onSend: () => void;

  onEmojiChange: (e: React.MouseEvent) => void;
};


/**
 * 评论|回复输入框 通用组件
 */
const BaseCommentInput: React.SFC<IBaseCommentInputProps> = ({
  useravatar,
  onInputChange,
  inputValue,
  onSend,
  onEmojiChange,
}): JSX.Element => {

  /**
   * 初始化表情
   */
  const initEmoji = (): JSX.Element[] => {
    return EMOJI_PICKER.map((emoji: string, i: number) => (
      <EmojiItem
        key={i}
      >{emoji}</EmojiItem>
    ));
  }

  return (
    <CommentInputBox>
      <InputTop>
        <Row>
          <Col span={2}>
            <InputTopAvatar>
              <Avatar
                src={useravatar}
                shape="circle"
                icon="user"
                size="large"
                alt="useravatar"
              />
            </InputTopAvatar>
          </Col>
          <Col span={22}>
            <InputTopText>
              <ContentEditable
                className="base-top-text-main"
                tagName="div"
                html={inputValue}
                disabled={false}
                onChange={onInputChange}
              />
              {/* ceshi */}
              <BaseContentEditable
                className="base-top-text-main"
                html={inputValue}
                parentNodeWithAutoFocus="#comment-wrapper"
                onChange={onInputChange}
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
                    onClick={onEmojiChange}
                  >
                    {initEmoji()}
                  </Emojify>
                </EmojiWrapper>
              }
            >
              <div
                style={{
                  width: '50px',
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
              onClick={onSend}
            >发表</Button>
          </Col>
        </Row>
      </InputBottom>
    </CommentInputBox>
  );
}


export default BaseCommentInput;