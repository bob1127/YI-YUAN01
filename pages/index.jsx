// pages/index.jsx
"use client";

import dynamic from "next/dynamic";
import Layout from "./Layout";
import Enter from "../components/enter/enter";
import Image from "next/image";
export default function Home() {
  return (
    <Layout>
      <Enter />
      <div className="bg-white">
        <section className="section-hero-title mb-[50px] aspect-[16/16] sm:aspect-[16/12]  md:aspect-[16/6.5] overflow-hidden mt-0 md:mt-5  w-full relative">
          {/* <div className="main-title absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
            <h1 className=" text-3xl text-center font-light sm:text-4xl 2xl:text-6xl text-white">
              實在的構築
            </h1>
          </div> */}

          <div className="mask bg-black/20 w-full h-full top-0 left-0 absolute z-30" />

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
        <section className="max-w-[1920px] mb-20 flex md:flex-row flex-col xl:w-[80%] md:w-[90%] w-full mx-auto">
          <div className="left w-full md:w-1/2 flex items-center justify-center flex-col">
            <div className="flex flex-col items-start ">
              <h2 className=" text-[30px] xl:text-[50px]">實在的構築</h2>
              <p className="lg:text-[18px] text-[16px]">
                宜居的建築，承載著宜居的根<br></br> 不一定最宏大，卻能帶來安心
                <br></br>
                傾聽，土地的聲音；細說，生命的故事
              </p>{" "}
              <br></br>
              <p className="lg:text-[18px] text-[16px]">
                A livable building carries the roots of livability<br></br> —
                not necessarily the grandest, yet it brings peace of mind
                <br></br>
                <br></br> Listening to the voice of the land,telling the stories
                of life
              </p>
            </div>
          </div>
          <div className="right w-full md:w-1/2 flex justify-center items-center">
            <Image
              src="/images/img093.png"
              alt=""
              width={800}
              height={1000}
              placeholder="empty"
              loading="lazy"
              className=""
            ></Image>
          </div>
        </section>
      </div>
    </Layout>
  );
}
