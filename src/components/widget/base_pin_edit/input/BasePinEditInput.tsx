import * as React from 'react';
import ContentEditable from 'react-contenteditable';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import {
  GlobalStyle,
  InputWrapper,
  InputMain,
  InputMainEditBox,
  InputMainImageBox,
  InputMainTopicBox,
  InputMainTopicList,
  InputMainTopicItem,
  InputMainTopicTag,
} from './style';
import {
  IBasePinEditState,
} from '../BasePinEdit';


export interface IBasePinEditInputProps extends RouteComponentProps {
  // ? 沸点值相关信息
  pinInfo: Pick<IBasePinEditState, 'pinInfo'>;

  onPlainContentChange: (e: React.ChangeEvent) => void;
};
export interface IBasePinEditInputState { }


const BasePinEditInput = React.memo((props: IBasePinEditInputProps) => {
  const $editableContainerDOM = React.useRef<HTMLDivElement>(
    document.createElement('div'),
  );
  const $editableDOM = React.useRef<ContentEditable>(
    null,
  );

  React.useEffect(() => {
    const oEditableComponent = $editableDOM.current;

    if (oEditableComponent) {
      const oEditable = oEditableComponent.htmlEl as HTMLDivElement;

      oEditable.addEventListener('focus', handleEditableDivFocus);
      oEditable.addEventListener('blur', handleEditableDivBlur);

      return () => {
        oEditable.removeEventListener('focus', handleEditableDivFocus);
        oEditable.removeEventListener('blur', handleEditableDivBlur);
      };
    }

    return () => null;
  }, []);


  /**
   * [初始化] - 选择的话题列表
   * @description 目前初步计划, 只能选择一个话题, 后续可能会开放多个话题同时选择
   */
  function _initTopicList() {
    const topicInfo = props.pinInfo.pinInfo.topic;

    return topicInfo.name
      ? (
        <InputMainTopicItem
          onClick={() => handleTopicItemClick(props.pinInfo.pinInfo.topic._id)}
        >
          <InputMainTopicTag>
            {props.pinInfo.pinInfo.topic.name}
          </InputMainTopicTag>
        </InputMainTopicItem>
      )
      : null;
  }

  /**
   * [处理] - 输入框获得焦点
   * @description 更新父级的样式
   */
  function handleEditableDivFocus() {
    const oEditableContainer = $editableContainerDOM.current;

    if (oEditableContainer) {
      oEditableContainer.classList['add']('active');
    }
  }

  /**
   * [处理] - 输入框失去焦点
   * @description 更新父级的样式
   */
  function handleEditableDivBlur() {
    const oEditableContainer = $editableContainerDOM.current;

    if (oEditableContainer) {
      oEditableContainer.classList['remove']('active');
    }
  }

  /**
   * [处理] - 点击话题, 跳转至话题页
   * @param topicId 话题的id
   */
  function handleTopicItemClick(
    topicId: string,
  ) {
    props.history.push(`/topic/${topicId}`);
  }

  return (
    <InputWrapper>
      <InputMain ref={$editableContainerDOM}>
        {/* 普通文本输入框 */}
        <InputMainEditBox>
          <ContentEditable
            ref={$editableDOM}
            className="pin-main-view-edit-contenteditable-input"
            data-placeholder="发沸点时选择一个话题, 可以大大增加被推荐的概率~"
            html={props.pinInfo.pinInfo.plainContent}
            onChange={props.onPlainContentChange}
          />
        </InputMainEditBox>

        {/* 话题预览区 */}
        <InputMainTopicBox>
          <InputMainTopicList>
            {_initTopicList()}
          </InputMainTopicList>
        </InputMainTopicBox>

        {/* 图片上传预览区 */}
        <InputMainImageBox
          id="pin-main-view-edit-image-container"
          className="pin-main-view-edit-image-container"
        />
      </InputMain>
      <GlobalStyle />
    </InputWrapper>
  );
});

export default withRouter(BasePinEditInput);