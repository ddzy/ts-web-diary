import * as React from 'react';
import { Row, Col, Card, Upload, Icon, message } from 'antd';


import {
  MeInfoContainer,
  InfoAvatarBox,
  MeName,
  MeGender,
} from '../style'; 


export interface IMeInfoProps {
  username: string;
  usergender: string;
  useravatar: string;
};
interface IMeInfoState {
  readonly loading: boolean;
  readonly avatar: string;
};


class MeInfo extends React.Component<IMeInfoProps, IMeInfoState> {

  public readonly state = {
    loading: false,
    avatar: '',   // 头像
  }


  public componentDidMount(): void {
    this.setState({ avatar: this.props.useravatar });
  }


  public beforeUpload = (file: Blob): boolean => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }


  public handleAvatarChange = (info: any) => {

    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({ 
        avatar: info.file.response.useravatar,
        loading: false,
      }, () => {
        window.location.reload();
      });
    }
  }


  public render(): JSX.Element {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">换头像</div>
      </div>
    );

    return (
      <MeInfoContainer>
        <Row>
          <Card>
            <Col span={6}>
              <InfoAvatarBox>
                <Upload
                  name="user_avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  style={{ height: '160px' }}
                  headers={{
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                  }}
                  showUploadList={false}
                  action="/api/me/upload/avatar"
                  data={{ userid: localStorage.getItem('userid') }}
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleAvatarChange}
                >
                  {
                    this.props.useravatar
                      ? <img src={`${this.props.useravatar}`} width="160" height="160" alt="avatar" />
                      : uploadButton
                  }
                </Upload>
              </InfoAvatarBox>
            </Col>
            <Col span={18}>
              <MeName>
                {this.props.username}
              </MeName>
              <MeGender>
                性别:  {this.props.usergender}
              </MeGender>
            </Col>
          </Card>
        </Row>
      </MeInfoContainer>
    );
  }
};


export default MeInfo;