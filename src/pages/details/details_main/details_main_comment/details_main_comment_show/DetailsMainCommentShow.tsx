import * as React from 'react';
import {
  Divider,
} from 'antd';
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';

import {
  ShowContainer,
  ShowList
} from './style';
import { isArray } from 'src/utils/utils';
import DetailsMainCommentsShowItem from './details_main_comment_show_item/DetailsMainCommentShowItem';
import {
  ISendReplyParams,
  IStaticArticleInfoCommentsOptions,
} from '../../../Details.service';


export interface IDetailsMainCommentShowProps {
  comments: IStaticArticleInfoCommentsOptions[];
  useravatar: string;
  onSendReply: (
    inputEl: HTMLElement,
    v: ISendReplyParams,
  ) => void;
};


const DetailsMainCommentShow = React.memo<IDetailsMainCommentShowProps>((
  props: IDetailsMainCommentShowProps,
): JSX.Element => {

  /**
   * 初始化评论列表
   */
  function initCommentListItem(): JSX.Element[] | [] {
    const comments = props.comments;

    return isArray(comments)
      && comments.length !== 0
      ? comments.map((item) => {
        return (
          <CSSTransition
            key={item._id}
            classNames="fadeTranslateZ"
            timeout={1500}
          >
            <React.Fragment>
              <DetailsMainCommentsShowItem
                {...item}
                singleCommentInfo={item}
                currentMainUserAvatar={props.useravatar}
                onSend={props.onSendReply}
              />
              <Divider />
            </React.Fragment>
          </CSSTransition>
        );
      })
      : [];
  }

  return (
    <ShowContainer>
      <ShowList>
        {/* {initCommentListItem()} */}
        <TransitionGroup>
          {initCommentListItem()}
        </TransitionGroup>
      </ShowList>
    </ShowContainer>
  );
});


export default DetailsMainCommentShow;