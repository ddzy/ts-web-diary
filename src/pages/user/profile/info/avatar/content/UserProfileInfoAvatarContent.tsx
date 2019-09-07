import * as React from 'react';
import {
  Upload,
} from 'antd';

import {
  ContentWrapper,
  ContentMain,
} from './style';
import { getBase64 } from 'utils/utils';


export interface IUserProfileInfoAvatarContentProps {
  // ? 本地头像更新
  onAvatarChange: (avatarImg: File) => void;
};
export interface IUserProfileInfoAvatarContentState {
  // ? 本地待上传的头像Base64位
  avatarImgBase64: string;
};


const UserProfileInfoAvatarContent = React.memo((props: IUserProfileInfoAvatarContentProps) => {

  const [state, setState] = React.useState<IUserProfileInfoAvatarContentState>({
    avatarImgBase64: '',
  });

  /**
   * [处理] - 图片上传前预处理
   * @description 阻止默认上传, 使用自定义上传
   */
  function handleBeforeUpload() {
    return false;
  }

  /**
   * [处理] - 头像图片更新
   * @description 转成base64实时预览, 并传递原图片给父组件
   * @param data antd的Upload混合参数
   */
  function handleAvatarChange(
    data: any,
  ) {
    const file = data.file;

    getBase64(file, (result) => {
      setState({
        ...state,
        avatarImgBase64: result,
      });

      props.onAvatarChange(file);
    });
  }

  return (
    <ContentWrapper>
      <ContentMain>
        <Upload
          listType="picture-card"
          style={{
            width: 100,
            height: 100,
          }}
          accept="image/jpeg, image/jpg, image/png, image/gif"
          showUploadList={false}
          beforeUpload={handleBeforeUpload}
          onChange={handleAvatarChange}
        >
          {
            state.avatarImgBase64
              ? (
                <img src={state.avatarImgBase64} style={{ width: '100%' }} alt="avatar" />
              )
              : (
                <div>
                  <div className="ant-upload-text">Upload</div>
                </div>
              )
          }
        </Upload>
      </ContentMain>
    </ContentWrapper>
  );
});

export default UserProfileInfoAvatarContent