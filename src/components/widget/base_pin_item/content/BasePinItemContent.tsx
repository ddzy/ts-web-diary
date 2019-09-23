import * as React from 'react';
import RcViewer from '@hanyk/rc-viewer';
import {
  Row,
  Col,
} from 'antd';

import {
  ContentWrapper,
  ContentMain,
  ContentMainTextBox,
  ContentMainInput,
  ContentMainText,
  ContentMainLabel,
  ContentMainImageBox,
  ContentMainImageList,
  ContentMainImageItem,
  ContentMainImage,
} from './style';
import {
  ICommonBasePinItemInfo,
} from '../BasePinItem.types';


export interface IBasePinItemContentProps {
  // ? 沸点相关信息
  pinInfo: Pick<ICommonBasePinItemInfo, '_id' | 'content_plain' | 'content_image' | 'content_link'>;
};
export interface IBasePinItemContentState { }


const BasePinItemContent = React.memo((props: IBasePinItemContentProps) => {

  const $showMoreDOM = React.useRef<HTMLParagraphElement>(
    document.createElement('p'),
  );

  React.useEffect(() => {
    handleTruncate();
  }, []);


  /**
   * [初始化] - 沸点的图片列表
   */
  function _initImageList() {
    const imgList = props.pinInfo.content_image;

    return imgList.map((v, i) => {
      return (
        <ContentMainImageItem key={i}>
          <ContentMainImage
            src={v.processedUrl}
            data-src={v.originUrl}
          />
        </ContentMainImageItem>
      );
    });
  }

  /**
   * [初始化] - 文本内容
   * @description 如果不作初始化, `scrollHeight`会永远等于`clientHeight`, 导致无法进行文本溢出判断
   */
  function _initPlainText() {
    const sText = props.pinInfo.content_plain;
    const regDivTag = /(<div>)(?!<br>)|(<\/div>)/g;

    return sText.replace(regDivTag, (_, $1, $2) => {
      return '';
    });
  }

  /**
   * [处理] - 文本截断
   * @description 文本内容行数大于指定值时, 进行文本截断
   */
  function handleTruncate() {
    const oParagraphDOM = $showMoreDOM.current;

    oParagraphDOM.classList[
      oParagraphDOM.scrollHeight > oParagraphDOM.clientHeight ? "add" : "remove"
    ]("is-truncated");
  }

  return (
    <ContentWrapper>
      <ContentMain>
        <Row gutter={40}>
          <Col span={1} />
          <Col span={21}>
            <ContentMainTextBox>
              <ContentMainInput
                type="checkbox"
                name="toggle"
                id={props.pinInfo._id}
              />
              {/* 纯文本内容部分 */}
              <ContentMainText ref={$showMoreDOM}
                dangerouslySetInnerHTML={{
                  __html: _initPlainText()
                }}
              />
              <ContentMainLabel htmlFor={props.pinInfo._id} />
            </ContentMainTextBox>

            {/* 图片内容部分 */}
            <ContentMainImageBox>
              <ContentMainImageList>
                <RcViewer
                  options={{
                    url: 'data-src',
                    button: false,
                  }}
                >
                  {_initImageList()}
                </RcViewer>
              </ContentMainImageList>
            </ContentMainImageBox>
          </Col>
        </Row>
      </ContentMain>
    </ContentWrapper>
  );
});

export default BasePinItemContent;