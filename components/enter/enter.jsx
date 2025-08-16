"use client";

import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Index() {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  // Intro 狀態
  const [animationDone, setAnimationDone] = useState(false); // SVG 畫線完成
  const [showIntro, setShowIntro] = useState(true); // 控制 Intro 是否顯示（散去）
  const [hideAll, setHideAll] = useState(false); // Enter 後整個元件卸載

  // 背景影片就緒（可播放）後才淡入，避免白屏
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleLoad = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    handleLoad();
    window.addEventListener("resize", handleLoad);
    return () => window.removeEventListener("resize", handleLoad);
  }, []);

  // 畫線完成後，延遲 0.5s 觸發 Intro 散去
  useEffect(() => {
    if (animationDone) {
      const t = setTimeout(() => setShowIntro(false), 500);
      return () => clearTimeout(t);
    }
  }, [animationDone]);

  if (dimension.width === 0 || hideAll) return null;

  // ===== 動畫定義 =====
  const introExit = {
    opacity: 0,
    scale: 1.05,
    filter: "blur(8px)",
    transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
  };

  // ===== 事件 =====
  const handleEnter = () => {
    setHideAll(true);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* ===== 背景層（固定、最上層），一開始就存在而且可見 ===== */}
      <motion.div
        className="fixed inset-0 z-[999999]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* 滿版影片背景（高效能、自動播放） */}
        <div className="absolute inset-0">
          <motion.video
            // 重要：行動裝置自動播放需要 muted + playsInline
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
            // 先用海報圖避免白屏，請放一張極小的 jpg（你原本的背景圖即可）
            poster="/images/宜園誠境實景照片.jpg"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: videoReady ? 1 : 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onCanPlay={() => setVideoReady(true)}
          >
            <source
              src="/videos/3161307-hd_1920_1080_24fps.mp4"
              type="video/mp4"
            />
            {/* 若之後有 WebM，可以加一行以獲得更佳壓縮率：
            <source src="/videos/3161307-hd_1920_1080_24fps.webm" type="video/webm" />
            */}
          </motion.video>
        </div>

        {/* 置中標題與 Enter 按鈕 */}
        <div className="relative z-10 h-full w-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-center px-6"
          >
            <h1 className="text-white drop-shadow text-3xl sm:text-5xl tracking-wide font-semibold">
              宜園建設
            </h1>
            <p className="text-white/90 drop-shadow text-base sm:text-lg mt-4">
              用實在的構築，成就安心的生活。
            </p>

            <button
              onClick={handleEnter}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/90 hover:bg-white px-6 py-3 text-gray-900 font-medium tracking-wider shadow-lg transition"
            >
              Enter
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                className="translate-y-[1px]"
              >
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </motion.div>
        </div>

        {/* 上方漸層遮罩（讓文字更清楚） */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
      </motion.div>

      {/* ===== Intro 層（Logo 畫線＋散去）— 蓋在背景上面 ===== */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <motion.div
            key="intro"
            exit={introExit}
            className={styles.introduction}
            style={{ position: "absolute", inset: 0, zIndex: 1000000 }}
          >
            <div className={styles.lottieContainer}>
              <div className="flex flex-col justify-center items-center h-full">
                <div className="relative">
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="110"
                    height="100"
                    viewBox="0 0 2058 1872"
                  >
                    <motion.path
                      d="M 516.249 877.666 L 516.500 1559.500 655.250 1559.754 L 794 1560.007 794 1035.190 L 794 510.372 656.074 353.461 C 580.214 267.159, 517.664 196.388, 517.073 196.191 C 516.308 195.936, 516.071 391.945, 516.249 877.666 M 1399.117 352.250 L 1267.002 508.500 1267.001 1040.250 L 1267 1572 1399.500 1572 L 1532 1572 1532 884 C 1532 505.600, 1531.827 196, 1531.616 196 C 1531.404 196, 1471.780 266.313, 1399.117 352.250"
                      stroke="#000"
                      fill="none"
                      strokeWidth={8}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2.5, ease: "easeInOut" }}
                    />
                    <motion.path
                      d="M 213 786 L 213 1572 106.500 1572 L 0 1572 0 1722 L 0 1872.001 1029.250 1871.750 L 2058.500 1871.500 2058.799 1725 C 2058.963 1644.425, 2058.812 1575.237, 2058.463 1571.250 L 2057.829 1564 1954.915 1564 L 1852 1564 1852 782 L 1852 0 1694.750 0.008 L 1537.500 0.015 1337.250 231.151 L 1137 462.286 1137 1017.143 L 1137 1572 1029 1572 L 921 1572 921 1017.142 L 921 462.283 724.822 231.142 L 528.644 0 370.822 0 L 213 0 213 786 M 516.249 877.666 L 516.500 1559.500 655.250 1559.754 L 794 1560.007 794 1035.190 L 794 510.372 656.074 353.461 C 580.214 267.159, 517.664 196.388, 517.073 196.191 C 516.308 195.936, 516.071 391.945, 516.249 877.666 M 1399.117 352.250 L 1267.002 508.500 1267.001 1040.250 L 1267 1572 1399.500 1572 L 1532 1572 1532 884 C 1532 505.600, 1531.827 196, 1531.616 196 C 1531.404 196, 1471.780 266.313, 1399.117 352.250 M 0.487 1722 C 0.487 1804.775, 0.605 1838.637, 0.750 1797.250 C 0.894 1755.862, 0.894 1688.137, 0.750 1646.750 C 0.605 1605.362, 0.487 1639.225, 0.487 1722"
                      stroke="#000"
                      fill="none"
                      strokeWidth={8}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 2,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                      onAnimationComplete={() => setAnimationDone(true)}
                    />
                  </motion.svg>
                </div>

                {/* 品牌字樣 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                  className="text-[17px] tracking-widest mt-4 font-['Noto_Sans_TC',_sans-serif]"
                >
                  <Image
                    src="/images/宜園建設LOGO-1.png"
                    alt="yi-yuan-logo"
                    placeholder="empty"
                    loading="lazy"
                    width={200}
                    height={90}
                    className="max-w-[130px]"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
