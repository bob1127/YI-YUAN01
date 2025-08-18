"use client";
import { useRef } from "react";
import Layout from "./Layout";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import Head from "next/head";
import { BsSearch } from "react-icons/bs";
import { motion } from "framer-motion";
const project = () => {
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
        <title>經典選粹 CLASSIC 貫徹更好的美好旅程 | 宜園建設</title>
      </Head>
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
            CLASSIC 貫徹更好的美好旅程
          </h1>
        </div>
        <div className="mask bg-black/20 w-full h-full top-0 left-0 absolute z-30"></div>
        <Image
          src="/images/project/pexels-pixabay-327482.jpg"
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
      <div className="title py-1"></div>
      <section className="grid  grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 w-full ">
        <Link href="/project/project-yiyuan" className="group block">
          <div className="project-item  flex relative group overflow-hidden flex-col">
            <div className="img aspect-[4/3] relative overflow-hidden">
              {/* 灰色遮罩 */}
              <div className="mask bg-[#5b5c5d] w-full opacity-0 group-hover:opacity-25 absolute top-0 left-0 z-20 h-full transition duration-300"></div>

              {/* icon + More 文字 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
                <BsSearch className="text-white text-4xl opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out" />
                <span className="text-white text-sm mt-2 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out">
                  More
                </span>
              </div>

              {/* 圖片本體 */}
              <Image
                src="/images/project/S__31399939.jpg"
                alt="宜園大院"
                fill
                className="object-cover transform scale-100 transition-transform duration-1000 ease-in-out group-hover:scale-105"
                placeholder="empty"
                loading="lazy"
              />

              {/* 半圓標籤：預設隱藏，hover 出現 */}
              {/* 半圓標籤：預設固定顯示 */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30">
                <div className="w-32 h-16 bg-[#d33] rounded-t-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-semibold tracking-wide">
                    熱銷中
                  </span>
                </div>
              </div>
            </div>

            {/* 文字區塊 */}
            <div className="txt flex flex-col justify-center items-center p-8 mt-2">
              <h2 className="text-3xl mb-4 font-bold text-[#20382c]">
                宜園大院
              </h2>
              <p className="text-[#337162]">13期·人車分道·極奢墅</p>
            </div>
          </div>
        </Link>
        <Link href="/project/project-yiching" className="group block">
          <div className="project-item  flex relative group overflow-hidden flex-col">
            <div className="img aspect-[4/3] relative overflow-hidden">
              {/* 灰色遮罩 */}
              <div className="mask bg-[#5b5c5d] w-full opacity-0 group-hover:opacity-25 absolute top-0 left-0 z-20 h-full transition duration-300"></div>

              {/* icon + More 文字 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
                {/* 放大鏡 icon */}
                <BsSearch className="text-white text-4xl opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out" />
                {/* More 文字 */}
                <span className="text-white text-sm mt-2 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out">
                  More
                </span>
              </div>

              {/* 圖片本體 */}
              <Image
                src="/images/project/S__31399941.jpg"
                alt="宜園大院"
                fill
                className="object-cover transform scale-100 transition-transform duration-1000 ease-in-out group-hover:scale-105"
                placeholder="empty"
                loading="lazy"
              />
              {/* 半圓標籤：預設固定顯示 */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30">
                <div className="w-32 h-16 bg-[#d33] rounded-t-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-semibold tracking-wide">
                    熱銷中
                  </span>
                </div>
              </div>
            </div>

            {/* 文字區塊 */}
            <div className="txt flex flex-col justify-center items-center p-8 mt-2">
              <h2 className="text-3xl mb-4 font-bold text-[#20382c]">一青隱</h2>
              <p className="text-[#337162]">一境·青海·閒隱</p>
            </div>
          </div>
        </Link>
        <Link href="/project/project-chengjing06" className="group block">
          <div className="project-item  flex relative group overflow-hidden flex-col">
            <div className="img aspect-[4/3] relative overflow-hidden">
              {/* 灰色遮罩 */}
              <div className="mask bg-[#5b5c5d] w-full opacity-0 group-hover:opacity-25 absolute top-0 left-0 z-20 h-full transition duration-300"></div>

              {/* icon + More 文字 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
                {/* 放大鏡 icon */}
                <BsSearch className="text-white text-4xl opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out" />
                {/* More 文字 */}
                <span className="text-white text-sm mt-2 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out">
                  More
                </span>
              </div>

              {/* 圖片本體 */}
              <Image
                src="/images/project/誠境6/S__31400252.jpg"
                alt="宜園大院"
                fill
                className="object-cover transform scale-100 transition-transform duration-1000 ease-in-out group-hover:scale-105"
                placeholder="empty"
                loading="lazy"
              />
              {/* 半圓標籤：預設固定顯示 */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30">
                <div className="w-32 h-16 bg-[#485936]/80 rounded-t-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-semibold tracking-wide">
                    完售
                  </span>
                </div>
              </div>
            </div>

            {/* 文字區塊 */}
            <div className="txt flex flex-col justify-center items-center p-8 mt-2">
              <h2 className="text-3xl mb-4 font-bold text-[#20382c]">誠境6</h2>
              <p className="text-[#337162]">景觀別墅·庭院·大露台</p>
            </div>
          </div>
        </Link>
      </section>
      <section className="grid  grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 w-full ">
        <Link href="/project/project-chengjing05" className="group block">
          <div className="project-item  flex relative group overflow-hidden flex-col">
            <div className="img aspect-[4/3] relative overflow-hidden">
              {/* 灰色遮罩 */}
              <div className="mask bg-[#5b5c5d] w-full opacity-0 group-hover:opacity-25 absolute top-0 left-0 z-20 h-full transition duration-300"></div>

              {/* icon + More 文字 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
                {/* 放大鏡 icon */}
                <BsSearch className="text-white text-4xl opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out" />
                {/* More 文字 */}
                <span className="text-white text-sm mt-2 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out">
                  More
                </span>
              </div>

              {/* 圖片本體 */}
              <Image
                src="/images/project/誠境5/烏日區五張犁西段474地號(誠境5)-完工實景照片03-1090219.jpg"
                alt="宜園大院"
                fill
                className="object-cover transform scale-100 transition-transform duration-1000 ease-in-out group-hover:scale-105"
                placeholder="empty"
                loading="lazy"
              />
              {/* 半圓標籤：預設固定顯示 */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30">
                <div className="w-32 h-16 bg-[#485936]/80 rounded-t-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-semibold tracking-wide">
                    完售
                  </span>
                </div>
              </div>
            </div>

            {/* 文字區塊 */}
            <div className="txt flex flex-col justify-center items-center p-8 mt-2">
              <h2 className="text-3xl mb-4 font-bold text-[#20382c]">誠境5</h2>
              <p className="text-[#337162]">匠心巨作·典藏誠境五期.</p>
            </div>
          </div>
        </Link>
        <Link href="/project/project-chengjing02" className="group block">
          <div className="project-item  flex relative group overflow-hidden flex-col">
            <div className="img aspect-[4/3] relative overflow-hidden">
              {/* 灰色遮罩 */}
              <div className="mask bg-[#5b5c5d] w-full opacity-0 group-hover:opacity-25 absolute top-0 left-0 z-20 h-full transition duration-300"></div>

              {/* icon + More 文字 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
                {/* 放大鏡 icon */}
                <BsSearch className="text-white text-4xl opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out" />
                {/* More 文字 */}
                <span className="text-white text-sm mt-2 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out">
                  More
                </span>
              </div>

              {/* 圖片本體 */}
              <Image
                src="/images/project/誠境2/DSC_2058.jpg"
                alt="宜園大院"
                fill
                className="object-cover transform scale-100 transition-transform duration-1000 ease-in-out group-hover:scale-105"
                placeholder="empty"
                loading="lazy"
              />
              {/* 半圓標籤：預設固定顯示 */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30">
                <div className="w-32 h-16 bg-[#485936]/80 rounded-t-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-semibold tracking-wide">
                    完售
                  </span>
                </div>
              </div>
            </div>

            {/* 文字區塊 */}
            <div className="txt flex flex-col justify-center items-center p-8 mt-2">
              <h2 className="text-3xl mb-4 font-bold text-[#20382c]">誠境2</h2>
              <p className="text-[#337162]">匠心續作，典藏誠境二期</p>
            </div>
          </div>
        </Link>
        <Link href="/project/project-YiYuanChengjing" className="group block">
          <div className="project-item  flex relative group overflow-hidden flex-col">
            <div className="img aspect-[4/3] relative overflow-hidden">
              {/* 灰色遮罩 */}
              <div className="mask bg-[#5b5c5d] w-full opacity-0 group-hover:opacity-25 absolute top-0 left-0 z-20 h-full transition duration-300"></div>

              {/* icon + More 文字 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
                {/* 放大鏡 icon */}
                <BsSearch className="text-white text-4xl opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out" />
                {/* More 文字 */}
                <span className="text-white text-sm mt-2 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out">
                  More
                </span>
              </div>

              {/* 圖片本體 */}
              <Image
                src="/images/project/誠境1/宜園誠境實景照片03-1041020.jpg"
                alt="宜園大院"
                fill
                className="object-cover transform scale-100 transition-transform duration-1000 ease-in-out group-hover:scale-105"
                placeholder="empty"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30">
                <div className="w-32 h-16 bg-[#485936]/80 rounded-t-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-semibold tracking-wide">
                    完售
                  </span>
                </div>
              </div>
            </div>

            {/* 文字區塊 */}
            <div className="txt flex flex-col justify-center items-center p-8 mt-2">
              <h2 className="text-3xl mb-4 font-bold text-[#20382c]">
                宜園誠境
              </h2>
              <p className="text-[#337162]">誠境首章｜境啟未來</p>
            </div>
          </div>
        </Link>
      </section>
    </Layout>
  );
};

export default project;
