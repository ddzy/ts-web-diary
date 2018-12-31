import * as React from 'react';
import {
  Divider,
} from 'antd';

import {
  ShowContainer,
  ShowList
} from './style';
import { isArray } from 'src/utils/utils';
import CommentListItem from '../details_main_comment_list_item/CommentListItem';


export interface IDetailsMainCommentShowProps {
  comments: any[];
  useravatar: string;
  onSendReply: (
    inputEl: HTMLElement,
    v: any,
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
          <React.Fragment key={item._id}>
            <CommentListItem
              {...item}
              currentMainUserAvatar={props.useravatar}
              onSend={props.onSendReply}
            />
            <Divider />
          </React.Fragment>
        );
      })
      : [];
  }

  return (
    <ShowContainer>
      <ShowList>
        {initCommentListItem()}
      </ShowList>
    </ShowContainer>
  );
});


export default DetailsMainCommentShow;