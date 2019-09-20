import * as React from 'react';
import {
  Row,
  Col,
} from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';

import {
  ActionWrapper,
  ActionMain,
} from './style';
import BasePinEditActionImage from './image/BasePinEditActionImage';
import BasePinEditActionLink from './link/BasePinEditActionLink';
import BasePinEditActionTopic from './topic/BasePinEditActionTopic';
import { IBasePinEditState } from '../BasePinEdit';


export interface IBasePinEditActionProps {
  // ? 本地图片列表
  imageList: Pick<IBasePinEditState, 'imageList'>;

  onImageContentChange: (
    info: UploadChangeParam
  ) => void;
};
export interface IBasePinEditActionState { }


const BasePinEditAction = React.memo((props: IBasePinEditActionProps) => {
  return (
    <ActionWrapper>
      <ActionMain>
        <Row>
          <Col span={3}>
            {/* 沸点图片上传区 */}
            <BasePinEditActionImage
              imageList={props.imageList}
              onImageContentChange={props.onImageContentChange}
            />
          </Col>
          <Col span={3}>
            {/* 沸点链接上传区 */}
            <BasePinEditActionLink />
          </Col>
          <Col span={3}>
            {/* 沸点话题选择区 */}
            <BasePinEditActionTopic />
          </Col>
        </Row>
      </ActionMain>
    </ActionWrapper>
  );
});

export default BasePinEditAction;