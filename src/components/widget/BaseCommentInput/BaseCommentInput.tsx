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
  CommentInputMain,
  InputTop,
  InputBottom,
  InputTopAvatar,
  InputTopText,
  EmojiWrapper,
  EmojiItem,
} from './style';
import { Emojify, emojify } from 'react-emojione';
import {
  EMOJI_PICKER,
} from '../../../constants/constants';
import ContentEditable from 'react-contenteditable';


export interface IBaseCommentInputProps {
  useravatar: string;
  avatarSize?: 'small' | 'large' | 'default';
  placeHolder?: string;
  containerStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  onSend: (v: string) => void;
};
interface IBaseCommentInputState {
  html: string;
};


/**
 * 评论|回复输入框 通用组件
 */
class BaseCommentInput extends React.PureComponent<
  IBaseCommentInputProps,
  IBaseCommentInputState
  >{

  public readonly state = {
    html: '',
  };

  /**
   * 初始化表情
   */
  public initEmoji = (): JSX.Element[] => {
    return EMOJI_PICKER.map((emoji: string, i: number) => (
      <EmojiItem
        key={i}
      >{emoji}</EmojiItem>
    ));
  }

  public handleChange: React.ChangeEventHandler = (
    e: React.ChangeEvent,
  ): void => {
    const target = e.currentTarget;
    const html = target.innerHTML as string;

    this.setState({
      html,
    });
  }

  public handleReplyEmojiChange = (
    e: React.MouseEvent,
  ): void => {
    const target = e.currentTarget as HTMLElement;
    const tTitle = target.getAttribute('title') as string;
    const emoji = emojify(tTitle, { output: 'unicode' });

    this.setState((prevState) => ({
      html: `${prevState.html}${emoji}`,
    }));
  }

  public handleSend: React.MouseEventHandler<HTMLElement> = (): void => {
    this.props.onSend(this.state.html);
  }

  public render(): JSX.Element {
    return (
      <CommentInputBox>
        <CommentInputMain
          containerStyle={this.props.containerStyle ? this.props.containerStyle : {}}
        >
          <InputTop>
            <Row>
              <Col span={2}>
                <InputTopAvatar>
                  <Avatar
                    src={this.props.useravatar}
                    shape="circle"
                    icon="user"
                    size={this.props.avatarSize}
                    alt="useravatar"
                  />
                </InputTopAvatar>
              </Col>
              <Col span={22}>
                <InputTopText>
                  <ContentEditable
                    style={this.props.inputStyle ? this.props.inputStyle : {}}
                    data-placeholder={this.props.placeHolder}
                    className="yyg-contenteditable"
                    html={this.state.html}
                    onChange={this.handleChange}
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
                      onClick={this.handleReplyEmojiChange}
                    >
                      {this.initEmoji()}
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
                onClick={this.handleSend}
              >发表</Button>
            </Col>
          </Row>
        </InputBottom>
        </CommentInputMain>
      </CommentInputBox>
    );
  }
}


export default BaseCommentInput;