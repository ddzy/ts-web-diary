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
  ActionMainControlCommentCount,
  ActionMainControlShareBox,
  ActionMainControlShare,
} from './style';
import {
  ICommonBasePinItemInfo,
} from '../BasePinItem.types';
import BasePinItemActionComment from './comment/BasePinItemActionComment';


export interface IBasePinItemActionProps {
  // ? 沸点相关信息
  pinInfo: Pick<ICommonBasePinItemInfo, '_id' | 'comment_total'>;
};
export interface IBasePinItemActionState {
  // ? 是否显示评论区
  isShowCommentBox: boolean;
  // ? 当前沸点下评论 + 回复的总数
  commentAndReplyTotal: number;
}


const BasePinItemAction = React.memo((props: IBasePinItemActionProps) => {

  const [state, setState] = React.useState<IBasePinItemActionState>({
    isShowCommentBox: false,
    commentAndReplyTotal: 0,
  });

  React.useEffect(() => {
    handleSetCommentTotal({
      type: 'replace',
      payload: props.pinInfo.comment_total,
    });
  }, [props.pinInfo]);


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

  /**
   * [处理] - 根据子组件的评论数量变化, 设置当前的总数
   * @param data 评论数量相关信息
   */
  function handleSetCommentTotal(
    data: {
      type: 'increase' | 'decrease' | 'replace',
      payload: number,
    },
  ) {
    switch (data.type) {
      case 'increase': {
        setState({
          ...state,
          commentAndReplyTotal: state.commentAndReplyTotal + data.payload,
        });
        break;
      }
      case 'decrease': {
        setState({
          ...state,
          commentAndReplyTotal: state.commentAndReplyTotal - data.payload,
        });
        break;
      };
      case 'replace': {
        setState({
          ...state,
          commentAndReplyTotal: data.payload,
        });
      };
      default: {
        break;
      };
    }
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
                      {
                        state.commentAndReplyTotal
                          ? (
                            <ActionMainControlCommentCount>
                              {state.commentAndReplyTotal}
                            </ActionMainControlCommentCount>
                          )
                          : null
                      }
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
                onSetCommentTotal={handleSetCommentTotal}
              />)
            }
          </Col>
        </Row>
      </ActionMain>
    </ActionWrapper>
  );
});

export default BasePinItemAction;