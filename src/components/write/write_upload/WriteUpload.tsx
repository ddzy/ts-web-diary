import * as React from 'react';
import { Row, Col, Card, Icon, Upload, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { WriteUploadWrapper } from './style';



export interface IWriteUploadProps extends FormComponentProps {
  article_title_image: string;
  onTitleImageChange: (imageUrl: string) => void;
};
interface IWriteUploadState {
};


//// 上传主题图片
class WriteUploadForm extends React.PureComponent<IWriteUploadProps, IWriteUploadState> {

  public readonly state = {}



  public handleBeforeUpload = (file: Blob): boolean => {
    return false;
  }


  public render(): JSX.Element {

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传主题图片</div>
      </div>
    );
    const { getFieldDecorator } = this.props.form;

    return (
      <WriteUploadWrapper>
        <Row style={{ marginTop: '15px' }}>
          <Col>
            <Card
              title="封面图"
            >
              <Form>
                <Form.Item>
                  {getFieldDecorator('article_title_image', {
                  })(
                    <Upload
                      name="article_title_image"
                      listType="picture-card"
                      className="avatar-uploader"
                      style={{ height: '160px' }}
                      showUploadList={false}
                      beforeUpload={this.handleBeforeUpload}
                    >
                    {
                        this.props.article_title_image
                          ? (
                              <img 
                                src={
                                  this.props.article_title_image
                                }
                                width="160"
                                height="160"
                                alt="article_title_image"
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
  }

}


const WriteUpload = Form.create({
  onFieldsChange(props: any, changedFields) {
    props.onTitleImageChange(changedFields);
  },

  mapPropsToFields(props) {
    return {
      article_title_image: Form.createFormField({
        ...props.article_title_image,
        value: props.article_title_image,
      }),
    };
  },
})(WriteUploadForm);


export default WriteUpload;