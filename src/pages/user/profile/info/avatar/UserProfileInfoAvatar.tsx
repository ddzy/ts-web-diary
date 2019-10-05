import * as React from 'react';
import * as Qiniu from 'qiniu-js';
import {
  connect,
} from 'react-redux';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Modal,
  Avatar,
  notification,
  message,
} from 'antd';

import {
  AvatarContainer,
  AvatarContent,
} from './style';
import UserProfileInfoAvatarContent from './content/UserProfileInfoAvatarContent';
import { query } from 'services/request';
import { reduxHandleUpdateUseravatar } from 'components/authroute/AuthRoute.redux';
import {
  IBaseCommonUserInfo,
} from 'pages/user/User.types';


export interface IUserProfileInfoAvatarProps extends RouteComponentProps<{
  id: string,
}> {
  // ? 标识主人还是访客
  isOwner: boolean;

  // ? 用户的个人信息详情
  userProfileInfo: IBaseCommonUserInfo;

  reduxHandleUpdateUseravatar: (
    data: {
      userId: string,
      avatarUrl: string,
    },
    callback?: () => void,
  ) => void;
};
export interface IUserProfileInfoAvatarState {
  // ? 是否显示头像上传的模态框
  isShowUploadAvatarModal: boolean;
  // ? 是否显示头像上传时的loading
  isShowUploadAvatarLoading: boolean;

  // ? 待上传的头像图片
  avatarImg: any;
  // ? 头像图片上传之后的地址
  avatarImgUrl: string;
};


const UserProfileInfoAvatar = React.memo<IUserProfileInfoAvatarProps>((
  props: IUserProfileInfoAvatarProps,
): JSX.Element => {

  const [state, setState] = React.useState<IUserProfileInfoAvatarState>({
    isShowUploadAvatarModal: false,
    isShowUploadAvatarLoading: false,
    avatarImg: null,
    avatarImgUrl: '',
  });

  React.useEffect(() => {
    setState({
      ...state,
      avatarImgUrl: props.userProfileInfo.useravatar,
    });
  }, [props.userProfileInfo]);


  /**
   * [处理] - 更新待上传的头像图片
   * @param avatarImg 待上传的图片
   */
  function handleAvatarChange(
    avatarImg: File,
  ) {
    setState({
      ...state,
      avatarImg,
    });
  }

  /**
   * [处理] - 打开上传头像的模态框
   * @description 根据`state.isOwner`来判断是否有权限进行此操作
   */
  function handleUploadAvatarModalShow() {
    const { isOwner } = props;

    if (!isOwner) {
      return;
    }

    setState({
      ...state,
      isShowUploadAvatarModal: true,
    });
  }

  /**
   * [处理] - 隐藏头像上传的模态框
   */
  function handleUploadAvatarModalHide() {
    setState({
      ...state,
      isShowUploadAvatarModal: false,
    });
  }

  /**
   * [处理] - 上传头像
   */
  function handleSendAvatar() {
    const ownerId = localStorage.getItem('userid');

    if (!ownerId) {
      notification.error({
        message: '错误',
        description: '用户凭证已过期, 请重新登录!',
      });

      return;
    }

    const avatarImg = state.avatarImg;

    if (!avatarImg) {
      message.error('请选择一张图片!');

      return;
    }

    setState({
      ...state,
      isShowUploadAvatarLoading: true,
    });

    query({
      url: '/api/upload/qiniu/info',
      method: 'GET',
      data: {
        userId: ownerId,
      },
      jsonp: false,
    }).then(async (res) => {
      const date: string = new Date().toLocaleDateString();
      const {
        uploadToken,
        domain,
      } = res.data.qiniuInfo;
      const key: string = `${date}/user/${ownerId}/profile/avatar/${Date.now()}`;

      const $qiniu: Qiniu.Observable = Qiniu.upload(
        avatarImg,
        key,
        uploadToken,
        {},
        {},
      );

      $qiniu.subscribe({
        next: () => (null),
        error: () => {
          notification.error({
            message: '错误',
            description: '上传至七牛云时出现问题, 请稍后重试!',
          });

          setState({
            ...state,
            isShowUploadAvatarLoading: false,
          });
        },
        complete: () => {
          // 处理前的原图
          const finalOriginImgUrl: string = `https://${domain}/${key}`;

          // 更新数据库信息, 更新AuthRouter组件的用户信息
          props.reduxHandleUpdateUseravatar({
            userId: ownerId,
            avatarUrl: finalOriginImgUrl,
          }, () => {
            setState({
              ...state,
              isShowUploadAvatarLoading: false,
              isShowUploadAvatarModal: false,
              avatarImgUrl: finalOriginImgUrl,
            });
          });
        },
      });
    })
  }

  return (
    <AvatarContainer>
      <AvatarContent
        onClick={handleUploadAvatarModalShow}
      >
        {/* 头像展示区 */}
        <Avatar
          style={{
            width: 160,
            height: 160,
            cursor: 'pointer',
            lineHeight: '160px',
            fontSize: 28,
          }}
          icon="user"
          shape="square"
          src={state.avatarImgUrl}
        />
      </AvatarContent>

      {/* 头像上传模态框区 */}
      <Modal
        centered={true}
        title="上传头像"
        okText="上传"
        okButtonProps={{
          loading: state.isShowUploadAvatarLoading,
        }}
        visible={state.isShowUploadAvatarModal}
        onCancel={handleUploadAvatarModalHide}
        onOk={handleSendAvatar}
      >
        <UserProfileInfoAvatarContent
          onAvatarChange={handleAvatarChange}
        />
      </Modal>
    </AvatarContainer>
  );
});


function mapStateToProps() {
  return {};
}
function mapDispatchToProps() {
  return {
    reduxHandleUpdateUseravatar,
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps(),
)(UserProfileInfoAvatar));