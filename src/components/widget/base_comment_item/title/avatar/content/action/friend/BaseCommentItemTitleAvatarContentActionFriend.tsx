import * as React from 'react';
import {
  Modal,
  Button,
  Input,
} from 'antd';

import {
  FriendWrapper,
  FriendMain,
} from './style';


export interface IBaseCommentItemTitleAvatarContentActionFriendProps {
  // ? 评论人的相关信息
  userProfileInfo: {
    author_id: string,
    author_name: string,
    author_avatar: string,
    author_article_total: number,
    author_article_star_total: number,
    author_follower_total: number,
    user_id: string,
    user_name: string,
    user_avatar: string,
    user_is_attention: boolean,
    user_is_friend: boolean,
    user_is_current_author: boolean,
  };

  onMakeFriendSend: (data: {
    description: string,
  }) => void;
  onChatSend: () => void;
};
export interface IBaseCommentItemTitleAvatarContentActionFriendState {
  // ? 是否显示备注信息模态框
  isShowDescriptionModal: boolean;
  // ? 加好友时的备注信息
  description: string;
};


const BaseCommentItemTitleAvatarContentActionFriend = React.memo((props: IBaseCommentItemTitleAvatarContentActionFriendProps) => {
  const [state, setState] = React.useState<IBaseCommentItemTitleAvatarContentActionFriendState>({
    isShowDescriptionModal: false,
    description: '',
  });

  /**
   * [初始化] - 加好友备注模态框的标题
   */
  function _initMakeFriendModalTitle() {
    const authorName = props.userProfileInfo.author_name;

    return (
      <p>
        您正在申请加
        <strong style={{ color: '#1da57a' }}>  {authorName}  </strong>
        为好友.
      </p>
    );
  }

  /**
   * [初始化] - 加好友备注模态框的内容
   */
  function _initMakeFriendModalContent(): JSX.Element {
    return (
      <Input.TextArea
        placeholder="请输入备注信息..."
        autosize={{
          minRows: 3,
          maxRows: 5,
        }}
        value={state.description}
        onChange={handleMakeFriendModalDescriptionChange}
      />
    );
  }

  /**
   * [处理] - 加好友备注模态框的输入框更新
   */
  function handleMakeFriendModalDescriptionChange(
    e: React.ChangeEvent,
  ) {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    setState({
      ...state,
      description: value,
    });
  }

  /**
   * [处理] - 显示加好友备注模态框
   */
  function handleMakeFriendModalShow() {
    setState({
      ...state,
      isShowDescriptionModal: true,
    });
  }

  /**
   * [处理] - 隐藏加好友备注模态框
   */
  function hanldeMakeFriendModalHide() {
    setState({
      ...state,
      isShowDescriptionModal: false,
    });
  }

  /**
   * [处理] - 与评论人聊天
   */
  function handleChat() {
    props.onChatSend();
  }

  /**
   * [处理] - 加评论人好友
   */
  function handleMakeFriend() {
    hanldeMakeFriendModalHide();

    props.onMakeFriendSend({
      description: state.description,
    });
  }

  return (
    <FriendWrapper>
      {/* 加好友 | 发起聊天按钮区 */}
      <FriendMain>
        <Button
          icon="message"
          type="ghost"
          disabled={
            props.userProfileInfo.user_is_current_author
              ? true
              : false
          }
          onClick={
            props.userProfileInfo.user_is_friend ? handleChat : handleMakeFriendModalShow
          }
        >
          {
            props.userProfileInfo.user_is_friend ? '去聊天' : '加好友'
          }
        </Button>
      </FriendMain>

      {/* 加好友备注模态框区 */}
      <Modal
        centered={true}
        closable={false}
        title={_initMakeFriendModalTitle()}
        visible={state.isShowDescriptionModal}
        onOk={handleMakeFriend}
        onCancel={hanldeMakeFriendModalHide}
      >
        {_initMakeFriendModalContent()}
      </Modal>
    </FriendWrapper>
  );
});

export default BaseCommentItemTitleAvatarContentActionFriend;