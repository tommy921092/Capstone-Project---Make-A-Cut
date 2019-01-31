import React from 'react';
import { Divider } from "semantic-ui-react";
import { CarouselProvider, Image, Slide, Slider } from "pure-react-carousel";

import CustomDotGroup from '../../components/CustomDotGroup';

const ImageCarousel = (props) => (
  <CarouselProvider
    naturalSlideWidth={1}
    naturalSlideHeight={1}
    totalSlides={props.photoArray ? props.photoArray.length : 0}
  >
    <Slider>
      {props.photoArray[0] !== "" ? <Slide tag="a" index={0}>
        <Image src={`http://localhost:6060/img/upload/${props.photoArray[0]}`} />
      </Slide> : null}
      {props.photoArray[1] ? <Slide tag="a" index={1}>
        <Image src={`http://localhost:6060/img/upload/${props.photoArray[1]}`} />
      </Slide> : null}
      {props.photoArray[2] ? <Slide tag="a" index={2}>
        <Image src={`http://localhost:6060/img/upload/${props.photoArray[2]}`} />
      </Slide> : null}
    </Slider>

    <Divider />
    <CustomDotGroup slides={props.photoArray ? props.photoArray.length : 0} />
  </CarouselProvider>
);

export default ImageCarousel;


