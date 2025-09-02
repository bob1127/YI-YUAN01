// app/project/page.jsx  或  pages/project.jsx
"use client";

import { useRef, useState, useEffect } from "react";
import Layout from "../Layout";
import Image from "next/image";
import Link from "next/link";
import { BsTelephone, BsChatDots, BsChevronDown } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const Project = () => {
  const gallery = [
    "/images/project/S__3497987_0.jpg",
    "/images/project/S__3497988(1).jpg",
    "/images/project/S__3497989_0.jpg",
    "/images/project/S__3497990_0.jpg",
    "/images/project/S__3497991_0.jpg",
    "/images/project/S__3497992_0.jpg",
  ];

  const faqs = [
    {
      q: "產品規劃與坪數？",
      a: "規劃為連棟透天，建坪約 102–134 坪；實際以建築平面與權狀為準。",
    },
    { q: "社區規模與樓高？", a: "總戶數 15 戶、總樓高 4 層。" },
    { q: "結構與停車規劃？", a: "RC 鋼筋混凝土結構；地下室停車。" },
    { q: "土地使用分區與基地？", a: "土地使用分區為住一，基地面積約 534 坪。" },
    {
      q: "團隊資訊？",
      a: "建設：宜園建設；建築設計：劉偉彥建築師事務所；企劃銷售：晟揮廣告國際有限公司。",
    },
  ];
  const [openIdx, setOpenIdx] = useState(null);

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

  // 只在 thumbsSwiper 準備好時才傳 thumbs prop，避免傳 null 造成 Object.assign 錯誤
  const thumbsProp =
    thumbsSwiper && !thumbsSwiper.destroyed
      ? { thumbs: { swiper: thumbsSwiper } }
      : {};

  return (
    <Layout>
      {/* 左右 50/50：左 Gallery（小圖在大圖下方），右 資訊 */}
      <section className="pt-[150px] pb-10  bg-gray-50 ">
        <div className="w-[85%] max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 左：6 欄 */}
          <div className="lg:col-span-6 min-w-0">
            {/* 主圖 */}
            <div className="relative w-full min-w-0 aspect-[4/3] lg:aspect-[3/2] rounded overflow-hidden">
              <Swiper
                onSwiper={setMainSwiper}
                loop
                navigation={false}
                modules={[FreeMode, Navigation, Thumbs]}
                className="w-full h-full"
                {...thumbsProp} // ✅ thumbs 準備好才帶入
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

            {/* 縮圖（下方，所有斷點顯示） */}
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
              <span>3D外觀示意圖，本公司保有修改之權利</span>
            </div>
          </div>

          {/* 右：6 欄（資訊） */}
          <div className="lg:col-span-6 pl-0 lg:pl-8 min-w-0">
            <div id="next-section" className="py-0 sm:py-2">
              <div className="flex flex-col mb-5">
                <h2 className="text-3xl mb-8">建案名稱：宜園大院</h2>
                <h2 className="text-3xl">建案資訊：</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-3 text-sm sm:text-base">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">地址</span>
                  <span className="text-gray-900">台中市南屯區大墩南一街</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">產品規劃</span>
                  <span className="text-gray-900">連棟透天</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">總戶數</span>
                  <span className="text-gray-900">15 戶</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">總樓高</span>
                  <span className="text-gray-900">4 層</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">土地使用分區</span>
                  <span className="text-gray-900">住一</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">基地面積</span>
                  <span className="text-gray-900">約 534 坪</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">構造種類</span>
                  <span className="text-gray-900">RC 鋼筋混凝土</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">建坪</span>
                  <span className="text-gray-900">約 102–134 坪</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">車位類別</span>
                  <span className="text-gray-900">地下室停車</span>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Image
                  src="/images/宜園建設LOGO-1.png"
                  alt="brand-logo"
                  width={120}
                  height={50}
                  className="h-auto w-[120px]"
                />
                <div>
                  <div className="text-sm text-gray-500">團隊資訊</div>
                  <div className="text-base font-medium text-[#20382c]">
                    建設：宜園建設｜
                    <br />
                    建築設計：劉偉彥建築師事務所｜
                    <br />
                    企劃銷售：晟揮廣告國際有限公司
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* thumbs 聚焦黑框樣式 */}
          <style jsx global>{`
            .swiper-slide-thumb-active .thumb {
              outline: 2px solid #000;
              outline-offset: 0;
            }
          `}</style>
        </div>
      </section>

      {/* 地段與周邊（已保留；實景 3D 已刪除） */}
      <section className="py-10 px-10 sm:py-14 bg-emerald-50/40">
        <div className="w-[85%] max-w-[1800px] mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#20382c]">
            地段與周邊
          </h2>
          <p className="mt-2 text-gray-700">
            座落台中市南屯區大墩南一街，連棟透天產品、戶數精巧，地下室停車，生活圈成熟、交通機能便捷。
          </p>

          <div className="mt-6 grid grid-cols-1">
            <div className="rounded-2xl overflow-hidden border">
              <iframe
                title="map"
                src="https://maps.google.com/maps?q=%E5%8F%B0%E4%B8%AD%E5%B8%82%E5%8D%97%E5%B1%AF%E5%8D%80%E5%A4%A7%E5%A2%A9%E5%8D%97%E4%B8%80%E8%A1%97&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-[320px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}

      {/* 固定聯絡 CTA */}
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
