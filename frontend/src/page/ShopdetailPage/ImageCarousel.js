import React from 'react';
import { Divider } from "semantic-ui-react";
import { CarouselProvider, Image, Slide, Slider } from "pure-react-carousel";

import CustomDotGroup from '../../components/CustomDotGroup';

const ImageCarousel = () => (
    <CarouselProvider
      naturalSlideWidth={1}
      naturalSlideHeight={1}
      totalSlides={3}
    >
      <Slider>
        <Slide tag="a" index={0}>
          <Image src="https://imgbp.hotp.jp/CSP/IMG_SRC_K/15/54/C012171554/C012171554_419-314.jpg" />
        </Slide>
        <Slide tag="a" index={1}>
          <Image src="https://imgbp.hotp.jp/CSP/IMG_SRC_K/33/62/C012173362/C012173362_219-164.jpg" />
        </Slide>
        <Slide tag="a" index={2}>
          <Image src="https://imgbp.hotp.jp/CSP/IMG_SRC_K/67/77/C012196777/C012196777_219-164.jpg" />
        </Slide>
      </Slider>
  
      <Divider />
      <CustomDotGroup slides={3} />
    </CarouselProvider>
  );
  
  export default ImageCarousel;
  

