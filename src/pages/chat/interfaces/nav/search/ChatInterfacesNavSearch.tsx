import * as React from 'react';
import {
  Input,
  Popover,
} from 'antd';

import {
  SearchWrapper,
  SearchMain,
} from './style';


export interface IChatInterfacesSearchProps { };

const ChatInterfacesSearch = React.memo((props: IChatInterfacesSearchProps) => {
  return (
    <SearchWrapper>
      <SearchMain>
        <Popover
          content={'tab切换'}
          trigger={'focus'}
          placement={'bottom'}
        >
          <Input.Search
            placeholder={'搜索群聊/用户'}
          />
        </Popover>
      </SearchMain>
    </SearchWrapper>
  );
});

export default ChatInterfacesSearch;