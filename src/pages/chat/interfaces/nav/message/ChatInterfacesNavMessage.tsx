import * as React from 'react';
import {
  List,
  Avatar,
} from 'antd';

import {
  MessageWrapper,
  MessageMain,
} from './style';
import { formatTime } from 'utils/utils';


export interface IChatInterfacesMessageProps { };

const ChatInterfacesMessage = React.memo((props: IChatInterfacesMessageProps) => {
  interface IData {
    id: number,
    avatar: string,
    title: string,
    description: string,
  };
  const dataSources: IData[] = [
    {
      id: 1,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      title: '前端群1',
      description: '小白: 今晚上群主直播...',
    },
    {
      id: 2,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      title: '前端群2',
      description: '新闻播报员: 微软发布新的编辑器...',
    },
    {
      id: 3,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      title: '小红',
      description: '灰灰: 晚上带你吃火锅...',
    },
    {
      id: 4,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      title: '楼下小黑',
      description: '老板: 你的快递...',
    },
    {
      id: 5,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      title: '老妈',
      description: '我到学校了...',
    },
    {
      id: 6,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      title: '老妈',
      description: '我到学校了...',
    },
    {
      id: 7,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      title: '老妈',
      description: '我到学校了...',
    },
    {
      id: 8,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      title: '老妈',
      description: '我到学校了...',
    },
    {
      id: 9,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      title: '老妈',
      description: '我到学校了...',
    },
    {
      id: 10,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      title: '老妈',
      description: '我到学校了...',
    },
  ];

  return (
    <MessageWrapper>
      <MessageMain>
        <List
          dataSource={dataSources}
          renderItem={(item: IData) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={
                  <Avatar src={item.avatar} />
                }
                title={item.title}
                description={item.description}
              />
              <div>{formatTime(Date.now())}</div>
            </List.Item>
          )}
        />
      </MessageMain>
    </MessageWrapper>
  );
});

export default ChatInterfacesMessage;