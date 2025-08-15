"use client";

// import React from "react";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Layout from "./Layout";

import { ReactLenis } from "@studio-freight/react-lenis";
import ProjectSlider from "../components/SwiperCarousel/BuildProject";

export default function About() {
  return (
    <Layout>
      <section className="section-hero-title w-full relative h-[60vh] sm:h-[70vh] lg:h-[80vh]">
        {/* Hero 背景圖（用 <img>） */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/images/project/pexels-may-abeki-1238188510-24033295.jpg"
            alt="經典建築案例"
            loading="eager"
            decoding="async"
            width="1920"
            height="1080"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 左側置中文字 */}
        <div className="absolute top-1/2 -translate-y-1/2 left-[10%] text-white text-right z-10 px-4">
          <div className="flex">
            <h1 className="text-4xl sm:text-5xl text-white tracking-wide">
              PROJECT
            </h1>
            <p className="text-xl mt-5 ml-2 sm:text-4xl text-white font-normal">
              超越設想的心思量
            </p>
          </div>
        </div>
      </section>

      <ProjectSlider />
    </Layout>
  );
}
