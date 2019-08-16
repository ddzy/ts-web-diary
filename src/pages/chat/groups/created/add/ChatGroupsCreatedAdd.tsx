/**
 * @name ChatGroupsCreatedAdd
 * @description 创建新的群聊(弹窗表单)
 * @author ddzy
 * @license MIT
 * @since 2019-7-27
 */

import * as React from 'react';
import {
  Form,
  Col,
  Row,
  Input,
  Button,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import {
  AddWrapper,
  AddMain,
  AddMainAction,
  AddMainActionInner,
} from './style';


export interface IChatGroupsCreatedAddProps extends FormComponentProps {
  // ? 隐藏弹窗
  onHideAddDrawer: () => void;
  // ? 提交表单
  onSubmitAddDrawer: (
    value: {
      groupName: string,
      groupDescription: string,
    },
  ) => void;
};

const ChatGroupsCreatedAdd = React.memo((props: IChatGroupsCreatedAddProps) => {
  const { getFieldDecorator } = props.form;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    props.form.validateFields((err, values) => {
      if (!err) {
        props.onSubmitAddDrawer(values);
      }
    });
  }

  return (
    <AddWrapper>
      <AddMain>
        <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="群聊名称">
                {getFieldDecorator('groupName', {
                  rules: [{ required: true, message: '请输入群聊名称' }],
                })(
                  <Input
                    placeholder={'例如: vscode交流群'}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="群聊描述">
                {getFieldDecorator('groupDescription', {
                  rules: [{ required: true, message: '请输入群聊描述' }],
                })(
                  <Input.TextArea
                    rows={4}
                    placeholder={'例如: 与他人分享你的vscode技巧和使用心得'}
                  />,
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

export default (Form.create() as any)(ChatGroupsCreatedAdd);