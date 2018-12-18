import * as React from 'react';
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
import {
  MERGED_ARTICLE_TAG,
} from '../../../../constants/constants';


export interface IHeaderMainSearchProps {
  searchedArticles: any;
  hotTags: object;
  onSearch: (
    e: any,
  ) => void;
};


const HeaderMainSearch: React.SFC<IHeaderMainSearchProps> = (
  props: IHeaderMainSearchProps,
): JSX.Element => {

  const [
    state,
    setState,
  ] = React.useState({
    isInputEmpty: false,
  });
  const emitChangeDebounced = debounce(emitChange, 400);

  /**
   * 处理初始化popcontent
   */
  function handleInitPopContent(): JSX.Element {
    // ??? 输入框为空 -> 热门标签
    // ??? 输入框不为空 -> 搜索结果
    const { isInputEmpty } = state;

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
        {props.searchedArticles.map((hot: any, i: number) => (
          <PopContentListItem
            key={i}
            data-id={hot._id}
          >{hot.title}</PopContentListItem>
        ))}
      </PopContentList>
    );

    return isInputEmpty
      ? emptyContent
      : unEmptyContent;
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
    setState({ isInputEmpty: false });
    props.onSearch(e);
  }

  /**
   * 处理是否显示热门标签
   */
  function handleFocus(e: any): void {
    const v: string = e.target.value;

    if (!v) {
      setState({ isInputEmpty: true });
    }
  }

  return (
    <SearchWrapper>
      <SearchMain>
        <SearchMainInput>
          <Popover
            title={`大家都在搜`}
            placement="bottom"
            trigger="focus"
            content={
              <PopContentBox>
                {handleInitPopContent()}
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
}

export default HeaderMainSearch;