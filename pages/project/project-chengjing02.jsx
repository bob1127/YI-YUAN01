"use client";
import { useRef, useState, useEffect } from "react";
import Layout from "../Layout";
import Image from "next/image";
import Link from "next/link";
import {
  BsTelephone,
  BsChatDots,
  BsDownload,
  BsChevronDown,
} from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

const Project = () => {
  // 👉 Hero 與圖庫資料（可替換成你站內圖）
  const hero = {
    image:
      "/images/project/誠境5/烏日區五張犁西段474地號(誠境5)-完工實景照片03-1090219.jpg", // TODO: 換成誠境5相關圖片
    title: "誠境2",
    subtitle: "",
    tagline: "",
  };

  // 可放社區外觀或街景；目前先放一張示意
  const gallery = [
    "/images/project/誠境5/烏日區五張犁西段474地號(誠境5)-完工實景照片10-1090219-S.tif",
    "/images/project/誠境5/烏日區五張犁西段474地號(誠境5)-完工實景照片08-1090219.jpg",
    "/images/project/誠境5/烏日區五張犁西段474地號(誠境5)-完工實景照片03-1090219.jpg",
  ];

  const faqs = [
    {
      q: "社區規模與樓高？",
      a: "總戶數 6 戶、總樓高 4 層，為小規模門牌。",
    },
    {
      q: "屋齡與現況？",
      a: "屋齡約 5 年，為成屋社區。",
    },
    {
      q: "坪數與建築結構？",
      a: "建坪約 57–77 坪、地坪約 31–65 坪；構造為 RC 鋼筋混凝土。",
    },
    {
      q: "土地使用分區？",
      a: "屬於「鄉村區乙種」。實際使用仍以主管機關法規與權狀標示為準。",
    },
    {
      q: "基地面積與學區？",
      a: "基地約 262 坪；學區為五光國小、光德國中（雙語）。",
    },
  ];
  const [openIdx, setOpenIdx] = useState(null);

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

  // ========= Lightbox（幻燈片） =========
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const containerRef = useRef(null);
  const touchStartX = useRef(null);

  const openLightbox = (i) => {
    setSlide(i);
    setLightboxOpen(true);
    document.documentElement.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.documentElement.style.overflow = "";
  };
  const prev = () => setSlide((s) => (s - 1 + gallery.length) % gallery.length);
  const next = () => setSlide((s) => (s + 1) % gallery.length);

  // 鍵盤事件
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);

  // 觸控滑動
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      dx > 0 ? prev() : next();
    }
    touchStartX.current = null;
  };

  return (
    <Layout>
      {/* ===== Hero ===== */}
      <section className="relative aspect-[16/6.5] w-full overflow-hidden">
        <Image
          src={hero.image}
          alt={hero.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[90%] max-w-[1100px] text-center text-white">
            <motion.h1
              className="text-4xl sm:text-5xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {hero.title}
            </motion.h1>
            <motion.p
              className="mt-3 text-lg sm:text-xl"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
            >
              {hero.subtitle}
            </motion.p>
            <motion.p
              className="mt-2 text-sm sm:text-base text-white/90"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            >
              {hero.tagline}
            </motion.p>

            {/* Scroll 提示 */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-6 flex flex-col items-center">
              <div className="w-px h-16 bg-white/40 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-px h-full bg-white animate-scroll-line" />
              </div>
              <button
                onClick={handleScroll}
                className="mt-2 text-white text-xs hover:underline"
                aria-label="scroll to next section"
              >
                Scroll
              </button>
            </div>
          </div>
        </div>

        {/* 跑線動畫 */}
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

      {/* ============ 建案亮點（圖片 + 卡片） ============ */}
      <section className="py-10 sm:py-16 bg-gray-50">
        <div className="w-[90%] max-w-[1200px] mx-auto grid grid-cols-1 items-center">
          {/* 左側圖片 */}
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <Image
              width={1920}
              height={700}
              placeholder="empty"
              loading="lazy"
              src="/images/project/誠境5/烏日區五張犁西段474地號(誠境5)-完工實景照片08-1090219.jpg" // TODO: 換成誠境5圖片
              alt="建案亮點"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ============ 規格（精簡版） ============ */}
      <section id="next-section" className="py-6 sm:py-12">
        <div className="w-[90%] max-w-[1200px] mx-auto">
          {/* 1) 頁首一句話摘要 */}
          <div className="mb-6 text-sm sm:text-base text-gray-700">
            台中市烏日區五光路 189 巷 6 號｜6 戶 / 4 層｜屋齡約 5 年（成屋）
          </div>

          {/* 2) 關鍵指標條（徽章） */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
            {[
              "建坪 57–77 坪",
              "地坪 31–65 坪",
              "鄉村區乙種",
              "基地 262 坪",
              "RC 結構",
              "7 筆實價",
            ].map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full border border-emerald-800/20 bg-emerald-50 px-3 py-1 text-sm text-emerald-800"
              >
                {t}
              </span>
            ))}
          </div>

          {/* 3) 精簡細節（雙欄列表） */}
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-3 text-sm sm:text-base">
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">地址</span>
              <span className="text-gray-900">五光路189巷6號（烏日）</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">總戶數</span>
              <span className="text-gray-900">6 戶</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">總樓高</span>
              <span className="text-gray-900">4 層</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">屋齡</span>
              <span className="text-gray-900">約 5 年</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">土地使用分區</span>
              <span className="text-gray-900">鄉村區乙種</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">基地面積</span>
              <span className="text-gray-900">約 262 坪</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">建坪 / 地坪</span>
              <span className="text-gray-900">約 57–77 坪 / 31–65 坪</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">構造種類</span>
              <span className="text-gray-900">RC 鋼筋混凝土</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">平均成交總價</span>
              <span className="text-gray-900">約 1,756 萬／戶（7 筆）</span>
            </div>
          </div>

          {/* 品牌／團隊小區塊 */}
          <div className="mt-8 flex items-center gap-4">
            <Image
              src="/images/宜園建設LOGO-1.png" // TODO: 可替換實際LOGO
              alt="brand-logo"
              width={120}
              height={50}
              className="h-auto w-[120px]"
            />
            <div>
              <div className="text-sm text-gray-500">團隊資訊</div>
              <div className="text-base font-medium text-[#20382c]">
                建設：宜園建設｜建築：楊千芝建築師事務所｜營造：和園營造｜企劃銷售：自售
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 圖庫（可點擊開啟 Lightbox） ============ */}
      <section className="py-6 sm:py-12">
        <div className="w-[92%] max-w-[1400px] mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#20382c] mb-6">
            實景 / 圖庫
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gallery.map((src, i) => (
              <button
                key={src}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl group"
                onClick={() => openLightbox(i)}
                aria-label={`open image ${i + 1}`}
              >
                <Image
                  src={src}
                  alt={`gallery-${i}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Lightbox（幻燈片） ===== */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            ref={containerRef}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-[1px] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === containerRef.current) closeLightbox();
            }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* 內容區 */}
            <div className="relative w-[92%] max-w-[1100px] aspect-[16/10] sm:aspect-[16/9]">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={slide}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.2, scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                >
                  <Image
                    src={gallery[slide]}
                    alt={`slide-${slide}`}
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* 關閉按鈕 */}
              <button
                onClick={closeLightbox}
                className="absolute -top-10 right-0 sm:top-3 sm:right-3 rounded-full border border-white/30 px-3 py-1.5 text-white/90 text-sm hover:bg-white/10"
                aria-label="close"
              >
                關閉 ✕
              </button>

              {/* 左右切換 */}
              <button
                onClick={prev}
                className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="prev"
              >
                ‹
              </button>
              <button
                onClick={next}
                className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="next"
              >
                ›
              </button>

              {/* 小圓點 */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    className={`h-2.5 w-2.5 rounded-full ${
                      i === slide ? "bg-white" : "bg-white/40"
                    }`}
                    aria-label={`go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============ 地段與周邊 ============ */}
      <section className="py-10 sm:py-14 bg-emerald-50/40">
        <div className="w-[92%] max-w-[1400px] mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#20382c]">
            地段與周邊
          </h2>
          <p className="mt-2 text-gray-700">
            座落台中市烏日區五光路 189 巷 6
            號。小規模門牌、環境單純，生活圈完善，
            近主要幹道；學區涵蓋五光國小與光德國中（雙語）。
          </p>

          <div className="mt-6 grid grid-cols-1 ">
            {/* 地圖（Google Maps） */}
            <div className="rounded-2xl overflow-hidden border">
              <iframe
                title="map"
                src="https://maps.google.com/maps?q=%E5%8F%B0%E4%B8%AD%E5%B8%82%E7%83%8F%E6%97%A5%E5%8D%80%E4%BA%94%E5%85%89%E8%B7%AF189%E5%B7%B76%E8%99%9F&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-[320px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-10 sm:py-14">
        <div className="w-[92%] max-w-[900px] mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#20382c] mb-4">
            常見問題
          </h2>
          <div className="divide-y rounded-2xl border bg-white">
            {faqs.map((f, idx) => {
              const open = openIdx === idx;
              return (
                <div key={f.q} className="px-5 py-4">
                  <button
                    onClick={() => setOpenIdx(open ? null : idx)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <span className="font-medium">{f.q}</span>
                    <BsChevronDown
                      className={`transition ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden text-gray-600 pt-2"
                      >
                        {f.a}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ 固定聯絡 CTA ============ */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60]">
        <div className="flex gap-3">
          <Link
            href="tel:0912-345-678"
            className="inline-flex items-center w-[140px] justify-center sm:w-auto gap-2 rounded-full bg-[#20382c] text-[14px] px-5 py-3 text-white shadow-lg hover:opacity-90 transition"
          >
            <BsTelephone /> 預約看屋
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center w-[140px] justify-center sm:w-auto  gap-2 rounded-full bg-white px-5 py-3 text-[#20382c] border shadow hover:bg-emerald-50 transition"
          >
            <BsChatDots /> 線上諮詢
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Project;
