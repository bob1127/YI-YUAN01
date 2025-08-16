"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Layout from "./Layout";
import ProjectSlider from "../components/SwiperCarousel/BuildProject";

/** 可重用的 Hero 視差元件 */
function HeroParallax({
  src,
  alt = "hero",
  speed = 0.35,
  heightClass = "h-[70vh]",
  children,
}) {
  const containerRef = useRef(null);
  const layerRef = useRef(null);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let rafId = 0;

    const update = () => {
      if (!containerRef.current || !layerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // 視差位移（rect.top 往下捲動會變成負值）
      const offsetY = rect.top * speed; // 例如 speed=0.35，捲 100px 只移動 35px

      // 減少動作時只保留輕微放大，避免視差移動
      const transform = reduceMotion
        ? "scale(1.1)"
        : `translate3d(0, ${offsetY}px, 0) scale(1.1)`;

      layerRef.current.style.transform = transform;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${heightClass}`}
    >
      {/* 這層做 transform，內層放 Image（scale 1.1 以避免邊緣露出） */}
      <div
        ref={layerRef}
        className="absolute inset-0 will-change-transform"
        style={{ transform: "scale(1.1)" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-cover select-none pointer-events-none"
        />
      </div>

      {/* 疊在上面的內容（按鈕/標題等） */}
      {children}
    </div>
  );
}

export default function About() {
  return (
    <Layout>
      {/* Hero 視差 */}
      <HeroParallax src="/images/09.jpg" speed={0.09} heightClass="h-[100vh]">
        <div className="absolute z-20 right-[15%] bottom-[40%]">
          <div className="flex items-center">
            <div className="icon mr-4 w-[90px] h-[90px] bg-white rounded-full flex justify-center items-center">
              HOT-SALE
            </div>
            <div className="txt flex flex-col">
              <h1 className="text-white text-[40px] font-extralight tracking-widest">
                超越設想的心思量
              </h1>
              <h2 className="text-white font-extralight tracking-widest text-[35px]">
                Project
              </h2>
            </div>
          </div>
        </div>
      </HeroParallax>

      {/* Main content */}
      <div className="relative bg-white mt-[-10vh]">
        {/* 往上淡出的白色漸層（更柔順，多段 stop 可再自行調整） */}
        <div
          className="pointer-events-none absolute inset-x-0 -top-44 h-44 z-[15]"
          style={{
            background:
              "linear-gradient(to top," +
              "rgba(255,255,255,1) 0%," +
              "rgba(255,255,255,0.98) 18%," +
              "rgba(255,255,255,0.92) 34%," +
              "rgba(255,255,255,0.80) 50%," +
              "rgba(255,255,255,0.55) 68%," +
              "rgba(255,255,255,0.30) 84%," +
              "rgba(255,255,255,0.00) 100%)",
          }}
        />

        <section className="pt-12">{/* 內容區塊 */}</section>
        <ProjectSlider />
      </div>
    </Layout>
  );
}
