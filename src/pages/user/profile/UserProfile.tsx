import * as React from 'react';
import {
  message,
} from 'antd';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import {
  ProfileContainer,
  ProfileMain,
} from './style';
import UserProfileCover from './cover/UserProfileCover';
import UserProfileInfo from './info/UserProfileInfo';
import {
  IBaseCommonUserProfileInfo,
} from '../User.types';
import { query } from 'services/request';


export interface IUserProfileProps extends RouteComponentProps<{
  id: string,
}> {
  // ? 标识主人还是访客
  isOwner: boolean;
};
export interface IUserProfileState {
  // ? 用户的个人信息详情
  userProfileInfo: IBaseCommonUserProfileInfo;
};


const UserProfile = React.memo<IUserProfileProps>((
  props: IUserProfileProps,
): JSX.Element => {

  const [state, setState] = React.useState<IUserProfileState>({
    userProfileInfo: {
      _id: '',
      username: '',
      useravatar: '',
      usergender: '',
      address: '',
      profile_cover_img: '',
      website: '',
      introduction: '',
      job: '',
      education: '',
    },
  });

  React.useEffect(() => {
    _getUserProfileInfoFromServer();
  }, []);


  /**
   * [获取] - 用户的个人信息详情
   */
  function _getUserProfileInfoFromServer() {
    const ownerId = props.match.params.id;

    query({
      method: 'GET',
      jsonp: false,
      url: '/api/user/info/detail',
      data: {
        userId: ownerId,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;
      const resData = res.data;

      if (resCode === 0) {
        const { userInfo } = resData;

        setState({
          ...state,
          userProfileInfo: userInfo,
        });
      } else if (resCode === -1) {
        message.error(resMessage);
      }
    });
  }

  return (
    <ProfileContainer>
      <ProfileMain>
        {/* 封面图展示区 */}
        <UserProfileCover
          isOwner={props.isOwner}
          userProfileInfo={state.userProfileInfo}
        />

        {/* 个人信息展示区 */}
        <UserProfileInfo
          isOwner={props.isOwner}
          userProfileInfo={state.userProfileInfo}
        />
      </ProfileMain>
    </ProfileContainer>
  );

});


export default withRouter(UserProfile);