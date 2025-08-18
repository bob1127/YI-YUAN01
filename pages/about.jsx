"use client";
import { Accordion, AccordionItem } from "@heroui/react";
import Link from "next/link";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { LinkPreview } from "@/components/ui/link-preview";
import Layout from "./Layout";
import Head from "next/head";
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
  const handleScroll = () => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const target = document.querySelector("#next-section");
    const targetY = target
      ? window.scrollY + (target.getBoundingClientRect().top || 0)
      : window.scrollY + window.innerHeight * 0.9;

    if (prefersReduced) {
      window.scrollTo({ top: targetY, behavior: "auto" });
      return;
    }

    const startY = window.scrollY;
    const distance = Math.max(0, targetY - startY);

    const DURATION_MS = 1400; // 總時長，可調：1200~1800 都很順
    const start = performance.now();

    // 極慢→很快（指數型加速）
    const easeInExpo = (t) => (t === 0 ? 0 : Math.pow(2, 10 * (t - 1)));
    // 若想再更猛：把 10 改成 12~14

    const step = (now) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / DURATION_MS);
      const eased = easeInExpo(t);
      window.scrollTo(0, startY + distance * eased);

      if (t < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  return (
    <Layout>
      <Head>
        <title>宜園建設TRUE ARCH 實在的構築</title>
      </Head>
      <div className="overflow-hidden">
        <section className="section-hero-title  aspect-[16/16] sm:aspect-[16/12]  md:aspect-[16/6.5] overflow-hidden mt-14 w-full relative">
          <div className="main-title absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
            {/* <Image
            src="/"
            className="max-w-[600px]"
            placeholder="empty"
            loading="lazy"
            width={1000}
            height={500}
          ></Image> */}
            <h1 className=" text-3xl text-center font-light sm:text-4xl 2xl:text-6xl text-white">
              建築思維 ABOUT
            </h1>
          </div>
          <div className="mask bg-black/20 w-full h-full top-0 left-0 absolute z-30"></div>

          <Image
            src="/images/project/pexels-may-abeki-1238188510-24033295.tif"
            alt="banner"
            fill
            placeholder="empty"
            loading="lazy"
            className="object-cover object-center sm:object-right md:object-[80%_center]"
          />

          {/* Scroll Down 動作入口（整塊可點） */}
          <motion.button
            type="button"
            onClick={handleScroll}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center z-30 cursor-pointer select-none"
            aria-label="Scroll down"
          >
            {/* 豎線底軌 */}
            <div className="w-px h-16 bg-white/40 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-px h-full bg-white animate-scroll-line" />
            </div>

            {/* 箭頭 */}
            <svg
              className="w-6 h-6 text-white mt-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>

            {/* 文字 */}
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-white text-sm mt-1"
            >
              Down
            </motion.span>
          </motion.button>

          {/* 自訂 keyframes（豎線跑動） */}
          <style jsx global>{`
            @keyframes scroll-line {
              0% {
                transform: translateY(-100%);
              }
              100% {
                transform: translateY(100%);
              }
            }
            .animate-scroll-line {
              animation: scroll-line 2.8s linear infinite; /* 放慢線條速度 */
            }
          `}</style>
        </section>
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-[1920px]  w-[90%] md:w-[80%] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* 文字在左（手機在上） */}
              <div className="order-2 lg:order-1 lg:pl-6 xl:pl-16">
                <div className="mt-2 lg:mt-0 2xl:p-12 lg:p-6 p-0">
                  <div className="flex  items-center">
                    <Image
                      src="/images/about/text02.png"
                      alt="text"
                      className="max-w-[450px] w-[130px]"
                      placeholder="empty"
                      loading="lazy"
                      width={450}
                      height={450}
                    ></Image>
                    <div className="flex ml-3 flex-col">
                      <h2 className="text-[#201815] text-2xl sm:text-3xl lg:text-4xl font-extrabold">
                        宜情
                      </h2>
                      <h2 className="text-[#201815] text-2xl sm:text-3xl lg:text-4xl font-extrabold">
                        ENDER
                      </h2>
                      <span className="mt-3 text-[14px] text-gray-700 font-normal">
                        溫柔的與土同根
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 tracking-widest !leading-8 xl:!leading-10  max-w-[500px] text-sm sm:text-base text-[#20201f]">
                    有飛鳥來過，有蟲草共生在此<br></br>{" "}
                    再大的城市，都是大地的產物
                    <br></br>
                    溫柔善待每一塊與土地的緣分<br></br>
                    讓建築情牽自然與文明，構築情感的棲居
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
        <section className="py-16 relative   md:h-[768px] h-[550px] xl:h-[900px] sm:py-20 bg-[url('https://images.pexels.com/photos/1000057/pexels-photo-1000057.jpeg')] bg-cover bg-center bg-no-repeat">
          <div className="mask w-full h-full absolute top-0 left-0 z-20 bg-black/50"></div>
          <div className="mx-auto max-w-[1920px] flex items-center !h-full relative z-50  w-[80%] px-4 sm:px-6 lg:px-8">
            <div className="w-full flex lg:flex-row flex-col">
              <div className="order-1 w-full lg:w-1/2 lg:order-2"></div>
              {/* 文字在左（手機在上） */}
              <div className="order-2 w-full lg:w-1/2">
                <div className="mt-2 lg:mt-0 flex flex-col items-center justify-center  h-full 2xl:p-12 lg:p-6 p-0">
                  <div className="flex  items-center">
                    <Image
                      src="/images/about/text-white.png"
                      alt="text"
                      className="max-w-[450px] w-[110px] sm:w-[130px]"
                      placeholder="empty"
                      loading="lazy"
                      width={450}
                      height={450}
                    ></Image>
                    <div className="flex ml-3 flex-col">
                      <h2 className="text-[#ffffff] text-2xl sm:text-3xl lg:text-4xl font-extrabold">
                        宜安
                      </h2>
                      <h2 className="text-[#ffffff] text-2xl sm:text-3xl lg:text-4xl font-extrabold">
                        ICH
                      </h2>
                      <span className="mt-3 text-[14px] text-gray-50 font-normal">
                        構築心靈的沃土
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 tracking-widest !leading-8 xl:!leading-10  max-w-[500px] text-sm sm:text-base text-[#efefef]">
                    無論幾歲，故鄉都是雙眸畢生的回望<br></br>
                    我們致力打造「以家為鄉」的當代里仁情感<br></br>
                    既嶄新卻又令人懷念的建築溫度 <br></br>
                    從最真切的量身思維與設想中啟程
                    <br></br>
                    「歡迎回鄉！」是宜園建築的美好信念{" "}
                  </p>
                </div>
              </div>

              {/* 圖片在右（手機在下） */}
            </div>
          </div>
        </section>
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-[1920px] w-[90%] md:w-[80%] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* 圖片在左（手機在上） */}

              {/* 文字在右（手機在下） */}
              <div className="order-2 lg:order-1 lg:pl-6 xl:pl-16">
                <div className="mt-2 lg:mt-0 2xl:p-12 lg:p-6 p-0">
                  <div className="flex  items-center">
                    <img
                      src="/images/about/text06.png "
                      alt="text"
                      className="max-w-[450px] w-[110px] sm:w-[140px]"
                      placeholder="empty"
                      loading="lazy"
                      width={450}
                      height={450}
                    ></img>
                    <div className="flex ml-3 flex-col">
                      <h2 className="text-[#201815] text-2xl sm:text-3xl lg:text-4xl font-extrabold">
                        宜居
                      </h2>
                      <h2 className="text-[#201815] text-2xl sm:text-3xl lg:text-4xl font-extrabold">
                        NIQUE
                      </h2>
                      <span className="mt-3 text-[14px] text-gray-700 font-normal">
                        不與人同的作為
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 tracking-widest !leading-8 xl:!leading-10  max-w-[500px] text-sm sm:text-base text-[#20201f]">
                    當市場在競逐利益的比拼輸贏<br></br>
                    我們回歸最本質的「家」、最關鍵的「住」<br></br>
                    以百工職人的精神，多比別人堅持一些<br></br>
                    所有細節，是靈魂，是品質，是建築作為
                  </p>
                </div>
              </div>

              <div className="order-1 lg:order-1">
                <div className="relative w-full aspect-[4/3] md:aspect-[3/2] lg:aspect-[4/3] overflow-hidden rounded-none">
                  <Image
                    src="https://images.pexels.com/photos/22491830/pexels-photo-22491830.jpeg"
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

        <section className="py-16 sm:py-20 bg-[url('https://images.pexels.com/photos/22491830/pexels-photo-22491830.jpeg')] relative bg-center bg-no-repeat bg-cover md:h-[768px] h-[550px] xl:h-[900px]">
          <div className="mask w-full h-full absolute top-0 left-0 z-20 bg-black/50"></div>
          <div className="mx-auto max-w-[1920px] relative z-50 w-[80%] flex items-center !h-full px-4 sm:px-6 lg:px-8">
            <div className="w-full flex lg:flex-row flex-col">
              <div className=" w-full lg:w-1/2"></div>
              {/* 文字在右（手機在下） */}
              <div className=" w-full lg:w-1/2">
                <div className="flex flex-col items-center">
                  <div className="flex  items-center">
                    <img
                      src="/images/about/text-white.png "
                      alt="text"
                      className="max-w-[450px] w-[110px] sm:w-[140px]"
                      placeholder="empty"
                      loading="lazy"
                      width={450}
                      height={450}
                    ></img>
                    <div className="flex ml-3 flex-col">
                      <h2 className="text-[#ffffff] text-2xl sm:text-3xl lg:text-4xl font-extrabold">
                        宜融
                      </h2>
                      <h2 className="text-[#ffffff] text-2xl sm:text-3xl lg:text-4xl font-extrabold">
                        ARTH
                      </h2>
                      <span className="mt-3 text-[14px] text-gray-50 font-normal">
                        家是情感的生態系
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 tracking-widest !leading-8 xl:!leading-10  max-w-[500px] text-sm sm:text-base text-[#eaeaea]">
                    從選地到築家，環境成為家的情感範疇<br></br>
                    回家的風景，引出生命如何豐富的四季<br></br>
                    在家的時光，煲出日日生活怎樣的滋味<br></br>
                    我們始終站在未來前線，預見美好與價值<br></br>
                    讓您把身體的根、心靈的柢，深深種下
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div></div>
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
      <p className="w-2/3 xl:w-1/2  text-[1rem] text-white !leading-8 xl:!leading-10 mt-5">
        {description}
      </p>
    </motion.div>
  );
};
