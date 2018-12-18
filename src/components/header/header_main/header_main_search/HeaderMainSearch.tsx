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
    const hotSearchArr: string[] = [
      'Eruda 一个被人遗忘的调试神器',
      '结合 Google quicklink，react 项目实现页面秒开',
      'React 实战：设计模式和最佳实践',
      '你（可能）不知道的web api',
      '关于依赖注入（typescript）',
    ];

    return hotSearchArr.map((hot, i) => (
      <PopContentListItem
        key={i}
      >{hot}🎉</PopContentListItem>
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