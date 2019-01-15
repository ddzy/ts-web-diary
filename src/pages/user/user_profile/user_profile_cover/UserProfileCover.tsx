import * as React from 'react';
import {
  Upload,
  Button,
  Icon,
} from 'antd';

import {
  CoverWrapper,
  CoverContent,
  CoverContentImage,
  CoverContentUpload,
} from './style';
import AdminBgImg from 'static/images/admin_bg_img.png';

export interface IUserProfileCoverProps { };


const UserProfileCover = React.memo<IUserProfileCoverProps>((
  props: IUserProfileCoverProps,
): JSX.Element => {

  return (
    <CoverWrapper>
      <CoverContent>
        <CoverContentImage
          url={AdminBgImg}
        />
        <CoverContentUpload>
          <Upload>
            <Button type="ghost">
              <Icon type="upload" />
              编辑封面图片
            </Button>
          </Upload>
        </CoverContentUpload>
      </CoverContent>
    </CoverWrapper>
  );

});


export default UserProfileCover;