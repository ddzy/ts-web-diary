import * as React from 'react';
import {
  Upload,
  Icon,
  Form,
} from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { FormComponentProps } from 'antd/lib/form';

import {
  ContentWrapper,
  ContentMain,
} from './style';


export interface IChatInterfacesViewSingleActionExtraFileContentProps extends FormComponentProps {
  // ? 待上传的文件列表
  fileList: UploadFile[];
  // ? 监听上传的文件更新
  onUploadChange: (data: UploadChangeParam) => void;
};


const ChatInterfacesViewSingleActionExtraFileContent = React.memo((props: IChatInterfacesViewSingleActionExtraFileContentProps) => {

  const { getFieldDecorator } = props.form;

  /**
   * [处理] - 文件上传前预处理
   * @description 阻止默认上传, 使用自定义上传
   */
  function handleBeforeUpload() {
    return false;
  }

  return (
    <ContentWrapper>
      <ContentMain>
        <Form>
          <Form.Item>
            {getFieldDecorator('file_list', {

            })(
              <Upload.Dragger
                name="file_list"
                fileList={props.fileList}
                beforeUpload={handleBeforeUpload}
              >
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">
                  暂时只支持发送单个文件
                </p>
              </Upload.Dragger>
            )}
          </Form.Item>
        </Form>
      </ContentMain>
    </ContentWrapper>
  );
});

export default Form.create({
  onValuesChange(props: IChatInterfacesViewSingleActionExtraFileContentProps, changedFields) {
    const file_list = changedFields.file_list;

    props.onUploadChange(file_list);
  },

  mapPropsToFields(props: IChatInterfacesViewSingleActionExtraFileContentProps) {
    return {
      file_list: Form.createFormField({
        value: props.fileList,
      }),
    };
  },
})(ChatInterfacesViewSingleActionExtraFileContent);