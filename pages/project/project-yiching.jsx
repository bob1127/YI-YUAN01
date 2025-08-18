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
    image: "/images/project/DSC_2058.jpg",
    title: "宜園一青隱",
    subtitle: "",
    tagline: "",
  };

  const gallery = [
    "/images/project/S__31399941.jpg",
    "/images/project/S__31399941.jpg",
    "/images/project/S__31399941.jpg",
  ]; // ✅ 只有一張也可開啟 Lightbox

  const faqs = [
    {
      q: "坪數與房型為何？",
      a: "規劃 1 房約 14–16 坪、2 房約 21–24 / 25–28 坪，實際以建築平面與銷售現況為準。",
    },
    {
      q: "停車規劃？",
      a: "一樓平面式車位，共規劃約 6 席；實際配比與售價以現場資訊為準。",
    },
    {
      q: "完工時程？",
      a: "官方資料顯示預計 2027 年上半年完工，仍可能依工期調整。",
    },
    {
      q: "社區規模與樓高？",
      a: "共 20 戶；總樓高 6 層，為小型社區產品。",
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
    document.documentElement.style.overflow = "hidden"; // 鎖卷軸
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.documentElement.style.overflow = ""; // 解鎖
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
            <img
              src="/images/project/S__31399941.jpg"
              alt="建案亮點"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 右側卡片列表 */}
        </div>
      </section>

      {/* ============ 規格（精簡版） ============ */}
      <section id="next-section" className="py-6 sm:py-12">
        <div className="w-[90%] max-w-[1200px] mx-auto">
          {/* 1) 頁首一句話摘要 */}
          <div className="mb-6 text-sm sm:text-base text-gray-700">
            台中市西屯區甘州五街｜20 戶 / 6 樓｜預計 2027 上半年完工
          </div>

          {/* 2) 關鍵指標條（徽章） */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
            {[
              "1房 14–16 坪",
              "2房 21–28 坪",
              "公設比 37.9%",
              "RC 鋼筋混凝土",
              "一樓平面車位",
              "基地 106 坪",
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
              <span className="text-gray-500">土地使用分區</span>
              <span className="text-gray-900">住二</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">基地面積</span>
              <span className="text-gray-900">106 坪</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">建設公司</span>
              <span className="text-gray-900">宜園建設</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">建築設計</span>
              <span className="text-gray-900">鼎承建築師事務所</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">企劃銷售</span>
              <span className="text-gray-900">晟揮廣告國際有限公司</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">車位數量</span>
              <span className="text-gray-900">6 位（規劃）</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">歷史成交區間</span>
              <span className="text-gray-900">約 52.88–59.32 萬/坪</span>
            </div>
          </div>

          {/* 品牌小區塊 */}
          <div className="mt-8 flex items-center gap-4">
            <Image
              src="/images/宜園建設LOGO-1.png"
              alt="brand-logo"
              width={120}
              height={50}
              className="h-auto w-[120px]"
            />
            <div>
              <div className="text-sm text-gray-500">品牌理念</div>
              <div className="text-base font-medium text-[#20382c]">
                「實在的構築」— 以人為本，打造真正適居的生活器皿
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 圖庫（可點擊開啟 Lightbox） ============ */}
      <section className="py-6 sm:py-12">
        <div className="w-[92%] max-w-[1400px] mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#20382c] mb-6">
            實景 / 3D 圖庫
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
              // 點背景關閉（避免點到圖片本體）
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
            座落台中市西屯區甘州五街，位於四期重劃區。生活圈完善，近主要幹道與商圈，社區規模小而靜謐，適合重視生活機能與隱私的族群。
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6">
            {/* 地圖（可換成真實 Google Maps） */}
            <div className="rounded-2xl overflow-hidden border">
              <iframe
                title="map"
                src="https://maps.google.com/maps?q=%E5%8F%B0%E4%B8%AD%E5%B8%82%E8%A5%BF%E5%B1%AF%E5%8D%80%E7%94%98%E5%B7%9E%E4%BA%94%E8%A1%97&t=&z=16&ie=UTF8&iwloc=&output=embed"
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
            <BsTelephone /> 預約賞屋
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
