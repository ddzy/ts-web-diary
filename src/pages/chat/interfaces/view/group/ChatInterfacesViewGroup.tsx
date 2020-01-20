import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { message } from "antd";

import { GroupWrapper, GroupMain } from "./style";
import ChatInterfacesViewGroupTitle from "./title/ChatInterfacesViewGroupTitle";
import ChatInterfacesViewGroupContent from "./content/ChatInterfacesViewGroupContent";
import ChatInterfacesViewGroupAction from "./action/ChatInterfacesViewGroupAction";
import { statusIOClient } from "services/websocket";
import { query } from "services/request";
import { CHAT_MESSAGE_PAGE_SIZSE_LARGE } from "constants/constants";
import {
  IBasicChatGroupInfo,
  IBasicChatGroupMessageContentType
} from "pages/basic.types";
import { chatGroupIOClient } from "services/websocket";

export interface IChatInterfacesViewGroupProps
  extends RouteComponentProps<{
    id: string;
  }> {}
export interface IChatInterfacesViewGroupState {
  groupChatInfo: IBasicChatGroupInfo;

  // ? 整体loading状态
  // * 只在第一次获取数据时有效
  loading: boolean;
  // ? 消息列表分页——是否还有更多消息
  hasMoreMessage: boolean;
  // ? 消息列表分页——修复聊天记录吸顶bug
  isMessageSend: boolean;
}

const ChatInterfacesViewGroup = React.memo(
  (props: IChatInterfacesViewGroupProps) => {
    const [state, setState] = React.useState<IChatInterfacesViewGroupState>({
      groupChatInfo: {
        _id: "",
        owner: {
          _id: "",
          user_id: {
            _id: "",
            username: "",
            userpwd: "",
            usergender: "",
            useravatar: "",
            profile_cover_img: "",
            address: "",
            website: "",
            introduction: "",
            job: "",
            education: "",
            bind_third_party: {
              github: {
                type: 0
              }
            },
            collections: [],
            articles: [],
            attention: {
              users: [],
              topics: []
            },
            followers: [],
            friends: [],
            chat_memory: [],
            notifications: [],
            activities: [],
            tracks: [],
            pins: [],

            create_time: Date.now(),
            update_time: Date.now()
          },
          group_id: "",
          authority: 0,
          join_time: Date.now(),
          create_message: [],
          create_message_total: 0,
          last_create_message_time: Date.now(),
          create_time: Date.now()
        },
        admins: [],
        name: "",
        name_update_time: Date.now(),
        description: "",
        description_update_time: Date.now(),
        avatar: "",
        avatar_update_time: Date.now(),
        create_time: Date.now(),
        member_total: 0,
        members: [],
        message_total: 0,
        messages: [],
        last_create_message_time: Date.now()
      },
      loading: false,
      hasMoreMessage: true,
      isMessageSend: false
    });

    React.useEffect(() => {
      setState({
        ...state,
        loading: true,
        hasMoreMessage: true
      });

      // 获取群聊信息
      _getGroupChatMessageInfoFromServer();

      // socket处理发送用户处于会话状态
      // ? 正处于哪个会话
      statusIOClient.emit("sendUserOnWhichChat", {
        userId: localStorage.getItem("userid") || "",
        chatId: props.match.params.id || ""
      });
    }, [props.match.params.id]);

    React.useEffect(() => {
      _setGroupChatMessageInfo();
    });

    /**
     * @description 从后台获取群聊相关信息
     * @author ddzy<1766083035@qq.com>
     * @since 2020/1/19
     */
    function _getGroupChatMessageInfoFromServer() {
      const userId = localStorage.getItem("userid");
      const chatId = props.match.params.id;
      const chatType = "group";

      if (!userId || typeof userId !== "string") {
        message.error({
          message: "错误",
          description: "登录凭证已过期, 请重新登录!"
        });

        props.history.push("/login");
      } else {
        if (!chatId || typeof chatId !== "string") {
          message.error({
            message: "错误",
            description: "聊天凭证无效, 请重新发起单聊"
          });

          props.history.push("/chat/friends");
        } else {
          query({
            url: "/api/chat/group/info",
            method: "GET",
            jsonp: false,
            data: {
              userId,
              chatId,
              chatType,
              pageSize: CHAT_MESSAGE_PAGE_SIZSE_LARGE,
              page: 1
            }
          }).then(res => {
            const resCode = res.code;
            const resMessage = res.message;
            const resData = res.data;

            if (resCode === 0) {
              const { groupChatInfo } = resData;

              setState({
                ...state,
                groupChatInfo,
                loading: false
              });
            } else {
              message.error(resMessage);
            }

            // socket处理同步重置聊天历史列表单个条目未读消息总数为0
            // chatIOClient.emit("sendResetChatMemoryItemUnreadMessageTotal", {
            //   chatId,
            //   userId
            // });
          });
        }
      }
    }

    /**
     * @description 实时接受聊天消息
     * @author ddzy<1766083035@qq.com>
     * @since 2020/1/20
     */
    function _setGroupChatMessageInfo() {
      chatGroupIOClient.removeEventListener("receiveChatGroupMessage");

      chatGroupIOClient.on("receiveChatGroupMessage", (data: any) => {
        // 只显示当前群聊的消息
        console.log(data);
      });
    }

    /**
     * @description 发送聊天消息
     * @author ddzy<1766083035@qq.com>
     * @since 2020/1/20
     */
    function handleChatMessageSend(
      messageInfo: {
        type: IBasicChatGroupMessageContentType;
        content: string;
      },
      callback?: () => void
    ) {
      const fromUserId = localStorage.getItem("userid");

      if (!fromUserId) {
        message.error("用户凭证已丢失, 请登录后再发言!");

        return props.history.push("/login");
      }

      const chatId = props.match.params.id;
      const chatType = "group";
      const contentType = messageInfo.type;
      const content = messageInfo.content;

      // 发送消息
      chatGroupIOClient.emit("sendChatGroupMessage", {
        fromUserId,
        chatId,
        chatType,
        contentType,
        content
      });

      callback && callback();
    }

    return (
      <GroupWrapper>
        <GroupMain>
          {/* 群聊顶部标题区块 */}
          <ChatInterfacesViewGroupTitle groupInfo={state.groupChatInfo} />

          {/* 群聊中部内容区块 */}
          <ChatInterfacesViewGroupContent groupInfo={state.groupChatInfo} />

          {/* 群聊尾部操作区块 */}
          <ChatInterfacesViewGroupAction
            onChatMessageSend={handleChatMessageSend}
          />
        </GroupMain>
      </GroupWrapper>
    );
  }
);

export default withRouter(ChatInterfacesViewGroup);
