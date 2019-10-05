import * as React from 'react';
import * as Qiniu from 'qiniu-js';
import {
  notification,
  Spin,
} from 'antd';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import { UploadChangeParam } from 'antd/lib/upload';

import {
  CoverWrapper,
  CoverMain,
} from './style';
import UserProfileCoverView from './view/UserProfileCoverView';
import UserProfileCoverUpload from './upload/UserProfileCoverUpload';
import { query } from 'services/request';
import {
  IBaseCommonUserInfo,
} from 'pages/user/User.types';


export interface IUserProfileCoverProps extends RouteComponentProps<{
  id: string,
}> {
  // ? 标识主人还是访客
  isOwner: boolean;
  // ? 用户的个人信息详情
  userProfileInfo: IBaseCommonUserInfo;
};
export interface IUserProfileCoverState {
  // ? 是否显示上传封面图片时的loading状态
  isUploadCoverImgLoading: boolean,
  // ? 封面图片
  coverImgUrl: string;
};


const UserProfileCover = React.memo<IUserProfileCoverProps>((
  props: IUserProfileCoverProps,
): JSX.Element => {

  const [state, setState] = React.useState<IUserProfileCoverState>({
    isUploadCoverImgLoading: false,
    coverImgUrl: '',
  });

  React.useEffect(() => {
    setState({
      ...state,
      coverImgUrl: props.userProfileInfo.profile_cover_img,
    });
  }, [props.userProfileInfo]);


  /**
   * [处理] - 封面图更新
   */
  function handleCoverImgUploadChange(
    fileInfo: UploadChangeParam,
  ) {
    // 用户凭证检测
    const userId = localStorage.getItem('userid');

    if (!userId) {
      notification.error({
        message: '错误',
        description: '用户凭证已过期, 请重新登录!',
      });

      return props.history.push('/login');
    }

    setState({
      ...state,
      isUploadCoverImgLoading: true,
    });

    // 上传至七牛云
    query({
      url: '/api/upload/qiniu/info',
      method: 'GET',
      data: {
        userId,
      },
      jsonp: false,
    }).then((res) => {
      const coverImg = fileInfo.file as any;

      const date: string = new Date().toLocaleDateString();
      const {
        uploadToken,
        domain,
      } = res.data.qiniuInfo;
      const key: string = `${date}/user/${userId}/profile/cover/image/${Date.now()}`;

      const $qiniu: Qiniu.Observable = Qiniu.upload(
        coverImg,
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
            isUploadCoverImgLoading: false,
          });
        },
        complete: () => {
          // 处理前的原图
          const finalOriginImgUrl: string = `https://${domain}/${key}`;

          // 更新数据库信息
          query({
            url: '/api/user/update/profile/cover',
            method: 'POST',
            jsonp: false,
            data: {
              coverImgUrl: finalOriginImgUrl,
              userId,
            },
          }).then((data) => {
            const { code } = data;

            if (code === 0) {
              setState({
                ...state,
                coverImgUrl: finalOriginImgUrl,
                isUploadCoverImgLoading: false,
              });
            } else {
              setState({
                ...state,
                isUploadCoverImgLoading: false,
              });
            }
          });
        },
      });
    })
  }

  return (
    <Spin spinning={state.isUploadCoverImgLoading}>
      <CoverWrapper>
        <CoverMain>
          {/* 封面图片展示区 */}
          <UserProfileCoverView
            coverImgUrl={state.coverImgUrl}
          />

          {/* 图片上传区 */}
          {
            props.isOwner && (
              <UserProfileCoverUpload
                onCoverImgUploadChange={handleCoverImgUploadChange}
              />
            )
          }
        </CoverMain>
      </CoverWrapper>
    </Spin>
  );

});


export default withRouter(UserProfileCover);