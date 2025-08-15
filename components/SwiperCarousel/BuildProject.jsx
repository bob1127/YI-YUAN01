"use client";
import { Pagination, A11y } from "swiper/modules";
import { Card, CardBody } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
export default () => {
  return (
    <div className="w-full bg-white m-0 py-10">
      <Swiper
        modules={[Pagination, A11y]}
        spaceBetween={1}
        loop={true} // ✅ 啟用無限循環
        className="m-0 p-0"
        pagination={{ clickable: false }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide className="w-full bg-white pb-[40px]">
          <Link href="https://www.adholic.com.tw/yutayuanli/" target="_blank">
            <Card className="py-4 bg-white p-0 m-0 shadow-none">
              <CardBody className="flex pb-[30px] flex-col relative">
                <img
                  src="/images/project/1140520-聯播網探索廣告_1200x628.jpg"
                  alt="Card background"
                  loading="lazy"
                  decoding="async"
                  width="1500"
                  height="800"
                  className="max-w-[1000px] w-[90%] mx-auto object-cover"
                />
              </CardBody>
            </Card>
          </Link>
        </SwiperSlide>

        <SwiperSlide className="w-full bg-white pb-[40px]">
          <Link href="https://www.adholic.com.tw/yiqingyin/" target="_blank">
            {" "}
            <Card className="py-4 bg-white p-0 m-0 shadow-none">
              <CardBody className="flex pb-[30px] flex-col relative">
                <img
                  src="/images/project/1140520-聯播網探索廣告_1200x628_1.jpg"
                  alt="Card background"
                  loading="lazy"
                  decoding="async"
                  width="1500"
                  height="800"
                  className="max-w-[1000px] w-[90%] mx-auto object-cover"
                />
              </CardBody>
            </Card>
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
