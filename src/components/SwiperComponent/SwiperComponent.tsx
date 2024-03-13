import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface SwiperComponentProps {
  children: React.ReactNode;
}

const SwiperComponent: React.FC<SwiperComponentProps> = ({ children }) => {
  return (
    <Swiper
      slidesPerView={2.7}
      style={{ padding: "0 0 46px 16px" }}
      centeredSlides={false}
      spaceBetween={15}
      grabCursor={true}
      className='mySwiper'
    >
      {React.Children.map(children, (child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;
