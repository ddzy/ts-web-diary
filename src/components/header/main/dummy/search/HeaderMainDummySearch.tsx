import * as React from 'react';
import {
  Link,
} from 'react-router-dom';
import {
  Popover,
  Input,
  Tag,
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
  PopContentListSpan,
} from './style';
import { MERGED_ARTICLE_TAG } from 'constants/constants';
import { query } from "services/request";


export interface IHeaderMainDummySearchProps {
};
export interface IHeaderMainDummySearchState {
  // ? 搜索框是否为空, 用来决定popover显示`热门标签`或`搜索到的文章`
  isInputEmpty: boolean;
  // ? popover显示的标题, 依赖于`isInputEmpty`的值
  popoverTitle: string;
  // ? 搜索到的文章
  // TODO 类型定义
  searchedArticles: any[];
};


const HeaderMainDummySearch = React.memo<IHeaderMainDummySearchProps>((
  props: IHeaderMainDummySearchProps,
): JSX.Element => {
  const [
    state,
    setState,
  ] = React.useState<IHeaderMainDummySearchState>({
    isInputEmpty: false,
    popoverTitle: '',
    searchedArticles: [],
  });
  const emitChangeDebounced = debounce(emitChange, 400);

  /**
   * 初始化 - popover的显示内容
   */
  function _initPopoverContent(): JSX.Element {
    // ??? 输入框为空 -> 热门标签
    // ??? 输入框不为空 -> 搜索结果
    const {
      isInputEmpty,
      searchedArticles,
    } = state;

    const emptyContent: JSX.Element = (
      <React.Fragment>
        {Object.keys(MERGED_ARTICLE_TAG).map((key: string, i: number) => (
          <PopContentListSpan key={i}>
            <Tag
              color={MERGED_ARTICLE_TAG[key]}
            >{key}</Tag>
          </PopContentListSpan>
        ))}
      </React.Fragment>
    );
    const unEmptyContent: JSX.Element = (
      <PopContentList>
        {searchedArticles.map((hot: any, i: number) => (
          <PopContentListItem
            key={i}
          >
            <Link to={`/details/${hot._id}`}>{hot.title}🎉🎉🎉</Link>
          </PopContentListItem>
        ))}
      </PopContentList>
    );

    return isInputEmpty
      ? emptyContent
      : unEmptyContent;
  }

  /**
   * 处理 - 搜索框输入
   */
  function handleChange(e: React.ChangeEvent): void {
    e.persist();
    emitChangeDebounced(e);
  }

  function emitChange(
    e: React.ChangeEvent,
  ): void {
    const event = e as React.ChangeEvent;
    const target = event.target as HTMLInputElement;

    // ? 后台 - 根据关键词查询文章
    query({
      method: 'GET',
      data: {
        keyword: target.value,
        userId: localStorage.getItem('userid'),
      },
      jsonp: false,
      url: '/api/article/search/input/list',
    }).then((res) => {
      setState({
        ...state,
        searchedArticles: res.data,
        isInputEmpty: false,
        popoverTitle: '搜索到的文章'
      });
    });
  }

  /**
   * 处理 - 是否显示热门标签
   */
  function handleFocus(
    e: React.FocusEvent,
  ): void {
    const event = e as React.FocusEvent;
    const target = event.target as HTMLInputElement;
    const value = target.value;

    if (!value) {
      setState({
        ...state,
        isInputEmpty: true,
        popoverTitle: '热门标签',
      });
    }
  }

  return (
    <SearchWrapper>
      <SearchMain>
        <SearchMainInput>
          <Popover
            title={state.popoverTitle}
            placement="bottom"
            trigger="focus"
            content={
              <PopContentBox>
                {_initPopoverContent()}
              </PopContentBox>
            }
          >
            <Input.Search
              size="large"
              placeholder={`搜索您想要的文章...`}
              enterButton
              onChange={handleChange}
              onFocus={handleFocus}
            />
          </Popover>
        </SearchMainInput>
      </SearchMain>
    </SearchWrapper>
  );
});

export default HeaderMainDummySearch;