import * as React from "react";
import { Form, Col, Row, Input, Button, Upload, Icon } from "antd";
import { FormComponentProps } from "antd/lib/form";

import {
  AddWrapper,
  AddMain,
  AddMainAction,
  AddMainActionInner
} from "./style";

export interface IChatGroupsCreatedAddProps extends FormComponentProps {
  groupInfo: {
    // 新创建的群聊信息
    name: string; // 群聊名称
    avatar: string; // 群聊头像
    description: string; // 群聊描述
  };

  onHideAddDrawer: () => void;
  onGroupInfoFormChange: () => void;
  onSubmitAddDrawer: (value: {
    groupName: string;
    groupDescription: string;
  }) => void;
}

const ChatGroupsCreatedAdd = React.memo((props: IChatGroupsCreatedAddProps) => {
  const { getFieldDecorator } = props.form;

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">上传主题图片</div>
    </div>
  );

  /**
   * @description 提交群聊信息
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/15
   */
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    props.form.validateFields((err, values) => {
      if (!err) {
        props.onSubmitAddDrawer(values);
      }
    });
  }

  /**
   * @description 文章主题图片上传前预处理
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/15
   */
  function handleBeforeUpload(): boolean {
    return false;
  }

  return (
    <AddWrapper>
      <AddMain>
        <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="群聊头像">
                {getFieldDecorator(
                  "groupAvatar",
                  {}
                )(
                  <Upload
                    name="chat_group_avatar_img"
                    listType="picture-card"
                    className="chat-group-avatar-uploader"
                    style={{ height: "120px", width: "120px" }}
                    showUploadList={false}
                    beforeUpload={handleBeforeUpload}
                  >
                    {props.groupInfo.avatar ? (
                      <img
                        src={props.groupInfo.avatar}
                        width="120"
                        height="120"
                        alt="group_avatar"
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="群聊名称">
                {getFieldDecorator("groupName", {
                  rules: [{ required: true, message: "请输入群聊名称" }]
                })(<Input placeholder={"例如: vscode交流群"} />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="群聊描述">
                {getFieldDecorator("groupDescription", {
                  rules: [{ required: true, message: "请输入群聊描述" }]
                })(
                  <Input.TextArea
                    rows={4}
                    placeholder={"例如: 与他人分享你的vscode技巧和使用心得"}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>

        {/* 控制区域 */}
        <AddMainAction>
          <AddMainActionInner>
            <Button onClick={props.onHideAddDrawer} style={{ marginRight: 8 }}>
              取消
            </Button>
            <Button onClick={handleSubmit} type="primary">
              提交
            </Button>
          </AddMainActionInner>
        </AddMainAction>
      </AddMain>
    </AddWrapper>
  );
});

export default (Form.create({
  onValuesChange(props: any, changedFields, allChangedFields) {
    // props.onChatGroupAvatarImageChange(changedFields);
    props.onGroupInfoFormChange(allChangedFields);
  },

  mapPropsToFields(props) {
    return {
      groupAvatar: Form.createFormField({
        value: props.groupInfo.avatar
      }),
      groupName: Form.createFormField({
        value: props.groupInfo.name
      }),
      groupDescription: Form.createFormField({
        value: props.groupInfo.description
      })
    };
  }
}) as any)(ChatGroupsCreatedAdd);
