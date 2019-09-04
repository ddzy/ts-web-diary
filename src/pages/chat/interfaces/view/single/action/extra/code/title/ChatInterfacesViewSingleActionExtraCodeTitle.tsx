import * as React from 'react';
import {
  Select,
} from 'antd';

import {
  TitleWrapper,
  TitleMain,
} from './style';
import {
  MONACO_EDITOR_CODE_LANGUAGE_LIST,
} from 'constants/constants';


export interface IChatInterfacesViewSingleActionExtraCodeTitleProps {
  // ? 代码相关信息
  codeInfo: {
    language: string,
    code: string,
  };

  // ? 下拉框语言类型更新
  onCodeLanguageChange: (language: string) => void;
};


const ChatInterfacesViewSingleActionExtraCodeTitle = React.memo((props: IChatInterfacesViewSingleActionExtraCodeTitleProps) => {
  /**
   * [初始化] - 代码语言类型列表
   */
  function _initCodeLanguageList() {
    return MONACO_EDITOR_CODE_LANGUAGE_LIST.map((language, index) => {
      return (
        <Select.Option
          key={index}
          value={language}
        >
          {language}
        </Select.Option>
      );
    });
  }

  return (
    <TitleWrapper>
      <TitleMain>
        <Select
          style={{
            width: 120,
          }}
          defaultValue={props.codeInfo.language}
          onChange={props.onCodeLanguageChange}
        >
          {_initCodeLanguageList()}
        </Select>
      </TitleMain>
    </TitleWrapper>
  );
});

export default ChatInterfacesViewSingleActionExtraCodeTitle;