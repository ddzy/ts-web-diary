import * as React from 'react';
import {
  Row,
  Col,
  Icon,
} from 'antd';

import {
  ActionWrapper,
  ActionMain,
  ActionMainControlBox,
  ActionMainControlStarBox,
  ActionMainControlStar,
  ActionMainControlCommentBox,
  ActionMainControlComment,
  ActionMainControlShareBox,
  ActionMainControlShare,
} from './style';
import BasePinItemActionComment from './comment/BasePinItemActionComment';


export interface IBasePinItemActionProps { };
export interface IBasePinItemActionState {
  // ? 是否显示评论区
  isShowCommentBox: boolean;
}


const BasePinItemAction = React.memo((props: IBasePinItemActionProps) => {

  const [state] = React.useState<IBasePinItemActionState>({
    isShowCommentBox: false,
  });


  return (
    <ActionWrapper>
      <ActionMain>
        <Row gutter={40}>
          <Col span={1} />
          <Col span={21}>
            {/* 控制框 */}
            <ActionMainControlBox>
              <Row>
                <Col span={8}>
                  <ActionMainControlStarBox>
                    <ActionMainControlStar>
                      <Icon type="like" />
                    </ActionMainControlStar>
                  </ActionMainControlStarBox>
                </Col>
                <Col span={8}>
                  <ActionMainControlCommentBox>
                    <ActionMainControlComment>
                      <Icon type="message" />
                    </ActionMainControlComment>
                  </ActionMainControlCommentBox>
                </Col>
                <Col span={8}>
                  <ActionMainControlShareBox>
                    <ActionMainControlShare>
                      <Icon type="share-alt" />
                    </ActionMainControlShare>
                  </ActionMainControlShareBox>
                </Col>
              </Row>
            </ActionMainControlBox>

            {/* 评论区 */}
            {
              state.isShowCommentBox && (<BasePinItemActionComment />)
            }
          </Col>
        </Row>
      </ActionMain>
    </ActionWrapper>
  );
});

export default BasePinItemAction;