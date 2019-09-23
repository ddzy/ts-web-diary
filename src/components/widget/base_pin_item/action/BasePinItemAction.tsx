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
import {
  ICommonBasePinItemInfo,
} from '../BasePinItem.types';
import BasePinItemActionComment from './comment/BasePinItemActionComment';


export interface IBasePinItemActionProps {
  // ? 沸点相关信息
  pinInfo: Pick<ICommonBasePinItemInfo, '_id'>;
};
export interface IBasePinItemActionState {
  // ? 是否显示评论区
  isShowCommentBox: boolean;
}


const BasePinItemAction = React.memo((props: IBasePinItemActionProps) => {

  const [state, setState] = React.useState<IBasePinItemActionState>({
    isShowCommentBox: false,
  });


  /**
   * [处理] - 评论按钮点击
   * @description 切换评论区的显隐状态
   * @param e 评论按钮的DOM元素
   */
  function handleCommentBoxClick(
    e: React.MouseEvent,
  ) {
    setState({
      ...state,
      isShowCommentBox: !state.isShowCommentBox,
    });
  }

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
                  <ActionMainControlCommentBox
                    onClick={handleCommentBoxClick}
                  >
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
              state.isShowCommentBox && (<BasePinItemActionComment
                pinInfo={props.pinInfo}
              />)
            }
          </Col>
        </Row>
      </ActionMain>
    </ActionWrapper>
  );
});

export default BasePinItemAction;