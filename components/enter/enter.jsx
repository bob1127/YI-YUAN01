"use client";

import styles from "./style.module.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";

export default function Index() {
  // 狀態
  const [animationDone, setAnimationDone] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [hideAll, setHideAll] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [slide, setSlide] = useState(0);

  // 降低動效
  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // 首次造訪判斷：若已經看過，直接不顯示此元件
  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = window.localStorage.getItem("yy_intro_done");
    if (seen === "1") {
      setShowIntro(false);
      setHideAll(true); // 直接卸載，讓後方頁面顯示
    }
  }, []);

  // 尺寸（如果別處用得到可保留）
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleLoad = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    handleLoad();
    window.addEventListener("resize", handleLoad);
    return () => window.removeEventListener("resize", handleLoad);
  }, []);

  // Intro 結束 -> 關閉（進到 Preload）
  useEffect(() => {
    if (!animationDone) return;
    const t = setTimeout(() => setShowIntro(false), 500);
    return () => clearTimeout(t);
  }, [animationDone]);

  // 文案輪播
  useEffect(() => {
    if (showIntro) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % 3), 5200);
    return () => clearInterval(id);
  }, [showIntro]);

  // 片頭淡出動畫
  const introExit = {
    opacity: 0,
    scale: 1.05,
    filter: "blur(8px)",
    transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
  };

  // 文字動畫
  const groupVariants = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 18 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      y: reduceMotion ? 0 : 18,
      transition: { duration: 0.55, ease: [0.4, 0, 1, 1] },
    },
  };
  const lineVariants = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: {
      opacity: 0,
      y: reduceMotion ? 0 : 10,
      transition: { duration: 0.45 },
    },
  };

  const slides = [
    {
      title: "實在的構築",
      sub: "TRUE ARCH",
      body: "從基地的風向、光線到一磚一瓦，回應土地而生。不是張揚的形狀，而是安穩的秩序；讓回家成為日常最踏實的風景。",
    },
    {
      title: "實在的構築",
      sub: "TRUE ARCH",
      body: "我們相信好房子像土壤，滋養一家人的四季。動線純粹、材質溫潤、收納有序，在忙與靜之間，留給生活剛好的喘息。",
    },
    {
      title: "實在的構築",
      sub: "TRUE ARCH",
      body: "少一點華麗，多一些誠意。以結構與工法守護耐久，以光影與通風帶來舒適；每一天，都被細節溫柔托住。",
    },
  ];

  const handleEnter = () => {
    try {
      window.localStorage.setItem("yy_intro_done", "1"); // 記錄看過
    } catch (e) {}
    setHideAll(true); // 卸載元件，讓後方頁面顯示
  };

  // ===== Enter 按鈕 GSAP 磁吸 =====
  const magnetWrapRef = useRef(null);
  const btnRef = useRef(null);
  useEffect(() => {
    if (reduceMotion) return;
    const wrap = magnetWrapRef.current;
    const btn = btnRef.current;
    if (!wrap || !btn) return;

    const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3.out" });

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.15;
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.15;
      xTo(dx);
      yTo(dy);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [reduceMotion]);

  // ⚠️ 注意：return 要放在所有 hooks 之後，避免 hooks 計數錯亂
  if (hideAll) return null;

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* ===== Preload：影片背景 + 文字輪播 ===== */}
      {!showIntro && (
        <motion.div
          className="fixed inset-0 z-[999999] bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0">
            <motion.video
              autoPlay
              muted
              playsInline
              loop
              preload="metadata"
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
            </motion.video>
          </div>

          {/* 左上 LOGO */}
          <div className="absolute left-6 top-6 z-20">
            <Image
              src="/images/宜園建設LOGO-white.png"
              alt="yi-yuan-logo"
              width={180}
              height={60}
              className="w-28 sm:w-36 md:w-36 h-auto"
              priority
            />
          </div>

          {/* 遮罩 */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/30 to-transparent" />

          {/* 中央文案 + Enter */}
          <div className="relative z-20 h-full w-full flex items-center justify-center px-6">
            <div className="text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide}
                  variants={groupVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <motion.h1
                    variants={lineVariants}
                    className="text-white font-semibold leading-tight tracking-wide text-[clamp(28px,5.5vw,44px)]"
                  >
                    {slides[slide].title}
                  </motion.h1>
                  <motion.div
                    variants={lineVariants}
                    className="mt-2 text-[clamp(14px,2.8vw,20px)] tracking-[0.35em] text-[#E8D9B5]"
                  >
                    {slides[slide].sub}
                  </motion.div>
                  <motion.p
                    variants={lineVariants}
                    className="mt-6 max-w-[70ch] mx-auto text-white/90 text-[clamp(13px,2.2vw,16px)] leading-relaxed"
                    style={{ textWrap: "balance" }}
                  >
                    {slides[slide].body}
                  </motion.p>
                </motion.div>
              </AnimatePresence>

              {/* Enter 按鈕（磁吸 + 玻璃霧面 + 光帶） */}
              <div
                ref={magnetWrapRef}
                className="relative mt-10 inline-block group"
                aria-hidden={reduceMotion ? "true" : "false"}
              >
                <div className="pointer-events-none absolute -inset-[2px] rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,.5),rgba(232,217,181,.65),rgba(255,255,255,.5))] opacity-60  transition" />
                <button
                  ref={btnRef}
                  onClick={handleEnter}
                  className="relative z-10 inline-flex items-center gap-2 rounded-full px-7 py-3 bg-white/15 backdrop-blur-md text-white border border-white/30 hover:border-white/60 transition-colors"
                >
                  <span className="relative z-10 font-medium tracking-wider">
                    Enter
                  </span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    className="translate-y-[1px] transition-transform duration-300 group-hover:translate-x-1"
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
                  <span className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,.35),transparent_55%)] opacity-70" />
                </button>
                <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition duration-500 blur-xl bg-[radial-gradient(60%_80%_at_50%_50%,rgba(232,217,181,.45),transparent_70%)]" />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ===== Intro（SVG 畫線） ===== */}
      <AnimatePresence mode="wait">
        {showIntro && !hideAll && (
          <motion.div
            key="intro"
            exit={introExit}
            className={styles.introduction}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000000,
              backgroundColor: "#160e0a",
            }}
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
                      stroke="#fff"
                      fill="none"
                      strokeWidth={8}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2.5, ease: "easeInOut" }}
                    />
                    <motion.path
                      d="M 213 786 L 213 1572 106.500 1572 L 0 1572 0 1722 L 0 1872.001 1029.250 1871.750 L 2058.500 1871.500 2058.799 1725 C 2058.963 1644.425, 2058.812 1575.237, 2058.463 1571.250 L 2057.829 1564 1954.915 1564 L 1852 1564 1852 782 L 1852 0 1694.750 0.008 L 1537.500 0.015 1337.250 231.151 L 1137 462.286 1137 1017.143 L 1137 1572 1029 1572 L 921 1572 921 1017.142 L 921 462.283 724.822 231.142 L 528.644 0 370.822 0 L 213 0 213 786 M 516.249 877.666 L 516.500 1559.500 655.250 1559.754 L 794 1560.007 794 1035.190 L 794 510.372 656.074 353.461 C 580.214 267.159, 517.664 196.388, 517.073 196.191 C 516.308 195.936, 516.071 391.945, 516.249 877.666 M 1399.117 352.250 L 1267.002 508.500 1267.001 1040.250 L 1267 1572 1399.500 1572 L 1532 1572 1532 884 C 1532 505.600, 1531.827 196, 1531.616 196 C 1531.404 196, 1471.780 266.313, 1399.117 352.250 M 0.487 1722 C 0.487 1804.775, 0.605 1838.637, 0.750 1797.250 C 0.894 1755.862, 0.894 1688.137, 0.750 1646.750 C 0.605 1605.362, 0.487 1639.225, 0.487 1722"
                      stroke="#fff"
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

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                  className="mt-4"
                >
                  <Image
                    src="/images/宜園建設LOGO-white.png"
                    alt="yi-yuan-logo"
                    width={220}
                    height={100}
                    className="w-[140px] sm:w-[180px] md:w-[220px] h-auto"
                    priority
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
