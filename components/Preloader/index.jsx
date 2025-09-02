// app/(site)/page.jsx  or  any client page component
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic"; // ✅ 關閉 SSR（避免伺服器載入 GSAP/DOM）
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import Image from "next/image";
import { motion } from "framer-motion";

// （如果真的要用 Icon / 其他元件再打開）
// import { BsCart, BsArrowRight } from "react-icons/bs";
// import HeroSlider from "../HeroSlider/page";
// import GsapText from "../../components/RevealText";

function Home() {
  /* ----------------------- State & Refs ----------------------- */
  const pathname = usePathname();
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  // 追蹤背景圖輪播（如不需要可刪）
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);

  const backgroundImages = useMemo(
    () => [
      "/images/宜園誠境實景照片.jpg",
      "/images/JPOM9734.jpg",
      "/images/JPOM9756.jpg",
      "/images/img001.png",
    ],
    []
  );

  // 降低動效：系統層級偏好
  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  /* ----------------------- Effects ----------------------- */

  // ✅ GSAP 初始化
  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    if (!gsap.parseEase("hop")) {
      CustomEase.create("hop", "0.9, 0, 0.1, 1");
    }
  }, []);

  // ✅ 讓影片在 iOS / Safari 上穩定自動播放
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // 必要屬性：muted + playsInline + autoplay
    v.muted = true;
    v.playsInline = true;

    const tryPlay = async () => {
      try {
        await v.play();
      } catch {
        // 若被阻擋，等到可播放再試一次
      }
    };

    // 若 metadata 已就緒就試播
    const onLoadedMeta = () => tryPlay();
    const onCanPlay = () => {
      setVideoReady(true);
      tryPlay();
    };

    v.addEventListener("loadedmetadata", onLoadedMeta);
    v.addEventListener("canplay", onCanPlay);

    // 部分瀏覽器需要「使用者互動後」才允許播放，保險起見再綁一次
    const resumeOnUserGesture = () => tryPlay();
    window.addEventListener("pointerdown", resumeOnUserGesture, { once: true });

    return () => {
      v.removeEventListener("loadedmetadata", onLoadedMeta);
      v.removeEventListener("canplay", onCanPlay);
      window.removeEventListener("pointerdown", resumeOnUserGesture);
    };
  }, [pathname]);

  // ✅ 每 5 秒切換背景圖片（若你只用影片可以刪掉這段）
  useEffect(() => {
    const timer = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, backgroundImages.length]);

  // ✅ Hero 文字進場（不被 loader 擋、且立即顯示）
  useGSAP(() => {
    if (reduceMotion) return;
    const tl = gsap.timeline({ defaults: { ease: "hop" } });
    tl.fromTo(
      ".hero-title",
      { yPercent: 20, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.8 }
    );
    tl.fromTo(
      ".hero-subtitle",
      { yPercent: 20, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.8 },
      "-=0.4"
    );
  }, [reduceMotion]);

  /* ----------------------- Render ----------------------- */
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* 背景圖（做為影片失敗時的保底） */}
      <div className="absolute inset-0 -z-20">
        {/* 使用 next/image 需要父層 relative */}
        <div className="relative w-full h-full">
          <Image
            src={backgroundImages[currentIndex]}
            alt="Background Fallback"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* 影片背景層 */}
      <div className=" inset-0 h-screen -z-10">
        <motion.video
          key={pathname === "/" ? "home-video" : "default-video"} // 進入首頁時強制 remount
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          poster="/images/宜園誠境實景照片.jpg"
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: videoReady ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <source
            src="/videos/2882118-uhd_3840_2160_24fps.mp4"
            type="video/mp4"
          />
          {/* 若瀏覽器不支援 video，會顯示此文字 */}
          您的瀏覽器不支援 HTML5 影片。
        </motion.video>
      </div>

      {/* 內容層 */}
      <div className="relative z-10 flex items-center justify-center h-screen px-6">
        <div className="text-center">
          <h1 className="hero-title text-white text-[clamp(1.8rem,5vw,3rem)] font-semibold tracking-wide">
            Yi-Yuan
          </h1>
          <p className="hero-subtitle mt-2 text-white/85 text-[clamp(1rem,2.6vw,1.25rem)]">
            誠境 · 實景 · 美好生活
          </p>
        </div>
      </div>

      {/* 可選：覆蓋一層漸層提升文字可讀性 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/20"
      />
    </div>
  );
}

// ✅ 關閉 SSR，避免伺服器端載入與 DOM/GSAP 相關物件
export default dynamic(() => Promise.resolve(Home), { ssr: false });
