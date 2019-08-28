import * as React from 'react';
import ContentEditable from 'react-contenteditable';
import {
  Row,
  Col,
  Button,
  Avatar,
  Icon,
  Popover,
} from 'antd';

import {
  GlobalStyleSet,
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
} from 'constants/constants';


export interface IBaseCommentInputProps {
  useravatar: string;
  avatarSize?: 'small' | 'large' | 'default';
  placeHolder?: string;
  containerStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  onSend: (
    inputEl: HTMLElement,
    plainContent: string,
    imageContent: string[],
  ) => void;
};
interface IBaseCommentInputState {
  inputEl: HTMLElement;
  html: string;
  image: string[];
};


/**
 * 评论|回复输入框 通用组件
 */
const BaseCommentInput = React.memo<IBaseCommentInputProps>((
  props: IBaseCommentInputProps,
): JSX.Element => {
  const [
    state,
    setState,
  ] = React.useState<IBaseCommentInputState>({
    html: '',
    image: [],
    inputEl: document.createElement('div'),
  });

  /**
   * [初始化] - emoji表情
   */
  function _initEmoji(): JSX.Element[] {
    return EMOJI_PICKER.map((emoji: string, i: number) => (
      <EmojiItem
        key={i}
      >{emoji}</EmojiItem>
    ));
  }

  function handleGetRef(el: any): void {
    if (el && el.htmlEl && !state.inputEl) {
      setState({
        ...state,
        html: state.html,
        inputEl: el.htmlEl,
      });
    }
  }

  /**
   * [处理] - 普通文本输入框更新
   * @param e 输入框对象
   */
  function handleChange(
    e: React.ChangeEvent,
  ): void {
    const target = e.currentTarget;
    const html = target.innerHTML as string;

    setState({
      ...state,
      html,
      inputEl: state.inputEl,
    });
  }

  function handleReplyEmojiChange(
    e: React.MouseEvent,
  ): void {
    const target = e.currentTarget as HTMLElement;
    const tTitle = target.getAttribute('title') as string;
    const emoji = emojify(tTitle, { output: 'unicode' });

    setState({
      ...state,
      html: `${state.html}${emoji}`,
      inputEl: state.inputEl,
    });
  }

  function handleSend(): void {
    props.onSend(
      state.inputEl,
      state.html,
      state.image,
    );
  }

  return (
    <React.Fragment>
      <CommentInputBox>
        <CommentInputMain
          containerStyle={props.containerStyle ? props.containerStyle : {}}
        >
          <InputTop>
            <Row>
              <Col span={2}>
                <InputTopAvatar>
                  <Avatar
                    src={props.useravatar}
                    shape="circle"
                    icon="user"
                    size={props.avatarSize}
                    alt="useravatar"
                  />
                </InputTopAvatar>
              </Col>
              <Col span={22}>
                <InputTopText>
                  <ContentEditable
                    ref={(el) => {
                      handleGetRef(el)
                    }}
                    style={props.inputStyle ? props.inputStyle : {}}
                    data-placeholder={props.placeHolder}
                    className="yyg-contenteditable"
                    html={state.html}
                    onChange={handleChange}
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
                        onClick={handleReplyEmojiChange}
                      >
                        {_initEmoji()}
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
                  onClick={handleSend}
                >发表</Button>
              </Col>
            </Row>
          </InputBottom>
        </CommentInputMain>
      </CommentInputBox>
      <GlobalStyleSet />
    </React.Fragment>
  );
});


export default BaseCommentInput;