import * as React from 'react';
import {
  Empty,
} from 'antd';

import {
  AttentionContainer,
  AttentionMain,
} from './style';


export interface IUserMainContentAttentionProps { };


const UserMainContentAttention = React.memo<IUserMainContentAttentionProps>((
  props: IUserMainContentAttentionProps,
): JSX.Element => {
  /**
   * @description 初始化我的关注相关内容
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/14
   */
  function _initAttentionContent() {
    return (
      <Empty description="暂时没有关注..." />
    );
  }

  return (
    <AttentionContainer>
      <AttentionMain>
        {_initAttentionContent()}
      </AttentionMain>
    </AttentionContainer>
  );

});


export default UserMainContentAttention;