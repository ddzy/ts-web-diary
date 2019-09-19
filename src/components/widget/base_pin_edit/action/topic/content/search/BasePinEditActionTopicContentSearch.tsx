import * as React from 'react';
import {
  Input,
} from 'antd';

import {
  SearchWrapper,
  SearchMain,
} from './style';


export interface IBasePinEditActionTopicContentSearchProps { };
export interface IBasePinEditActionTopicContentSearchState { }


const BasePinEditActionTopicContentSearch = React.memo((props: IBasePinEditActionTopicContentSearchProps) => {
  return (
    <SearchWrapper>
      <SearchMain>
        <Input.Search
          placeholder="搜索话题"
        />
      </SearchMain>
    </SearchWrapper>
  );
});

export default BasePinEditActionTopicContentSearch;