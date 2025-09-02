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
          <div className="main-title absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
            <h1 className=" text-3xl text-center font-light sm:text-4xl 2xl:text-6xl text-white">
              實在的構築
            </h1>
          </div>

          <div className="mask bg-black/20 w-full h-full top-0 left-0 absolute z-30" />

          {/* ✅ 背景影片取代 Image */}
          <video
            src="/videos/2882118-uhd_3840_2160_24fps.mp4"
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
          <h2 className="text-2xl font-semibold mb-6">Latest News</h2>
          <p className="text-gray-600">
            這裡放新聞清單或其他內容。背景已經改成自動播放影片，Scroll Down
            按鈕移除。
          </p>
        </section>
      </div>
    </Layout>
  );
}
