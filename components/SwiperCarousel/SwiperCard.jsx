"use client";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const myLoader01 = ({ src, width, quality, placeholder }) => {
  return `https://cdn1.beams.co.jp/special/kids_summer_2024/assets/images/chapter_1/${src}?w=${width}?p=${placeholder}`;
};
const food01 = ({ src, width, quality, placeholder }) => {
  return `https://cdn1.beams.co.jp/special/kids_summer_2024/assets/images/chapter_1/${src}?w=${width}?p=${placeholder}`;
};
export default () => {
  // const sliderRef = useRef(null);
  // const handlePrev = useCallback(() => {
  //     if (!sliderRef.current) return;
  //     sliderRef.current.swiper.slidePrev();
  // }, []);

  // const handleNext = useCallback(() => {
  //     if (!sliderRef.current) return;
  //     sliderRef.current.swiper.slideNext();
  // }, []);

  return (
    <>
      <div className="  m-0 p-0">
        <Swiper
          // install Swiper modules

          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            500: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={1}
          className="m-0 p-0"
          navigation
          pagination={{ clickable: false }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          <SwiperSlide className=" w-full  ">
            <Card className="pb-4 border mx-2 bg-[#384038] p-0 m-0 shadow-none">
              <CardBody className="flex   flex-col relative px-0">
                {/* <div className="comments absolute right-1 top-1">
                  <div class="commemt commemt--2">
                    <div className="commemt__fukidashi \">
                      <Image
                        src="girl_1.png"
                        loader={myLoader01}
                        width={50}
                        height={50}
                      ></Image>
                    </div>

                    <div className="commemt__fukidashi top-[-40px] mt-[-50px] z-[99999]">
                      <Image
                        src="cap_1_2.svg"
                        loader={myLoader01}
                        width={150}
                        height={150}
                      ></Image>
                    </div>
                  </div>
                </div> */}
                <Image
                  loading="lazy"
                  alt="Card background"
                  className="rounded-xl"
                  src="item_1_2.jpg"
                  loader={myLoader01}
                  width={500}
                  height={300}
                />
                <div className="description bg-card-2 p-5">
                  <b className="text-black">Price: $250</b>
                  <p className="text-[12px] mb-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis, illum?
                  </p>
                  <Link
                    href="/BlogInner"
                    className="border border-black text-black p-2 text-[12px] font-bold rounded-[30px] w-[190px]"
                  >
                    BUY NOW
                  </Link>
                </div>
              </CardBody>
            </Card>
          </SwiperSlide>
          <SwiperSlide className=" w-full  ">
            <Card className="pb-4 border mx-2 bg-[#384038] p-0 m-0 shadow-none">
              <CardBody className="flex   flex-col relative px-0">
                {/* <div className="comments absolute right-1 top-1">
                  <div class="commemt commemt--2">
                    <div className="commemt__fukidashi \">
                      <Image
                        src="girl_1.png"
                        loader={myLoader01}
                        width={50}
                        height={50}
                      ></Image>
                    </div>

                    <div className="commemt__fukidashi top-[-40px] mt-[-50px] z-[99999]">
                      <Image
                        src="cap_1_2.svg"
                        loader={myLoader01}
                        width={150}
                        height={150}
                      ></Image>
                    </div>
                  </div>
                </div> */}
                <Image
                  loading="lazy"
                  alt="Card background"
                  className="rounded-xl"
                  src="item_1_2.jpg"
                  loader={myLoader01}
                  width={500}
                  height={300}
                />
                <div className="description bg-card-2 p-5">
                  <b className="text-black">Price: $250</b>
                  <p className="text-[12px] mb-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis, illum?
                  </p>
                  <Link
                    href="/BlogInner"
                    className="border border-black text-black p-2 text-[12px] font-bold rounded-[30px] w-[190px]"
                  >
                    BUY NOW
                  </Link>
                </div>
              </CardBody>
            </Card>
          </SwiperSlide>
          <SwiperSlide className=" w-full  ">
            <Card className="pb-4 border mx-2 bg-[#384038] p-0 m-0 shadow-none">
              <CardBody className="flex   flex-col relative px-0">
                {/* <div className="comments absolute right-1 top-1">
                  <div class="commemt commemt--2">
                    <div className="commemt__fukidashi \">
                      <Image
                        src="girl_1.png"
                        loader={myLoader01}
                        width={50}
                        height={50}
                      ></Image>
                    </div>

                    <div className="commemt__fukidashi top-[-40px] mt-[-50px] z-[99999]">
                      <Image
                        src="cap_1_2.svg"
                        loader={myLoader01}
                        width={150}
                        height={150}
                      ></Image>
                    </div>
                  </div>
                </div> */}
                <Image
                  loading="lazy"
                  alt="Card background"
                  className="rounded-xl"
                  src="item_1_2.jpg"
                  loader={myLoader01}
                  width={500}
                  height={300}
                />
                <div className="description bg-card-2 p-5">
                  <b className="text-black">Price: $250</b>
                  <p className="text-[12px] mb-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis, illum?
                  </p>
                  <Link
                    href="/BlogInner"
                    className="border border-black text-black p-2 text-[12px] font-bold rounded-[30px] w-[190px]"
                  >
                    BUY NOW
                  </Link>
                </div>
              </CardBody>
            </Card>
          </SwiperSlide>
          <SwiperSlide className=" w-full  ">
            <Card className="pb-4 border mx-2 bg-[#384038] p-0 m-0 shadow-none">
              <CardBody className="flex   flex-col relative px-0">
                {/* <div className="comments absolute right-1 top-1">
                  <div class="commemt commemt--2">
                    <div className="commemt__fukidashi \">
                      <Image
                        src="girl_1.png"
                        loader={myLoader01}
                        width={50}
                        height={50}
                      ></Image>
                    </div>

                    <div className="commemt__fukidashi top-[-40px] mt-[-50px] z-[99999]">
                      <Image
                        src="cap_1_2.svg"
                        loader={myLoader01}
                        width={150}
                        height={150}
                      ></Image>
                    </div>
                  </div>
                </div> */}
                <Image
                  loading="lazy"
                  alt="Card background"
                  className="rounded-xl"
                  src="item_1_2.jpg"
                  loader={myLoader01}
                  width={500}
                  height={300}
                />
                <div className="description bg-card-2 p-5">
                  <b className="text-black">Price: $250</b>
                  <p className="text-[12px] mb-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis, illum?
                  </p>
                  <Link
                    href="/BlogInner"
                    className="border border-black text-black p-2 text-[12px] font-bold rounded-[30px] w-[190px]"
                  >
                    BUY NOW
                  </Link>
                </div>
              </CardBody>
            </Card>
          </SwiperSlide>
          <SwiperSlide className=" w-full  ">
            <Card className="pb-4 border mx-2 bg-[#384038] p-0 m-0 shadow-none">
              <CardBody className="flex   flex-col relative px-0">
                {/* <div className="comments absolute right-1 top-1">
                  <div class="commemt commemt--2">
                    <div className="commemt__fukidashi \">
                      <Image
                        src="girl_1.png"
                        loader={myLoader01}
                        width={50}
                        height={50}
                      ></Image>
                    </div>

                    <div className="commemt__fukidashi top-[-40px] mt-[-50px] z-[99999]">
                      <Image
                        src="cap_1_2.svg"
                        loader={myLoader01}
                        width={150}
                        height={150}
                      ></Image>
                    </div>
                  </div>
                </div> */}
                <Image
                  loading="lazy"
                  alt="Card background"
                  className="rounded-xl"
                  src="item_1_2.jpg"
                  loader={myLoader01}
                  width={500}
                  height={300}
                />
                <div className="description bg-card-2 p-5">
                  <b className="text-black">Price: $250</b>
                  <p className="text-[12px] mb-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis, illum?
                  </p>
                  <Link
                    href="/BlogInner"
                    className="border border-black text-black p-2 text-[12px] font-bold rounded-[30px] w-[190px]"
                  >
                    BUY NOW
                  </Link>
                </div>
              </CardBody>
            </Card>
          </SwiperSlide>
          <SwiperSlide className=" w-full  ">
            <Card className="pb-4 border mx-2 bg-[#384038] p-0 m-0 shadow-none">
              <CardBody className="flex   flex-col relative px-0">
                {/* <div className="comments absolute right-1 top-1">
                  <div class="commemt commemt--2">
                    <div className="commemt__fukidashi \">
                      <Image
                        src="girl_1.png"
                        loader={myLoader01}
                        width={50}
                        height={50}
                      ></Image>
                    </div>

                    <div className="commemt__fukidashi top-[-40px] mt-[-50px] z-[99999]">
                      <Image
                        src="cap_1_2.svg"
                        loader={myLoader01}
                        width={150}
                        height={150}
                      ></Image>
                    </div>
                  </div>
                </div> */}
                <Image
                  loading="lazy"
                  alt="Card background"
                  className="rounded-xl"
                  src="item_1_2.jpg"
                  loader={myLoader01}
                  width={500}
                  height={300}
                />
                <div className="description bg-card-2 p-5">
                  <b className="text-black">Price: $250</b>
                  <p className="text-[12px] mb-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis, illum?
                  </p>
                  <Link
                    href="/BlogInner"
                    className="border border-black text-black p-2 text-[12px] font-bold rounded-[30px] w-[190px]"
                  >
                    BUY NOW
                  </Link>
                </div>
              </CardBody>
            </Card>
          </SwiperSlide>
          <SwiperSlide className=" w-full  ">
            <Card className="pb-4 border mx-2 bg-[#384038] p-0 m-0 shadow-none">
              <CardBody className="flex   flex-col relative px-0">
                {/* <div className="comments absolute right-1 top-1">
                  <div class="commemt commemt--2">
                    <div className="commemt__fukidashi \">
                      <Image
                        src="girl_1.png"
                        loader={myLoader01}
                        width={50}
                        height={50}
                      ></Image>
                    </div>

                    <div className="commemt__fukidashi top-[-40px] mt-[-50px] z-[99999]">
                      <Image
                        src="cap_1_2.svg"
                        loader={myLoader01}
                        width={150}
                        height={150}
                      ></Image>
                    </div>
                  </div>
                </div> */}
                <Image
                  loading="lazy"
                  alt="Card background"
                  className="rounded-xl"
                  src="item_1_2.jpg"
                  loader={myLoader01}
                  width={500}
                  height={300}
                />
                <div className="description bg-card-2 p-5">
                  <b className="text-black">Price: $250</b>
                  <p className="text-[12px] mb-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis, illum?
                  </p>
                  <Link
                    href="/BlogInner"
                    className="border border-black text-black p-2 text-[12px] font-bold rounded-[30px] w-[190px]"
                  >
                    BUY NOW
                  </Link>
                </div>
              </CardBody>
            </Card>
          </SwiperSlide>
        </Swiper>
        {/* <div className="prev-arrow" onClick={handlePrev} />
            <div className="next-arrow" onClick={handleNext} /> */}
      </div>
    </>
  );
};
