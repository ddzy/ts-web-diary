import * as React from 'react';
import ContentEditable from 'react-contenteditable';

import {
  GlobalStyle,
  InputWrapper,
  InputMain,
  InputMainEditBox,
  InputMainImageBox,
} from './style';
import {
  IBasePinEditState,
} from '../BasePinEdit';


export interface IBasePinEditInputProps {
  pinInfo: Pick<IBasePinEditState, 'pinInfo'>;
  imageList: Pick<IBasePinEditState, 'imageList'>;

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

export default BasePinEditInput;