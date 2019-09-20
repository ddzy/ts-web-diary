import * as React from 'react';
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


export interface IBasePinItemContentProps { };
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
    const imgList = [
      {
        originUrl: 'https://user-gold-cdn.xitu.io/2019/9/19/16d492fbc834c612?w=4000&h=2402&f=jpeg&s=2875755',
        processedUrl: 'https://user-gold-cdn.xitu.io/2019/9/19/16d492fbc834c612?w=4000&h=2402&f=jpeg&s=2875755',
      },

    ];

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
                id="toggle"
              />
              {/* 纯文本内容部分 */}
              <ContentMainText ref={$showMoreDOM}>
                沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容

                <br />
                <br />

                沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容

                <br />
                <br />

                沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容

                <br />
                <br />

                沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容
              </ContentMainText>
              <ContentMainLabel htmlFor="toggle" />
            </ContentMainTextBox>

            {/* 图片内容部分 */}
            <ContentMainImageBox>
              <ContentMainImageList>
                {_initImageList()}
              </ContentMainImageList>
            </ContentMainImageBox>
          </Col>
        </Row>
      </ContentMain>
    </ContentWrapper>
  );
});

export default BasePinItemContent;