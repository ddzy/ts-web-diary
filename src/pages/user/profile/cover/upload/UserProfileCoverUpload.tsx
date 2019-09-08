import * as React from 'react';
import {
  Upload,
  Button,
  Icon,
} from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';

import {
  UploadWrapper,
  UploadMain,
} from './style';


export interface IUserProfileCoverUploadProps {
  onCoverImgUploadChange: (
    data: UploadChangeParam
  ) => void;
};
export interface IUserProfileCoverUploadState { }


const UserProfileCoverUpload = React.memo((props: IUserProfileCoverUploadProps) => {
  return (
    <UploadWrapper>
      <UploadMain>
        <Upload
          accept="image/jpg, image/jpeg, image/png, image/gif"
          showUploadList={false}
          beforeUpload={() => false}
          onChange={props.onCoverImgUploadChange}
        >
          <Button type="ghost">
            <Icon type="upload" />
            编辑封面图片
            </Button>
        </Upload>
      </UploadMain>
    </UploadWrapper>
  );
});

export default UserProfileCoverUpload;