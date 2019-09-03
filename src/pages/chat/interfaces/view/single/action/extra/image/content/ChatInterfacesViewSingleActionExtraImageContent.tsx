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


export interface IChatInterfacesViewSingleActionExtraImageContentProps extends FormComponentProps {
  // ? 要发送的图片列表
  imageList: UploadFile[];

  // ? 监听上传的图片更新
  onUploadChange: (data: UploadChangeParam) => void;
};


const ChatInterfacesViewSingleActionExtraImageContent = React.memo((props: IChatInterfacesViewSingleActionExtraImageContentProps) => {

  const { getFieldDecorator } = props.form;

  /**
   * [处理] - 图片上传前预处理
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
            {getFieldDecorator('image_list', {

            })(
              <Upload
                listType="picture-card"
                style={{
                  width: 100,
                  height: 100,
                }}
                showUploadList={true}
                fileList={props.imageList}
                beforeUpload={handleBeforeUpload}
              >
                {
                  props.imageList.length > 0 ? null : (
                    <div>
                      <Icon type="plus" />
                      <div className="ant-upload-text">Upload</div>
                    </div>
                  )
                }
              </Upload>
            )}
          </Form.Item>
        </Form>

      </ContentMain>
    </ContentWrapper>
  );
});

export default Form.create({
  onValuesChange(props: IChatInterfacesViewSingleActionExtraImageContentProps, changedFields) {
    const image_list = changedFields.image_list;

    props.onUploadChange(image_list);
  },

  mapPropsToFields(props: IChatInterfacesViewSingleActionExtraImageContentProps) {
    return {
      image_list: Form.createFormField({
        value: props.imageList,
      }),
    };
  },
})(ChatInterfacesViewSingleActionExtraImageContent);