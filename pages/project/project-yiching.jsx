// app/project/page.jsx  或  pages/project.jsx
"use client";
import { useRef, useState, useEffect } from "react";
import Layout from "../Layout";
import Image from "next/image";
import Link from "next/link";
import { BsTelephone, BsChatDots } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

// Swiper（主圖 + 縮圖）
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const Project = () => {
  // 圖庫
  const gallery = [
    "/images/project/S__31399941.jpg",
    "/images/project/S__31399941.jpg",
    "/images/project/S__31399941.jpg",
  ];

  // ===== Lightbox =====
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

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx > 0 ? prev() : next();
    touchStartX.current = null;
  };

  // ===== Swiper（主圖 + 縮圖）=====
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);

  // thumbs 準備好時才傳，避免 Object.assign null 錯誤
  const thumbsProp =
    thumbsSwiper && !thumbsSwiper.destroyed
      ? { thumbs: { swiper: thumbsSwiper } }
      : {};

  return (
    <Layout>
      {/* 主內容：左圖右文（去掉上方 Hero） */}
      <section id="next-section" className="pt-[150px] pb-10 bg-gray-50">
        <div className="w-[85%] max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 左：主圖 + 下方縮圖（6 欄） */}
          <div className="lg:col-span-6 min-w-0">
            {/* 主圖 */}
            <div className="relative w-full min-w-0 aspect-[4/3] lg:aspect-[3/2] rounded overflow-hidden">
              <Swiper
                onSwiper={setMainSwiper}
                loop
                navigation={false}
                modules={[FreeMode, Navigation, Thumbs]}
                className="w-full h-full"
                {...thumbsProp}
              >
                {gallery.map((src, index) => (
                  <SwiperSlide key={`main-${index}`}>
                    <button
                      type="button"
                      className="w-full h-full relative group"
                      onClick={() => openLightbox(index)}
                      aria-label={`查看大圖 ${index + 1}`}
                    >
                      <Image
                        src={src}
                        alt={`主圖 ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* 底部縮圖 */}
            <div className="mt-3">
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode
                watchSlidesProgress
                modules={[FreeMode, Thumbs]}
                breakpoints={{
                  640: { slidesPerView: 5 },
                  1024: { slidesPerView: 6 },
                }}
                className="w-full"
              >
                {gallery.map((src, index) => (
                  <SwiperSlide key={`thumb-${index}`}>
                    <button
                      type="button"
                      onClick={() => mainSwiper?.slideToLoop(index)}
                      className="relative w-full h-[72px] sm:h-[84px] border rounded overflow-hidden thumb"
                      aria-label={`切換至第 ${index + 1} 張`}
                    >
                      <Image
                        src={src}
                        alt={`縮圖 ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* 被選縮圖黑框 */}
            <style jsx global>{`
              .swiper-slide-thumb-active .thumb {
                outline: 2px solid #000;
                outline-offset: 0;
              }
            `}</style>
          </div>

          <div className="lg:col-span-6 pl-0 lg:pl-8 min-w-0">
            <div id="next-section" className="py-0 sm:py-2">
              <div className="flex flex-col mb-5">
                <h2 className="text-3xl mb-8">宜園 一青隱</h2>
                <h2 className="text-3xl">建案資訊：</h2>
              </div>

              <div className="grid grid-cols-1 max-w-[450px] gap-x-10 gap-y-3 text-sm sm:text-base">
                <div className="flex  gap-4">
                  <span className="text-gray-500">建案地址</span>
                  <span className="text-gray-900">台中市西屯區甘州五街</span>
                </div>
                <div className="flex  gap-4">
                  <span className="text-gray-500">產品規劃</span>
                  <span className="text-gray-900">集合式住宅大樓</span>
                </div>
                <div className="flex  gap-4">
                  <span className="text-gray-500">建築團隊</span>
                  <span className="text-gray-900">鼎承建築師事務所</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 地段與周邊 */}
      <section className="py-10 sm:py-14 bg-emerald-50/40">
        <div className="w-[92%] max-w-[1400px] mx-auto">
          <div className="mt-6 grid grid-cols-1 gap-6">
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

      {/* Lightbox（點主圖開啟） */}
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

              <button
                onClick={closeLightbox}
                className="absolute -top-10 right-0 sm:top-3 sm:right-3 rounded-full border border-white/30 px-3 py-1.5 text-white/90 text-sm hover:bg-white/10"
                aria-label="close"
              >
                關閉 ✕
              </button>
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

      {/* 固定聯絡 CTA */}
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
