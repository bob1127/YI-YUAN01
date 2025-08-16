"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic"; // ✅ 關閉 SSR
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CustomEase from "gsap/dist/CustomEase";
import Image from "next/image";
import GsapText from "../../components/RevealText/index";
import { motion } from "framer-motion";

import { BsCart, BsArrowRight } from "react-icons/bs";
import HeroSlider from "../HeroSlider/page";

function Home() {
  const [showLoader, setShowLoader] = useState(false);

  // 第一次進站顯示 loader（仍然會立即隱藏，避免遮住文案）
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShowLoader(true);
      localStorage.setItem("hasVisited", "true");
    } else {
      setShowLoader(false);
    }
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);

  const backgroundImages = [
    "/images/宜園誠境實景照片.jpg",
    "/images/JPOM9734.jpg",
    "/images/JPOM9756.jpg",
    "/images/img001.png",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const people = [
    {
      id: 1,
      name: "John Doe",
      designation: "業務人員",
      qrCodeImage:
        "https://thumb.ac-illust.com/bd/bd2c033b5a0f028d5d0a5f63223c0781_t.jpeg",
      image:
        "/images/烏日區五張犁西段474地號(誠境5)-完工實景照片03-1090219.jpg",
    },
    {
      id: 2,
      name: "John Doe",
      designation: "買屋看房",
      qrCodeImage:
        "https://thumb.ac-illust.com/bd/bd2c033b5a0f028d5d0a5f63223c0781_t.jpeg",
      image: "/images/hero-img/img05.png",
    },
    {
      id: 3,
      name: "John Doe",
      designation: "詢問價格",
      qrCodeImage:
        "https://thumb.ac-illust.com/bd/bd2c033b5a0f028d5d0a5f63223c0781_t.jpeg",
      image: "/images/hero-img/img06.png",
    },
    {
      id: 4,
      name: "John Doe",
      designation: "詢問價格",
      qrCodeImage:
        "https://thumb.ac-illust.com/bd/bd2c033b5a0f028d5d0a5f63223c0781_t.jpeg",
      image: "/images/hero-img/img07.png",
    },
  ];

  const [showNav, setShowNav] = useState(true);
  let lastScrollY = 0;

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) setShowNav(false);
        else setShowNav(true);
        lastScrollY = currentScrollY;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create("hop", "0.9, 0, 0.1, 1");
  }, []);

  // GSAP 進場：一開始就把 loader 關掉，避免遮住文案
  useGSAP(() => {
    const tl = gsap.timeline({
      delay: 0,
      defaults: { ease: "hop" },
    });

    // 關閉/隱藏 loader（若不存在此 class 也不會報錯）
    tl.set(".loader", { display: "none", pointerEvents: "none" }, 0);

    const counts = document.querySelectorAll(".count");
    counts.forEach((count, index) => {
      const digits = count.querySelectorAll(".digit h1");
      tl.to(digits, { y: "0%", duration: 1, stagger: 0.075 }, index * 1);
      if (index < counts.length) {
        tl.to(
          digits,
          { y: "-100%", duration: 1, stagger: 0.075 },
          index * 1 + 1
        );
      }
    });

    tl.to(".word h1", { y: "0%", duration: 1 }, "<");
    tl.to(".divider", {
      scaleY: "100%",
      duration: 1,
      onComplete: () =>
        gsap.to(".divider", { opacity: 0, duration: 0.3, delay: 0.3 }),
    });
    tl.to("#word-1 h1", { y: "100%", duration: 1, delay: 0.3 });
    tl.to("#word-2 h1", { y: "-100%", duration: 1 }, "<");
    tl.to(
      ".preloader-block",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        stagger: 0.1,
        delay: 0.75,
        onStart: () =>
          gsap.to(".hero-img", { scale: 1, duration: 2, ease: "hop" }),
      },
      "<"
    );
    tl.to(
      [".nav", ".line h1", ".line p"],
      { y: "0%", duration: 1.5, stagger: 0.2 },
      "<"
    );
    tl.to(
      [".cta", ".cta-icon"],
      { scale: 1, duration: 1.5, stagger: 0.75, delay: 0.75 },
      "<"
    );
    tl.to(".cta-label p", { y: "0%", duration: 1.5, delay: 0.5 }, "<");
  });

  return (
    <>
      {/* 若有 loader，className 請用 .loader（會被 GSAP 立即隱藏） */}

      <div className="container w-full max-w-[100%]">
        <div className="hero-img">
          <Image src="/hero-img.jpg" alt="KindRoot Hero Image" fill priority />
        </div>

        <div className="nav">{/* 導航略 */}</div>

        <div
          id="dark-section"
          className="relative w-full aspect-[16/9] md:aspect-[1024/576]"
        >
          <section className="section-hero w-full aspect-[500/500] sm:aspect-[500/400] md:aspect-[1024/768] xl:aspect-[1920/1080] 2xl:aspect-[1920/1080] overflow-hidden relative">
            {/* 背景輪播（淡入淡出＋慢速縮放） */}
            {backgroundImages.map((bg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 1 }}
                animate={{
                  opacity: i === currentIndex ? 1 : 0,
                  scale: i === currentIndex ? 1.15 : 1,
                }}
                transition={{
                  opacity: { duration: 1.5, ease: "easeInOut" },
                  scale: { duration: 20, ease: "linear" },
                }}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{ backgroundImage: `url(${bg})` }}
              />
            ))}
            <div className="bg-black opacity-40 w-full h-full absolute top-0 left-0 z-10" />
          </section>
        </div>

        {/* Hero 文案：掛載就顯示（不受任何延遲） */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full px-4">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0 }}
            className="flex flex-col items-center justify-center text-center space-y-2"
            style={{ opacity: 1, transform: "translateY(0)" }}
          >
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <GsapText
                text="Yi-Yuan"
                id="hero-title-1"
                className="block !text-white !text-[clamp(1.8rem,5vw,3rem)] font-medium leading-tight"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

// 關閉這頁 SSR，避免伺服器載入 gsap / ESM 模組
export default dynamic(() => Promise.resolve(Home), { ssr: false });
