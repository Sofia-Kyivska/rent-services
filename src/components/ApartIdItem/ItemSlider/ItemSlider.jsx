"use client";
import React, { useState, useEffect, useMemo } from "react";
import { v4 } from "uuid";
import { CldImage } from "next-cloudinary";
import styles from "./ItemSlider.module.scss";

import seoStyles from "@/app/seoStyles.module.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import {
  Navigation,
  Pagination,
  Keyboard,
  Thumbs,
  FreeMode,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ItemSliderTop.css";


const ItemSlider = ({ dataId, customClass }) => {
  const [item, setItem] = useState([]);

  const images = dataId?.imgs;

  const allImages = useMemo(
    () => [dataId?.titleImg, ...images],
    [dataId, images]
  );

  useEffect(() => {
    setItem(
      allImages.map((el, i) => {
        const imgLoading = i === 0 ? "eager" : "lazy";
        const imgPriority = i === 0 ? true : false;
       
        return (
          <SwiperSlide key={v4()}>
            <CldImage
              src={el}
              alt="Flat image"
              fill={true}
              loading={imgLoading}
              sizes="(max-width: 1365px) 90vw, 1222px"
              priority={imgPriority}
            />
            <p className="price">{dataId.price} ₴</p>
          </SwiperSlide>
        );
      })
    );
  }, [allImages]);


  return (
    <article className={`${styles.swiperContainer} ${customClass}`}>
      <h4 className={seoStyles.titleHidden}>
        Detailed images of the apartment
      </h4>

      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        keyboard={{
          enabled: true,
        }}
        modules={[FreeMode, Navigation, Pagination, Thumbs, Keyboard]}
        className="ItemSliderTop"
      >
        {item}
      </Swiper>
    </article>
  );
};


export default ItemSlider;