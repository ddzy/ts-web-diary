import * as React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ContentCarousel } from '../style';


export interface IMainCarouselProps {};


const MainCarousel: React.SFC<IMainCarouselProps> = (props: IMainCarouselProps): JSX.Element => {
  
  const initOption = (): object => {
    return {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      accessibility: false,
      arrow: false,
      autoplay: true,
      centerPadding: '100px',
    };
  }

  const initSlideContent = (): object[] => {
    const arr = [];
    const colorPick: string[] = ['#ff52e8', 'gold', 'lime', 'green', 'cyan', 'greekblue'];
    for(let i = 0; i < 5; i ++) {
      arr.push({
        id: i,
        text: `Page ${i}`,
      });
    }

    return arr.map((value) => {
      return (
        <div key={value.id}>
          <h3 style={{ height: '120px', backgroundColor: colorPick[value.id] }}>{value.text}</h3>
        </div>
      );
    });
  }

  return (
    <ContentCarousel>
      <Slider 
        {...initOption()}
      >{...initSlideContent()}</Slider>
    </ContentCarousel>
  );

}


export default MainCarousel;