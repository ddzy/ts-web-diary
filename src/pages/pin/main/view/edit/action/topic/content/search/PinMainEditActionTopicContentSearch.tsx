import * as React from 'react';
import {
  Input,
} from 'antd';

import {
  SearchWrapper,
  SearchMain,
} from './style';


export interface IPinMainEditActionTopicContentSearchProps { };
export interface IPinMainEditActionTopicContentSearchState { }


const PinMainEditActionTopicContentSearch = React.memo((props: IPinMainEditActionTopicContentSearchProps) => {
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

export default PinMainEditActionTopicContentSearch;