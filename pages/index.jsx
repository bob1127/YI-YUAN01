"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import Layout from "./Layout";
import Enter from "../components/enter/enter";
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
      <Enter />
      <div className="bg-white">
        <section className="relative md:h-[768px] h-[500px] xl:h-[1024px] 2xl:h-screen w-full overflow-hidden">
          {/* 毛玻璃遮罩層 */}
          <div className="absolute inset-0 z-10" />

          {/* 背景（交給 HeroCarousel 處理） */}
          <HeroCarousel />
        </section>

        <section className="section_features w-full   mx-auto  mt-[100px]">
          <div className="flex lg:flex-row max-w-[1920px] flex-col-reverse mb-5 mt-20 sm:mt-[20vh] w-full mx-auto">
            <div className="img w-full  md:w-[85%] lg:w-[60%] mx-auto h-auto max-h-[500px] overflow-hidden">
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

            <div className="text w-[85%] mb-5 lg:mb-0 mx-auto lg:w-[40%]  flex flex-col  justify-center items-center">
              <div className="flex flex-col  px-0 lg:px-20 justify-start items-start ">
                <div className="title  mx-auto flex flex-col justify-start items-start">
                  <h2>信任 ｜ 宜安心</h2>
                  <p className="leading-loose tracking-widest w-full ">
                    房子，值得依靠；好關係，值得託付。
                    當市場競逐利益，宜園回歸最本質的「家」，最關鍵的「住」。
                    以職人專業為基，堅守實在本質，落實大小細節，築起家的價值。
                    <br></br>
                    <br></br>
                    宜園，以「實在的構築」，默默守護，讓您踏實生活，放心每一天。
                  </p>
                </div>
              </div>
            </div>
          </div>{" "}
          <section className="lg:py-[50px] max-w-[1920px]  mx-auto">
            <div className="flex lg:flex-row justify-center items-center flex-col w-full sm:w-[95%] mx-auto ">
              <div className="img  flex justify-center items-center p-10 w-[95%]   lg:w-[50%] mx-auto sm:mx-3  h-auto lg:h-[60vh] xl:h-[60vh] overflow-hidden">
                <div className="title w-full mx-auto flex flex-col justify-center items-start">
                  <h2>關係 ｜ 宜真情</h2>
                  <p className="leading-loose tracking-widest w-full md:w-2/3 ">
                    建築，是連結土地的根，<br></br>也是凝聚人心的橋。
                    <br></br>
                    <br></br>於家人，傳遞溫度與關懷；<br></br>
                    於鄰里，凝聚和睦與理解；
                    <br></br>於土地，報以尊重與謙遜；<br></br>於城市，追求共
                    <br></br>
                    <br></br>
                    宜園，以實在的構築，<br></br>
                    讓人與人、與土地、<br></br>與城市之間，美好關係加以延續。
                  </p>
                </div>
              </div>

              {/* 第一張圖片 */}
              <div className="img mt-4 md:mt-0 w-[85%] lg:w-[50%] sm:mx-3 h-auto md:h-[70vh] lg:h-[73vh] xl:h-[83vh] overflow-hidden flex flex-col justify-center items-center">
                <div className="animate-image-wrapper group relative w-full aspect-[4/5]">
                  <div className="image-container relative w-full h-full">
                    <Image
                      src="/images/烏日區五張犁西段474地號(誠境5)-完工實景照片10-1090219-S.jpg"
                      alt="About Image 1"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 50vw"
                    />
                  </div>
                </div>
              </div>

              {/* 第二張圖片 */}
              <div className="img w-[85%] lg:w-[50%] sm:mx-3 h-auto md:h-[70vh] lg:h-[73vh] xl:h-[83vh] mt-5 lg:mt-0 overflow-hidden flex flex-col justify-center items-center">
                <div className="animate-image-wrapper group relative w-full aspect-[4/5]">
                  <div className="image-container relative w-full h-full">
                    <Image
                      src="/images/宜園誠境實景照片.jpg"
                      alt="About Image 2"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 40vw"
                    />
                  </div>
                </div>
              </div>

              {/* <div className="text w-[95%] lg:w-1/2 p-8 flex flex-col justify-center items-center">
            <TextGenerateEffect words="宜居" />
            <p>不與人同的作為</p>
          </div> */}
            </div>
          </section>
          <section className=" py-[30px] mt-10 lg:mt-0 lg:py-[50px] bg-[#6D7B80] sm:py-[70px]">
            <div className="flex  max-w-[1920px]  lg:flex-row flex-col-reverse mb-5 mt-20 lg:mt-[10vh] w-[98%] mx-auto">
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

              <div className="text mb-5 lg:mb-0 w-[85%]  mx-auto lg:w-[40%]  flex flex-col ">
                <div className="flex flex-col justify-center items-center h-full">
                  <div className="title mx-auto flex flex-col justify-start items-start">
                    <h2>獨特 ｜ 宜居所</h2>
                    <p className="leading-loose tracking-widest w-full sm:w-2/3">
                      每個人，都是獨一無二的個體。
                      好的房子，懂得尊重每一種獨特。
                      以好規劃，讓私領域的靜謐、公領域的交流，恰如其分。
                      以好設計，迎風納景，擋聲遮擾，恰到好處。<br></br>
                      <br></br>
                      宜園，以實在的構築，成就居住者理想居所，守護與眾不同的生活想像
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex max-w-[1920px]  lg:flex-row flex-col mb-5 mt-20 lg:mt-[10vh] w-full mx-auto">
              <div className="text mb-5 lg:mb-0 w-[85%]  mx-auto lg:w-[40%]  flex flex-col ">
                <div className="flex flex-col justify-center h-full items-center ">
                  <div className="title  mx-auto flex flex-col justify-start items-start pl-0 lg:pl-20">
                    <h2 className="text-left">永恆 ｜ 宜融入</h2>
                    <p className="leading-loose tracking-widest w-full sm:w-2/3">
                      好房子懂得跟土地相處，找出最舒適的生活方式。
                      宜園傾聽土地的聲音，細說生命的故事，
                      讓建築扎根於大地，成就心的歸宿。
                      <br />
                      <br />
                      宜園，以實在的構築，融入環境，與自然共生共長；
                      順應時間，讓家越住越美，恆久宜居。
                    </p>
                  </div>
                </div>
              </div>

              <div className="img w-full md:w-[85%] lg:w-[70%] mx-auto h-auto max-h-[500px] sm:max-h-[580px]  overflow-hidden">
                <div className="animate-image-wrapper relative w-full aspect-[4/5] max-h-[500px] sm:max-h-[580px]  h-full overflow-hidden">
                  <div
                    className="image-container relative w-full h-full max-h-[500px] sm:max-h-[580px]  bg-top bg-cover"
                    style={{
                      backgroundImage: `url('/images/烏日區五張犁西段474地號(誠境5)-完工實景照片03-1090219.JPG')`,
                      backgroundPosition: "top right",
                      backgroundSize: "130% auto", // ← 關鍵：特寫上半部
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <Link
                      href="/hot-sale"
                      className="absolute inset-0 block z-20"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
    </Layout>
  );
}
