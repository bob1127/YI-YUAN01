"use client";

import Layout from "./Layout";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Photos() {
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
      {/* Hero */}
      <section className="section-hero-title aspect-[16/16] sm:aspect-[16/12] md:aspect-[16/6.5] overflow-hidden mt-14 w-full relative">
        <div className="main-title absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
          <h1 className=" text-3xl text-center font-light sm:text-4xl 2xl:text-6xl text-white">
            NEWS
          </h1>
        </div>

        <div className="mask bg-black/20 w-full h-full top-0 left-0 absolute z-30" />

        <Image
          src="https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg"
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

      {/* 內容起點（給捲動用） */}
      <div id="next-section" />

      <section className="section-content py-10 lg:py-20">
        <div className="flex flex-col lg:flex-row max-w-[1920px] mx-auto">
          <div className="left w-full lg:w-1/2">
            {/* 區塊標題 */}
            <div className="flex flex-col px-4 md:px-8 xl:px-16">
              <h2>工程進度｜</h2>
            </div>

            {/* 第一區塊 */}
            <div className="flex flex-col px-4 md:px-8 xl:px-16">
              <div className="title pt-10 mb-4 border-b flex justify-between w-full">
                <h3 className="text-[22px]">宜園一青隱</h3>
                <span>更新日期：114.05</span>
              </div>

              <div className="news-img flex flex-col md:flex-row gap-6 items-stretch">
                {/* 左側兩圖 */}
                <div className="flex flex-col gap-6 md:w-1/2">
                  <div className="relative w-full h-[288px] overflow-hidden group">
                    <img
                      src="/images/news/樓版清洗.jpg"
                      alt="樓版清洗"
                      loading="lazy"
                      decoding="async"
                      width="1200"
                      height="800"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-r from-black/70 to-transparent flex items-center px-4">
                      <p className="text-white text-sm">樓版清洗</p>
                    </div>
                  </div>

                  <div className="relative w-full h-[288px] overflow-hidden group">
                    <img
                      src="/images/news/樓板施作完成,灌漿前照片.jpg"
                      alt="樓板施作完成，灌漿前照片"
                      loading="lazy"
                      decoding="async"
                      width="1200"
                      height="800"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-r from-black/70 to-transparent flex items-center px-4">
                      <p className="text-white text-sm">
                        樓板施作完成，灌漿前照片
                      </p>
                    </div>
                  </div>
                </div>

                {/* 右側圖 */}
                <div className="md:w-1/2">
                  <div className="relative w-full h-[600px] overflow-hidden group">
                    <img
                      src="/images/news/正面外觀施工照片.jpg"
                      alt="正面外觀施工照片"
                      loading="lazy"
                      decoding="async"
                      width="1200"
                      height="1600"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-r from-black/70 to-transparent flex items-center px-4">
                      <p className="text-white text-sm">正面外觀施工照片</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 第二區塊 */}
            <div className="flex flex-col px-4 md:px-8 xl:px-16">
              <div className="title pt-10 mb-4 border-b flex justify-between w-full">
                <h3 className="text-[22px]">宜園13期新案</h3>
                <span>更新日期：114.05</span>
              </div>

              <div className="news-img flex flex-col md:flex-row gap-6 items-stretch">
                {/* 右圖 */}
                <div className="md:w-1/2">
                  <div className="relative w-full h-[600px] overflow-hidden group">
                    <img
                      src="/images/news/土方開挖完成.jpg"
                      alt="土方開挖完成"
                      loading="lazy"
                      decoding="async"
                      width="1200"
                      height="1600"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-r from-black/70 to-transparent flex items-center px-4">
                      <p className="text-white text-sm">土方開挖完成</p>
                    </div>
                  </div>
                </div>

                {/* 左側兩圖 */}
                <div className="flex flex-col gap-6 md:w-1/2">
                  <div className="relative w-full h-[288px] overflow-hidden group">
                    <img
                      src="/images/news/擋土柱鋼筋幫紮完成勘驗.jpg"
                      alt="擋土柱鋼筋綁紮完成"
                      loading="lazy"
                      decoding="async"
                      width="1200"
                      height="800"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-r from-black/70 to-transparent flex items-center px-4">
                      <p className="text-white text-sm">擋土柱鋼筋綁紮完成</p>
                    </div>
                  </div>

                  <div className="relative w-full h-[288px] overflow-hidden group">
                    <img
                      src="/images/news/擋土柱施作-1.jpg"
                      alt="擋土柱施作中"
                      loading="lazy"
                      decoding="async"
                      width="1200"
                      height="800"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-r from-black/70 to-transparent flex items-center px-4">
                      <p className="text-white text-sm">擋土柱施作中</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右欄（可留白或放側欄） */}
          <div className="right w-full lg:w-1/2">
            <div className="flex flex-col px-4 md:px-8 xl:px-16">
              <h2>工程進度｜</h2>
            </div>
            <div className="flex flex-col px-4 md:px-8 xl:px-16">
              <div />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
