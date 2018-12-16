import * as React from 'react';
import {
  Input,
} from 'antd';

import {
  SearchWrapper,
  SearchMain,
  SearchMainInput,
} from './style';


export interface IHeaderMainSearchProps { };


const HeaderMainSearch: React.SFC<IHeaderMainSearchProps> = (
  props: IHeaderMainSearchProps,
): JSX.Element => {

  return (
    <SearchWrapper>
      <SearchMain>
        <SearchMainInput>
          <Input.Search
            size="large"
            placeholder={`搜索您想要的内容...`}
            enterButton
          />
        </SearchMainInput>
      </SearchMain>
    </SearchWrapper>
  );
}

export default HeaderMainSearch;