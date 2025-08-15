"use client";
import { Accordion, AccordionItem } from "@heroui/react";
import Link from "next/link";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { LinkPreview } from "@/components/ui/link-preview";
import Layout from "./Layout";

import ParallaxImage from "../components/ParallaxImage";
import { ReactLenis } from "@studio-freight/react-lenis";
import HeroSlider from "../components/HeroSlider/page";
import Marquee from "react-fast-marquee";

import { Carousel } from "../components/ui/carousel01";
export default function About() {
  const slideData = [
    {
      title: "誠境二期",

      src: "/images/JPOM9734.jpg",
    },
    {
      title: "誠境二期",

      src: "/images/烏日區五張犁西段474地號(誠境5)-完工實景照片10-1090219-S.jpg",
    },
    {
      title: "誠境二期",

      src: "/images/img002.png",
    },
    {
      title: "誠境二期",

      src: "https://www.hasegawa-kogyo.co.jp/lucano/img/sec_feature05.jpg",
    },
  ];
  return (
    <Layout>
      <div>
        <section className="banner flex justify-center ">
          <div className="relative w-full aspect-[16/7.5] overflow-hidden">
            <Image
              src="/images/JPOM9734.jpg"
              alt=""
              fill
              className="object-cover "
              placeholder="empty"
              loading="lazy"
            />
          </div>
        </section>
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* 文字在左（手機在上） */}
              <div className="order-2 lg:order-1 lg:pl-6 xl:pl-16">
                <div className="mt-2 lg:mt-0 2xl:p-12 lg:p-6 p-0">
                  <h2 className="text-[#201815] text-2xl sm:text-3xl lg:text-4xl font-semibold">
                    宜居
                  </h2>
                  <p className="mt-4 leading-relaxed text-sm sm:text-base text-[#20201f]">
                    宜家園邸，打造溫馨舒適的理想家園。宜園建設精心規劃，
                    融合自然綠意與現代設計，營造安心宜居的生活環境。
                    便利交通、完善機能，讓您盡享家的溫暖與美好。
                  </p>
                </div>
              </div>

              {/* 圖片在右（手機在下） */}
              <div className="order-1 lg:order-2">
                <div className="relative w-full aspect-[4/3] md:aspect-[3/2] lg:aspect-[4/3] overflow-hidden rounded-none">
                  <Image
                    src="/images/JPOM9734.jpg"
                    alt="宜家園邸 實景"
                    fill
                    className="object-cover object-center"
                    placeholder="empty"
                    loading="lazy"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* 圖片在左（手機在上） */}
              <div className="order-1 lg:order-1">
                <div className="relative w-full aspect-[4/3] md:aspect-[3/2] lg:aspect-[4/3] overflow-hidden rounded-none">
                  <Image
                    src="/images/JPOM9734.jpg"
                    alt="宜家園邸 實景"
                    fill
                    className="object-cover object-center"
                    placeholder="empty"
                    loading="lazy"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
              </div>

              {/* 文字在右（手機在下） */}
              <div className="order-2 lg:order-2 lg:pl-6 xl:pl-16">
                <div className="mt-2 lg:mt-0 2xl:p-12 lg:p-6 p-0">
                  <h2 className="text-[#201815] text-2xl sm:text-3xl lg:text-4xl font-semibold">
                    宜居
                  </h2>
                  <p className="mt-4 leading-relaxed text-sm sm:text-base text-[#20201f]">
                    宜家園邸，打造溫馨舒適的理想家園。宜園建設精心規劃，
                    融合自然綠意與現代設計，營造安心宜居的生活環境。
                    便利交通、完善機能，讓您盡享家的溫暖與美好。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Marquee>
          <div className="flex bg-white flex-row py-10 justify-center items-center">
            <div className="h-[1px] bg-black w-[50vw]"></div>
            <div className="flex flex-row justify-center items-center">
              <p className="text-[3rem] text-black mx-4">CONTACT</p>
              <button class="group relative mr-3 inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-neutral-950">
                <div class="transition duration-300 group-hover:rotate-[360deg]">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-neutral-200"
                  >
                    <path
                      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
            <div className="h-[1px] bg-black w-[50vw]"></div>
          </div>
        </Marquee>
        <div></div>
        <div className=" relative">
          <div className="title"></div>
          <div className="max-w-[1000px] mx-auto">
            <Accordion>
              <AccordionItem
                key="2"
                aria-label="怎麼預約看屋？需要準備什麼？"
                title={
                  <div className="flex md:flex-row flex-col items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span>怎麼預約看屋？需要準備什麼？</span>
                      <div className="bg-[#34894f] text-white rounded-full px-4   text-center">
                        QA
                      </div>
                    </div>
                    <div>
                      <span className=" text-gray-600 font-normal text-[.8rem]">
                        Latest Releases 2025-03-05
                      </span>
                    </div>
                  </div>
                }
              >
                <div className="flex  px-5 py-4 flex-col gap-2">
                  <div>
                    <b>您可以透過以下方式預約賞屋：</b>
                    <ul>
                      <li classname="!text-[.8rem] !mt-2">
                        ・線上預約表單：填寫聯絡方式與想看建案，我們將安排專人聯繫您。
                      </li>
                      <li classname="!text-[.8rem] !mt-2">
                        ・臉書或 LINE 官方帳號私訊我們，客服人員將協助預約。
                      </li>
                      <li classname="!text-[.8rem] !mt-2">
                        ・電話預約：撥打本公司專線，立即安排賞屋時段。
                      </li>
                    </ul>
                  </div>
                  <div className="mt-[30px]">
                    <b>看屋不需攜帶任何文件，如您已有購屋需求，建議準備：</b>
                    <ul>
                      <li classname="!text-[.8rem] !mt-2">
                        ・身分證影本（預約洽談時使用）
                      </li>
                      <li classname="!text-[.8rem] !mt-2">
                        ・銀行貸款試算資料（可現場協助評估）
                      </li>
                    </ul>
                  </div>
                </div>
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="購屋流程大概是怎樣的？"
                title={
                  <div className="flex md:flex-row flex-col items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span>購屋流程大概是怎樣的？</span>
                      <div className="bg-[#34894f] text-white rounded-full px-4   text-center">
                        QA
                      </div>
                    </div>
                    <div>
                      <span className=" text-gray-600 font-normal text-[.8rem]">
                        Latest Releases 2025-03-05
                      </span>
                    </div>
                  </div>
                }
              >
                <div className="flex  px-5 py-4 flex-col gap-2">
                  <b>購屋流程簡單明確，大致如下：</b>
                  <div>
                    <p className="text-[.8rem] tracking-widest mt-2">
                      (1) 賞屋參觀：安排看屋，了解格局、設備與環境。
                    </p>
                    <p className="text-[.8rem] tracking-widest mt-2">
                      (2) 挑選戶別：選定喜愛的戶型與樓層。
                    </p>
                    <p className="text-[.8rem] tracking-widest mt-2">
                      (3) 簽約訂購：支付訂金，簽訂購屋合約。
                    </p>
                    <p className="text-[.8rem] tracking-widest mt-2">
                      (4) 銀行貸款申請（如有需要）
                    </p>
                    <p className="text-[.8rem] tracking-widest mt-2">
                      (5) 簽立買賣契約：正式完成購屋程序。
                    </p>
                    <p className="text-[.8rem] tracking-widest mt-2">
                      (6) 驗屋交屋：建案完工後安排驗屋與交屋。
                    </p>
                  </div>
                </div>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="">
            <Link href="/news">
              <div className="flex group py-10 w-full sm:w-[85%] md:w-[70%] mx-auto justify-center md:justify-end items-center">
                <span className="text-[2rem] font-bold mr-3">更多消息</span>
                <button class="group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-neutral-950 font-medium text-neutral-200">
                  <div class="translate-x-0 transition group-hover:translate-x-[300%]">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                    >
                      <path
                        d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div class="absolute -translate-x-[300%] transition group-hover:translate-x-0">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                    >
                      <path
                        d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </button>
              </div>
            </Link>
          </div>
        </div>
        <div className="py-8 lg:flex-row bg-white flex-col flex">
          <div className=" w-full lg:w-1/2 ">
            <div className="relative h-[400px] sm:h-[50vh] lg:h-[70vh] 2xl:h-[65vh] overflow-hidden w-full">
              <Carousel slides={slideData} />
            </div>
          </div>
          <div className="w-full pl-[5%] lg:w-1/2 flex  pt-0 lg:pt-20  flex-col">
            <div className="flex flex-col ">
              <h2 className="text-[2.3rem]">建案基地</h2>
              <p className="w-[70%] text-gray-800 font-[.9rem] font-normal leading-relaxed">
                來體驗EDITORA的世界。請注意，展廳僅接受預約開放。<br></br>
                如果您有興趣，請發電子郵件給我們（ 訊息 ) 進行諮詢。
              </p>
            </div>
            <div className="flex flex-col mt-8 lg:mt-20">
              <b className="text-[.95rem]">◼︎ THE BUILDING PLACE</b>
              <span className="text-[.95rem] font-normal">台中市南屯區</span>
            </div>
            <div className="btn-wrap flex mt-10 lg:mt-20">
              <button class="group relative mr-5 inline-flex h-10 items-center justify-center overflow-hidden rounded-full border !bg-gray-800 border-neutral-200 bg-transparent px-4 text-neutral-100">
                <span class="relative inline-flex overflow-hidden">
                  <div class="absolute origin-bottom transition duration-500 [transform:translateX(-150%)_skewX(33deg)] group-hover:[transform:translateX(0)_skewX(0deg)]">
                    聯繫宜園
                  </div>
                  <div class="transition duration-500 [transform:translateX(0%)_skewX(0deg)] group-hover:[transform:translateX(150%)_skewX(33deg)]">
                    GOOGLE MAPS
                  </div>
                </span>
              </button>
              <button class="group relative  inline-flex h-10 items-center justify-center overflow-hidden rounded-full border !bg-gray-800 border-neutral-200 bg-transparent px-4 text-neutral-100">
                <span class="relative inline-flex overflow-hidden">
                  <div class="absolute origin-bottom transition duration-500 [transform:translateX(-150%)_skewX(33deg)] group-hover:[transform:translateX(0)_skewX(0deg)]">
                    您的需求
                  </div>
                  <div class="transition duration-500 [transform:translateX(0%)_skewX(0deg)] group-hover:[transform:translateX(150%)_skewX(33deg)]">
                    {" "}
                    Mail to Us
                  </div>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
