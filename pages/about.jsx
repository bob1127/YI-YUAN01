"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import Layout from "./Layout";
import { motion } from "framer-motion";
export default function Home() {
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
    const DURATION_MS = 1400;
    const start = performance.now();
    const easeInExpo = (t) => (t === 0 ? 0 : Math.pow(2, 10 * (t - 1)));

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
      <div className="bg-white">
        <section className="section-hero-title aspect-[16/16] sm:aspect-[16/12] md:aspect-[16/6.5] overflow-hidden mt-14 w-full relative">
          <div className="main-title absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
            <h1 className=" text-3xl text-center font-light sm:text-4xl 2xl:text-6xl text-white">
              About
            </h1>
          </div>

          <div className="mask bg-black/20 w-full h-full top-0 left-0 absolute z-30" />

          <Image
            src="/images/project/烏日區五張犁西段474地號(誠境5)-完工實景照片03-1090219.jpg"
            alt="banner"
            fill
            sizes="100vw"
            priority={false}
            className="object-cover object-center sm:object-right md:object-[80%_center]"
          />

          {/* Scroll Down CTA */}
          <motion.button
            type="button"
            onClick={handleScroll}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center z-30 cursor-pointer select-none"
            aria-label="Scroll down"
          >
            <div className="w-px h-16 bg-white/40 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-px h-full bg-white animate-scroll-line" />
            </div>
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
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-white text-sm mt-1"
            >
              Down
            </motion.span>
          </motion.button>

          {/* keyframes */}
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
              animation: scroll-line 2.8s linear infinite;
            }
          `}</style>
        </section>

        <section className="section_features w-full mt-[40px] xl:mt-[10vh] mx-auto  ">
          <section className="flex lg:flex-row max-w-[1920px] flex-col-reverse mb-5  w-full mx-auto">
            <div className="img w-full lg:px-[60px]  xl:px-[110px] lg:w-1/2">
              <div className="animate-image-wrapper relative w-full aspect-[4/3] overflow-hidden">
                <div className="image-container ">
                  <Link href="/hot-sale">
                    <Image
                      src="/images/project/JPOM9756.tif"
                      alt="About Image 2"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, (max-width: 1024px) 550px, 85vw"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="text w-full lg:w-1/2 pb-12 px-8  flex flex-col  justify-center items-center">
              <div className="flex flex-col   justify-start items-start ">
                <div className="title  mx-auto flex flex-col justify-center items-center">
                  <div className="flex justify-center items">
                    <span className="capital-text text-[103px] leading-none mr-2 text-center m-0 p-0 font-normal">
                      T
                    </span>
                    <div className="flex flex-col">
                      <p className="text-[43px]">RUST</p>
                      <h2 className="text-[24px] font-bold font-heading font-heading">
                        信任 ｜ 宜安心
                      </h2>
                    </div>
                  </div>
                  <p className="leading-loose tracking-widest w-full mt-8">
                    好房子，值得依靠；好關係，值得託付<br></br>
                    當市場競逐利益，宜園回歸最本質的「家」，最關鍵的「住」
                    <br></br>
                    以職人專業為基，堅守實在本質，落實大小細節，築起家的價值
                    <br></br>
                    <br></br>
                    宜園，以「實在的構築」，默默守護，讓您踏實生活，放心每一天
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className=" flex lg:flex-row max-w-[1920px] flex-col-reverse mb-5 w-full mx-auto ">
            <div className="flex lg:flex-row justify-center items-center flex-col w-full  mx-auto ">
              <div className="img  w-full lg:w-1/2 flex justify-center items-center p-10  mx-auto sm:mx-3  h-auto  overflow-hidden">
                <div className="title w-full mx-auto flex flex-col justify-center items-center">
                  <div className="flex justify-center items">
                    <span className="capital-text text-[103px] leading-none mr-2 text-center m-0 p-0 font-normal">
                      R
                    </span>
                    <div className="flex flex-col">
                      <p className="text-[43px]">ELATION</p>
                      <h2 className="text-[24px] font-bold font-heading font-heading">
                        關係 ｜ 宜真情
                      </h2>
                    </div>
                  </div>

                  <p className="leading-loose tracking-widest  mt-8">
                    建築，是連結土地的根，也是凝聚人心的橋<br></br>
                    於家人，傳遞溫度與關懷；於鄰里，凝聚和睦與理解
                    <br></br>於土地，報以尊重與謙遜；於城市，追求共生共榮
                    <br></br>
                    <br></br>
                    宜園，以實在的構築<br></br>讓人與人、與土地、與城市之間
                    美好關係加以延續
                  </p>
                </div>
              </div>

              <div className="w-full lg:w-1/2 flex lg:flex-row flex-col">
                <div className="img w-[90%] py-3 mx-auto  lg:w-1/2 pr-0 lg:pr-5">
                  <div className="overflow-hidden relative w-full aspect-[4/5]">
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

                <div className="img w-[90%] py-3 mx-auto  lg:w-1/2 pr-0 lg:pr-5">
                  <div className="overflow-hidden relative w-full aspect-[4/5]">
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
              </div>
            </div>
          </section>

          <section className=" py-[30px]  lg:mt-0 lg:py-[50px] bg-[#6D7B80] sm:py-[70px]">
            <div className="flex  max-w-[1920px]  lg:flex-row flex-col-reverse mb-5 mt-10 lg:mt-[10vh] w-[98%] mx-auto">
              <div className="img w-full lg:px-[60px]  xl:px-[110px] lg:w-1/2">
                <div className="animate-image-wrapper relative w-full aspect-[4/3] overflow-hidden">
                  <div className="image-container ">
                    <Link href="/hot-sale">
                      <Image
                        src="/images/JPOM9734.jpg"
                        alt="About Image 2"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 90vw, (max-width: 1024px) 550px, 85vw"
                      />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="text mb-5 lg:mb-0 w-[85%]  mx-auto lg:w-[40%]  flex flex-col ">
                <div className="flex flex-col justify-center items-center h-full">
                  <div className="title  flex flex-col justify-center items-center">
                    <div className="flex justify-center items">
                      <span className="capital-text text-white text-[103px] leading-none mr-2 text-center m-0 p-0 font-normal">
                        U
                      </span>
                      <div className="flex flex-col">
                        <p className="text-[43px] text-white">NIQUE</p>
                        <h2 className="text-[24px] text-white font-bold font-heading font-heading">
                          獨特 ｜ 宜居所
                        </h2>
                      </div>
                    </div>

                    <p className="leading-loose tracking-widest text-gray-200 mt-8 w-full ">
                      每個人，都是獨一無二的個體。 好的房子，懂得尊重每一種獨特
                      <br></br>
                      以好規劃，讓私領域的靜謐、公領域的交流，恰如其分
                      <br></br>
                      以好設計，迎風納景，擋聲遮擾，恰到好處<br></br>
                      <br></br>
                      宜園，以實在的構築，成就居住者理想居所，守護與眾不同的生活想像
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex  max-w-[1920px]  lg:flex-row flex-col-reverse mb-5 mt-10 lg:mt-[10vh]  w-[98%] mx-auto">
              <div className="text mb-5 lg:mb-0 w-[85%]  mx-auto lg:w-[40%]  flex flex-col ">
                <div className="flex flex-col justify-center items-center h-full">
                  <div className="title mb-5 mt-10  mx-auto flex flex-col justify-center items-center">
                    <div className="flex justify-center items">
                      <span className="capital-text text-white text-[103px] leading-none mr-2 text-center m-0 p-0 font-normal">
                        F
                      </span>
                      <div className="flex flex-col">
                        <p className="text-[43px] text-white"> OEVER</p>
                        <h2 className="text-[24px] text-white font-bold font-heading font-heading">
                          永恆 ｜ 宜融入
                        </h2>
                      </div>
                    </div>

                    <p className="leading-loose tracking-widest text-gray-200 mt-8 w-full ">
                      好房子懂得跟土地相處，找出最舒適的生活方式<br></br>
                      宜園傾聽土地的聲音，細說生命的故事<br></br>
                      讓建築扎根於大地，成就心的歸宿<br></br>
                      <br />
                      宜園，以實在的構築，融入環境，與自然共生共長<br></br>
                      順應時間，讓家越住越美，恆久宜居
                    </p>
                  </div>
                </div>
              </div>
              <div className="img w-full lg:px-[60px]  xl:px-[110px] lg:w-1/2">
                <div className="animate-image-wrapper relative w-full aspect-[4/3] overflow-hidden">
                  <div className="image-container ">
                    <Link href="/hot-sale">
                      <Image
                        src="/images/烏日區五張犁西段474地號(誠境5)-完工實景照片03-1090219.jpg"
                        alt="About Image 2"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 90vw, (max-width: 1024px) 550px, 85vw"
                      />
                    </Link>
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
