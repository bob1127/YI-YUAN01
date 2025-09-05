// pages/index.jsx
"use client";

import dynamic from "next/dynamic";
import Layout from "./Layout";
import Enter from "../components/enter/enter";

export default function Home() {
  return (
    <Layout>
      <Enter />
      <div className="bg-white">
        <section className="section-hero-title aspect-[16/16] sm:aspect-[16/12] md:aspect-[16/6.5] overflow-hidden mt-14 w-full relative">
          {/* <div className="main-title absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
            <h1 className=" text-3xl text-center font-light sm:text-4xl 2xl:text-6xl text-white">
              實在的構築
            </h1>
          </div> */}

          <div className="mask bg-black/20 w-full h-full top-0 left-0 absolute z-30" />

          {/* ✅ 背景影片取代 Image */}
          <video
            src="/videos/1130417_宜園建設-形象影片_Bcopy(大檔).mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </section>

        {/* 測試滾動用區塊 */}
        <section className="w-full max-w-[1200px] mx-auto py-20 px-6">
          <h2 className="text-4xl font-bold mb-6">實在的構築</h2>
          <p className="text-gray-900  text-lg md:text-xl tracking-wider">
            宜居的建築，承載著宜居的根<br></br> 不一定最宏大，卻能帶來安心
            <br></br>
            傾聽，土地的聲音；細說，生命的故事<br></br>
            不一定最奢華，卻處處溫暖，生活宜人。
          </p>
          <p className="text-gray-900 text-lg md:text-xl tracking-wider mt-8">
            A livable building carries the roots of livability — <br></br>not
            necessarily the grandest, yet it brings peace of mind<br></br>{" "}
            Listening to the voice of the land,telling the stories of life.
          </p>
        </section>
      </div>
    </Layout>
  );
}