const NavLeft = () => {
  return (
    <div className="flex items-center gap-6">
      <Link href="/about">
        <h1>About</h1>
      </Link>
      <Link href="/community">Community</Link>
      <Link href="/pricing">Pricing</Link>
      <Link href="/company">Company</Link>
    </div>
  );
};
const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children, href }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      className="relative block my-4 w-[240px] h-[43px] pt-1 overflow-hidden whitespace-nowrap text-[2.5rem] font-normal uppercase "
      style={{
        lineHeight: 0.75,
      }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-190%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block "
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute top-1 inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "200%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};
const IMG_PADDING = 12;

const TextParallaxContent = ({
  imgUrl,
  description,
  subheading,
  heading,
  children,
}) => {
  return (
    <div>
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy
          heading={heading}
          subheading={subheading}
          description={description}
        />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.99]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden "
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading, description }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-[200vh] px-[5%] sm:px-[8%] lg:px-[10%] 2xl:px-[15%]  flex-col pb-[50vh] items-start justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 text-white md:text-3xl">
        {subheading}
      </p>
      <p className="text-left  w-2/3 leading-relaxed text-white font-bold text-[3rem]">
        {heading}
      </p>
      <p className="w-2/3 xl:w-1/2  text-[1rem] text-white leading-loose mt-5">
        {description}
      </p>
    </motion.div>
  );
};
