import * as React from 'react';
import {
  Input,
} from 'antd';

import {
  SearchWrapper,
  SearchMain,
} from './style';
import { debounce } from 'utils/utils';


export interface IBasePinEditActionTopicContentSearchProps {
  onTopicSearch: (
    keyword: string,
  ) => void;
};
export interface IBasePinEditActionTopicContentSearchState { }


const BasePinEditActionTopicContentSearch = React.memo((props: IBasePinEditActionTopicContentSearchProps) => {
  const emitChangeDebounced = debounce(handleEmitChange, 400);


  /**
   * [处理] - 搜索话题
   */
  function handleChange(e: React.ChangeEvent): void {
    e.persist();
    emitChangeDebounced(e);
  }

  /**
   * [处理] - 节流后的搜索
   */
  function handleEmitChange(
    e: React.ChangeEvent,
  ) {
    const oEvent = e as React.ChangeEvent;
    const oInputDOM = oEvent.target as HTMLInputElement;
    const sInputValue = oInputDOM.value;

    props.onTopicSearch(sInputValue);
  }

  return (
    <SearchWrapper>
      <SearchMain>
        <Input.Search
          placeholder="搜索话题"
          onChange={handleChange}
        />
      </SearchMain>
    </SearchWrapper>
  );
});

export default BasePinEditActionTopicContentSearch;