import * as React from 'react';
import { Row, Col, Card, Icon, Upload, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { WriteUploadWrapper } from './style';


export interface IWriteUploadProps extends FormComponentProps {
  // ? 文章主题图片
  cover_img: string;

  onArticleCoverImageChange: (imageUrl: string) => void;
};


const WriteUploadForm = React.memo<IWriteUploadProps>((
  props: IWriteUploadProps,
): JSX.Element => {
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">上传主题图片</div>
    </div>
  );
  const { getFieldDecorator } = props.form;

  /**
   * [处理] - 文章主题图片上传前预处理
   * @param file 文件对象
   */
  function handleBeforeUpload(file: Blob): boolean {
    return false;
  }

  return (
    <WriteUploadWrapper>
      <Row style={{ marginTop: '15px' }}>
        <Col>
          <Card
            title="封面图"
          >
            <Form>
              <Form.Item>
                {getFieldDecorator('article_cover_img', {
                })(
                  <Upload
                    name="article_cover_img"
                    listType="picture-card"
                    className="avatar-uploader"
                    style={{ height: '160px' }}
                    showUploadList={false}
                    beforeUpload={handleBeforeUpload}
                  >
                    {
                      props.cover_img
                        ? (
                          <img
                            src={
                              props.cover_img
                            }
                            width="160"
                            height="160"
                            alt="cover_img"
                          />
                        )
                        : (
                          uploadButton
                        )
                    }
                  </Upload>
                )}
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </WriteUploadWrapper>
  );
});


const WriteUpload = Form.create({
  onValuesChange(props: any, changedFields) {
    props.onArticleCoverImageChange(changedFields);
  },

  mapPropsToFields(props) {
    return {
      article_cover_img: Form.createFormField({
        value: props.cover_img,
      }),
    };
  },
})(WriteUploadForm);


export default WriteUpload;