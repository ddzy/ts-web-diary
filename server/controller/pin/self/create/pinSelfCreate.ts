import * as Router from 'koa-router';
import * as UUID from 'uuid';

import {
  Pin,
  User,
  Topic,
  ITrackCreatePinProps,
} from '../../../../model/model';
import { FILTER_SENSITIVE } from '../../../../constants/constants';


const pinSelfCreateController = new Router();


/**
 * [创建] - 新的沸点
 */
pinSelfCreateController.post('/', async (ctx) => {
  interface IRequestParams {
    pinInfo: {
      plainContent: string,
      imageContent: Array<{
        originUrl: string,
        processedUrl: string,
      }>,
      linkContent: {
        title: string,
        domain: string,
        coverImgUrl: string,
      },
      topic: string,
    };
    userId: string;
    trackType: string;
  };

  const {
    pinInfo,
    userId,
    trackType,
  } = ctx.request.body as IRequestParams;

  try {
    // ? 创建新的沸点
    const createdPin = await Pin.create({
      author_id: userId,
      topic_id: pinInfo.topic,
      content_plain: pinInfo.plainContent,
      content_image: JSON.stringify(pinInfo.imageContent),
      content_link: JSON.stringify(pinInfo.linkContent),
      comments: [],
      create_time: Date.now(),
      update_time: Date.now(),
    });

    // ? 创建新的用户足迹
    const createdTrack: ITrackCreatePinProps = {
      _id: UUID.v1(),
      type: trackType,
      pin: String(createdPin._id),
      create_time: Date.now(),
      update_time: Date.now(),
    };

    // ? 更新用户的相关信息
    await User.findByIdAndUpdate(
      userId,
      {
        '$push': {
          pins: createdPin,
          tracks: createdTrack,
        },
      },
    );

    // ? 更新所属话题的沸点列表 & 参与者列表
    await Topic.findByIdAndUpdate(
      pinInfo.topic,
      {
        '$push': {
          pins: createdPin,
        },
        '$addToSet': {
          actors: userId,
        },
      },
    );

    // ? 查询创建的沸点
    const foundPin = await Pin
      .findById(createdPin._id, { ...FILTER_SENSITIVE })
      .populate([
        {
          path: 'author_id',
          select: ['_id', 'username', 'useravatar', 'introduction'],
        },
        {
          path: 'topic_id',
          select: ['_id', 'name'],
        },
      ])
      .lean();

    ctx.body = {
      code: 0,
      message: '沸点发送成功!',
      data: {
        pinInfo: {
          ...foundPin,
          content_image: JSON.parse(foundPin.content_image),
          content_link: JSON.parse(foundPin.content_link),
          user_is_friend: false,
          user_is_current_author: true,
          user_is_attention: false,
          comment_total: 0,
        },
      },
    };
  } catch (error) {
    ctx.body = {
      code: -1,
      message: '后端出现错误, 请稍后重试!',
      data: {
        errorInfo: error,
      },
    };
  }
});

export default pinSelfCreateController;