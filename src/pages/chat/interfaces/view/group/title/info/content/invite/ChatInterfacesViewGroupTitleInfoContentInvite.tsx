import * as React from "react";
import { Select, message } from "antd";

import { InviteWrapper, InviteMain } from "./style";
import { query } from "services/request";
import { IBasicUserInfo } from "pages/basic.types";

export interface IChatInterfacesViewGroupTitleInfoContentInviteProps {
  onInviteSelectChange: (
    data: string,
  ) => void;
}
export interface IChatInterfacesViewGroupTitleInfoContentInviteState {
  friendList: IBasicUserInfo[]; // 好友列表
}

const ChatInterfacesViewGroupTitleInfoContentInvite = React.memo(
  (props: IChatInterfacesViewGroupTitleInfoContentInviteProps) => {
    const [state, setState] = React.useState<IChatInterfacesViewGroupTitleInfoContentInviteState>({
      friendList: [],
    });

    React.useEffect(() => {
      _getFriendListFromServer();
    }, []);

    /**
     * @description 从后台获取好友列表
     * @author ddzy<1766083035@qq.com>
     * @since 2020/1/20
     */
    function _getFriendListFromServer() {
      const userId = localStorage.getItem('userid');

      query({
        method: 'GET',
        url: '/api/chat/single/info/friend/list',
        jsonp: false,
        data: {
          userId,
        },
      }).then((res) => {
        const resCode = res.code;
        const resMessage = res.message;
        const resData = res.data;

        if (resCode === 0) {
          const pendingFriendList = resData.friendList;

          setState({
            ...state,
            friendList: pendingFriendList,
          });
        } else {
          message.error(resMessage);
        }
      });
    }

    /**
     * @description 初始化好友列表
     * @author ddzy<1766083035@qq.com>
     * @since 2020/1/20
     */
    function initFriendList() {
      const friendList = state.friendList;

      return friendList.map((v) => {
        return (
          <Select.Option
            key={v._id}
            value={v._id}
          >
            {v.username}
          </Select.Option>
        );
      });
    }

    return (
      <InviteWrapper>
        <InviteMain>
          <Select
            style={{ width: 200 }}
            placeholder="选择一个好友..."
            optionFilterProp="children"
            onChange={props.onInviteSelectChange}
          >
            {initFriendList()}
          </Select>
        </InviteMain>
      </InviteWrapper>
    );
  }
);

export default ChatInterfacesViewGroupTitleInfoContentInvite;
