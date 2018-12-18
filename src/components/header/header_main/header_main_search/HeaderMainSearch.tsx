import * as React from 'react';
import {
  Popover,
  Input,
} from 'antd';
import {
  debounce,
} from 'lodash';

import {
  SearchWrapper,
  SearchMain,
  SearchMainInput,
  PopContentBox,
  PopContentList,
  PopContentListItem,
} from './style';


export interface IHeaderMainSearchProps {
  searchedArticles: any;
  onSearch: (
    e: any,
  ) => void;
};


const HeaderMainSearch: React.SFC<IHeaderMainSearchProps> = (
  props: IHeaderMainSearchProps,
): JSX.Element => {

  const emitChangeDebounced = debounce(emitChange, 400);

  /**
   * 处理初始化热搜popover-content
   */
  function handleInitPopContent(): JSX.Element[] {
    return props.searchedArticles.map((hot: any, i: number) => (
      <PopContentListItem
        key={i}
        data-id={hot._id}
      >{hot.title}</PopContentListItem>
    ));
  }

  /**
   * 处理搜索框输入
   */
  function handleChange(e: React.ChangeEvent): void {
    e.persist();
    emitChangeDebounced(e);
  }

  function emitChange(
    e: any,
  ): void {
    props.onSearch(e);
  }

  return (
    <SearchWrapper>
      <SearchMain>
        <SearchMainInput>
          <Popover
            title={`文章热搜榜`}
            placement="bottom"
            trigger="focus"
            content={
              <PopContentBox>
                <PopContentList>
                  {handleInitPopContent()}
                </PopContentList>
              </PopContentBox>
            }
          >
            <Input.Search
              size="large"
              placeholder={`搜索您想要的文章...`}
              enterButton
              onChange={handleChange}
            />
          </Popover>
        </SearchMainInput>
      </SearchMain>
    </SearchWrapper>
  );
}

export default HeaderMainSearch;