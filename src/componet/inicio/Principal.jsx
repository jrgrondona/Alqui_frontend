import React from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const items = [
  {
    src: "https://bancomparamx-static-2.s3.amazonaws.com/images/tmptmp6hci28ln.2e16d0ba.fill-800x450.jpg",
    altText: "Slide 1",
    caption: "Casas"
  },
  {
    src: "https://www.radiocamacua.uy/wp-content/uploads/2018/09/alquiler.jpg",
    altText: "Slide 2",
    caption: "Departamentos"
  },
  {
    src: "https://1.bp.blogspot.com/-Z0990VnMsIY/XwTbW5Xw1-I/AAAAAAAAASU/s-B8wdtD-7A-zDMzrsW9jnZL6GOTUOoLgCLcBGAsYHQ/s1600/llaves.jpg",
    altText: "Slide 3",
    caption: "Comodo y amplio"
  }
];
export function Principal(props){
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map(item => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} width="100%" height="500px"/>
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });
  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
}