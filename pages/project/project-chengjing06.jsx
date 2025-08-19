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
    image: "/images/project/誠境6/JPOM9756.tif", // TODO: 換成誠境6相關圖片
    title: "誠境6",
    subtitle: "",
    tagline: "",
  };

  // 可放社區外觀或街景；目前先放一張示意
  const gallery = [
    "/images/project/誠境6/JPOM9756.tif",
    "/images/project/誠境6/JPOM9749-2.jpg",
    ,
    "/images/project/誠境6/JPOM9752-2.jpg",
  ];

  const faqs = [
    {
      q: "產品規劃與坪數？",
      a: "規劃為連棟透天（住三分區），建坪約 52–84 坪、地坪約 28–58 坪；實際以現場戶別與權狀為準。",
    },
    {
      q: "社區規模與樓高？",
      a: "總戶數 9 戶、總樓高 4 層。",
    },
    {
      q: "屋齡與交屋狀況？",
      a: "屋齡約 3 年（成屋）。",
    },
    {
      q: "建築結構與停車規劃？",
      a: "RC 鋼筋混凝土結構；車位數量合計約 7 席（依各戶規劃為準）。",
    },
    {
      q: "學區與生活機能？",
      a: "國小學區：竹林國小、北勢國小（雙語）；國中學區：北勢國中、鹿寮國中。位於沙鹿，生活圈成熟，交通幹道機能便利。",
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

      {/* ============ 建案亮點（圖片 + 卡片） ============ */}
      <section className="py-10 sm:py-16 bg-gray-50">
        <div className="w-[90%] max-w-[1200px] mx-auto grid grid-cols-1 items-center">
          {/* 左側圖片 */}
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <Image
              width={1920}
              height={700}
              src="/images/project/誠境6/JPOM9749-2.jpg" // TODO: 換成誠境6圖片
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

          {/* 3) 精簡細節（雙欄列表） */}
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-3 text-sm sm:text-base">
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">土地使用分區</span>
              <span className="text-gray-900">住三</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">產品規劃</span>
              <span className="text-gray-900">連棟透天</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">總戶數</span>
              <span className="text-gray-900">9 戶</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">總樓高</span>
              <span className="text-gray-900">4 層</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">屋齡</span>
              <span className="text-gray-900">約 3 年（成屋）</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">建坪 / 地坪</span>
              <span className="text-gray-900">約 52–84 坪 / 28–58 坪</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">車位數量</span>
              <span className="text-gray-900">約 7 位（依戶別規劃）</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">平均成交總價</span>
              <span className="text-gray-900">約 1,953 萬／戶（7 筆）</span>
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
                建設：宜園建設｜建築：楊千芝建築師事務所｜營造：和園營造｜企劃銷售：宜園建設
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
            座落台中市沙鹿區七賢南路 66
            號，連棟透天產品、戶數精巧，學區完整，日常採買與主要幹道機能成熟，適合講究生活品質與私密性的族群。
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6">
            {/* 地圖（Google Maps） */}
            <div className="rounded-2xl overflow-hidden border">
              <iframe
                title="map"
                src="https://maps.google.com/maps?q=%E5%8F%B0%E4%B8%AD%E5%B8%82%E6%B2%99%E9%B9%BF%E5%8D%80%E4%B8%83%E8%B3%A2%E5%8D%97%E8%B7%AF66%E8%99%9F&t=&z=16&ie=UTF8&iwloc=&output=embed"
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
            className="inline-flex items-center gap-2 rounded-full bg-[#20382c] px-5 py-3 text-white shadow-lg hover:opacity-90 transition"
          >
            <BsTelephone /> 預約看屋
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[#20382c] border shadow hover:bg-emerald-50 transition"
          >
            <BsChatDots /> 線上諮詢
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Project;
