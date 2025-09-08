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
        <section className="section-hero-title h-screen mt-[0px] w-full relative">
          {/* <div className="main-title absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
            <h1 className=" text-3xl text-center font-light sm:text-4xl 2xl:text-6xl text-white">
              實在的構築
            </h1>
          </div> */}

          <div className="mask bg-black/20 w-full h-full top-0 left-0 absolute z-30" />

          {/* ✅ 背景影片取代 Image */}
          <video
            src="/videos/1130417_宜園建設-形象影片_Bcopy(大檔) - Compressed with FlexClip-2.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 mt-[60px] w-full h-full object-cover"
          />
        </section>
      </div>
    </Layout>
  );
}
