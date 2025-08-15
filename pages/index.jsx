"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import Layout from "./Layout";

// ✅ 只對可能含瀏覽器/ESM專屬程式的子元件做動態載入 + 關閉 SSR
const HeroCarousel = dynamic(() => import("../components/Preloader"), {
  ssr: false,
});

// ⚠️ 下列原本的 import 若未使用或易造成 SSR 載入風險，請先拿掉
// import { motion, useScroll, useTransform } from "framer-motion"; // 未使用就移除
// import SwiperEsim from "../components/EmblaCarousel01/index";   // 未使用就移除
// import HeroSlider from "../components/Slider/Slider";            // 未使用就移除
// import ParallaxImage from "../components/ParallaxImage";         // 未使用就移除
// import Marquee from "react-marquee-slider";                      // 未使用就移除（常見 SSR 問題源）
// import { ParallaxProvider, Parallax } from "react-scroll-parallax"; // 未使用就移除
// import Scroll from "../components/Scroll";                        // 未使用就移除

export default function Home() {
  return (
    <Layout>
      <div className="bg-white">
        <section className="relative md:h-[768px] h-[500px] xl:h-[1024px] 2xl:h-screen w-full overflow-hidden">
          {/* 毛玻璃遮罩層 */}
          <div className="absolute inset-0 z-10" />

          {/* 背景（交給 HeroCarousel 處理） */}
          <HeroCarousel />
        </section>

        <section className="section_features w-full mx-auto mt-[100px]">
          <div className="flex lg:flex-row max-w-[1920px] flex-col-reverse mb-5 mt-20 sm:mt-[20vh] w-full mx-auto">
            <div className="img w-full md:w-[85%] lg:w-[60%] mx-auto h-auto max-h-[500px] overflow-hidden">
              <div className="animate-image-wrapper relative w-full aspect-[4/5] max-h-[500px] h-full overflow-hidden">
                <div className="image-container relative w-full h-full max-h-[500px]">
                  <Link href="/hot-sale">
                    <Image
                      src="/images/JPOM9756.jpg"
                      alt="About Image 2"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, (max-width: 1024px) 550px, 85vw"
                    />
                  </Link>
                </div>
              </div>
            </div>

            <div className="text w-[85%] mb-5 lg:mb-0 mx-auto lg:w-[40%] flex flex-col justify-center items-center">
              <div className="flex flex-col px-0 lg:px-20 justify-start items-start">
                <div className="title mx-auto flex flex-col justify-start items-start">
                  <div words="T - TRUST" />
                  <h2>信任 ｜ 宜安心</h2>
                  <p className="leading-loose tracking-widest w-full">
                    房子，值得依靠；好關係，值得託付。
                    當市場競逐利益，宜園回歸最本質的「家」，最關鍵的「住」。
                    以職人專業為基，堅守實在本質，落實大小細節，築起家的價值。
                    <br />
                    <br />
                    宜園，以「實在的構築」，默默守護，讓您踏實生活，放心每一天。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ...下方其餘版面原樣保留（略）... */}

          <section className="py-[30px] mt-10 lg:mt-0 lg:py-[50px] bg-[#6D7B80] sm:py-[70px]">
            <div className="flex max-w-[1920px] lg:flex-row flex-col-reverse mb-5 mt-20 lg:mt-[10vh] w-[98%] mx-auto">
              <div className="img w-[98%] md:w-[85%] lg:w-[50%] mx-auto h-auto overflow-hidden">
                <div className="animate-image-wrapper relative w-full lg:w-[90%] mx-auto pl-0 lg:pl-20 aspect-[3/2.6] overflow-hidden">
                  <div className="image-container relative w-full h-full">
                    <Link href="/hot-sale">
                      <Image
                        src="/images/JPOM9734.jpg"
                        alt="About Image 2"
                        fill
                        className="object-cover scale-[1.3] object-[20%_60%] transition-transform duration-500"
                        sizes="(max-width: 768px) 90vw, (max-width: 1024px) 550px, 85vw"
                      />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="text mb-5 lg:mb-0 w-[85%] mx-auto lg:w-[40%] flex flex-col">
                <div className="flex flex-col justify-center items-center h-full">
                  <div className="title mx-auto flex flex-col justify-start items-start">
                    <div words="U - UNIQUE" />
                    <h2>獨特 ｜ 宜居所</h2>
                    <p className="leading-loose tracking-widest w-full sm:w-2/3">
                      每個人，都是獨一無二的個體。
                      好的房子，懂得尊重每一種獨特。
                      以好規劃，讓私領域的靜謐、公領域的交流，恰如其分。
                      以好設計，迎風納景，擋聲遮擾，恰到好處。
                      <br />
                      <br />
                      宜園，以實在的構築，成就居住者理想居所，守護與眾不同的生活想像
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 其餘區塊原樣保留 */}
          </section>
        </section>
      </div>
    </Layout>
  );
}
