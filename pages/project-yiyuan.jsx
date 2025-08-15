"use client";
import { useRef, useState } from "react";
import Layout from "./Layout";
import Image from "next/image";
import gsap from "gsap";
import Link from "next/link";
import { BsSearch } from "react-icons/bs";

import {
  BsTelephone,
  BsChatDots,
  BsDownload,
  BsChevronDown,
} from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

const project = () => {
  // 👉 Hero 與圖庫資料（自行替換）
  const hero = {
    image: "/images/project/DSC_2058.jpg",
    title: "宜園大院",
    subtitle: "實在的構築 · 豪華電梯別墅",
    tagline: "以人為本，打造真正適居的生活器皿",
  };

  const highlights = [
    "雙車位",
    "5 大套房",
    "電梯別墅",
    "學區旁",
    "靜巷低密度",
    "2022年完工",
  ];

  const gallery = [
    "/images/project/S__31399939.jpg",
    "/images/project/S__31399941.jpg",
    "/images/project/烏日區五張犁西段474地號(誠境5)-完工實景照片03-1090219.jpg",
    "/images/project/DSC_1962.jpg",
    "/images/project/宜園誠境實景照片03-1041020.jpg",
    "/images/pexels-photo-323780.webp",
  ];

  const faqs = [
    {
      q: "可否客變或局部客製？",
      a: "視工期與結構階段而定，細節請與專員聯繫評估可行與費用。",
    },
    {
      q: "車位配置與大小？",
      a: "每戶預留雙車位，建議現場會勘實際動線與尺寸以確保車型合適。",
    },
    {
      q: "周遭生活機能？",
      a: "步行可達學區與便利商店，車程數分鐘可達市場、超商與主要幹道。",
    },
    {
      q: "付款與貸款方案？",
      a: "可彈性規劃，包含自備款與房貸搭配，專員將提供試算表與建議。",
    },
  ];

  const [openIdx, setOpenIdx] = useState(null);
  const specs = [
    { label: "建築形態", value: "豪華電梯別墅" },
    { label: "基地面積", value: "78.96 坪" },
    { label: "戶數規劃", value: "2 戶" },
    { label: "樓層規劃", value: "4 樓半" },
    { label: "地坪規劃", value: "39.33 ~ 39.63 坪" },
    { label: "建坪規劃", value: "88.05 坪" },
    { label: "房數規劃", value: "5 大套房" },
    { label: "基地位置", value: "雲林縣斗南鎮莊敬街" },
    { label: "完工日期", value: "2022" },
  ];
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

    const DURATION_MS = 1400; // 總時長，可調：1200~1800 都很順
    const start = performance.now();

    // 極慢→很快（指數型加速）
    const easeInExpo = (t) => (t === 0 ? 0 : Math.pow(2, 10 * (t - 1)));
    // 若想再更猛：把 10 改成 12~14

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
      <section className="relative aspect-[16/6.5] w-full overflow-hidden">
        <Image
          src={hero.image}
          alt={hero.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
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
              <div className="text-white text-xs mt-2">Scroll</div>
            </div>
          </div>
        </div>

        {/* 讓跑線動畫生效 */}
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

      {/* ============ 賣點亮點 ============ */}
      <section className="py-10 sm:py-14">
        <div className="w-[90%] max-w-[1100px] mx-auto">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#20382c]">
              建案亮點
            </h2>
            <div className="flex gap-2 sm:gap-3 flex-wrap">
              {highlights.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-emerald-800/20 bg-emerald-50 px-3 py-1 text-sm text-emerald-800"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 規格 + 品牌敘事 ============ */}
      <section className="py-6 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-10 w-[90%] max-w-[1200px] mx-auto items-center">
          {/* 左：品牌形象圖 */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="/images/pexels-photo-323780.webp"
                alt="project-brand"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* 右：LOGO、標語、規格 */}
          <div className="w-full lg:w-1/2">
            <Image
              src="/images/宜園建設LOGO-1.png"
              alt="brand-logo"
              width={440}
              height={180}
              className="max-w-[120px] h-auto"
            />
            <h3 className="text-lg font-semibold mt-3 text-[#20382c]">
              實在的構築
            </h3>

            <div className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {specs.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-sm"
                  >
                    <div className="text-[12px] sm:text-xs tracking-wider text-gray-500">
                      {item.label}
                    </div>
                    <div className="mt-1 text-lg sm:text-xl font-semibold text-gray-900">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 下載 DM / 戶型圖 CTA */}
            <div className="mt-6 flex gap-3">
              <Link
                href="/files/yiyuan-brochure.pdf"
                className="inline-flex items-center gap-2 rounded-xl bg-[#20382c] px-4 py-2 text-white hover:opacity-90 transition"
              >
                <BsDownload /> 下載建案 DM
              </Link>
              <Link
                href="/plans"
                className="inline-flex items-center gap-2 rounded-xl border border-[#20382c] px-4 py-2 text-[#20382c] hover:bg-[#20382c] hover:text-white transition"
              >
                戶型與平面圖
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 圖庫 ============ */}
      <section className="py-6 sm:py-12">
        <div className="w-[92%] max-w-[1400px] mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#20382c] mb-6">
            實景 / 3D 圖庫
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gallery.map((src, i) => (
              <div
                key={src}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl group"
              >
                <Image
                  src={src}
                  alt={`gallery-${i}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 地段與周邊 ============ */}
      <section className="py-10 sm:py-14 bg-emerald-50/40">
        <div className="w-[92%] max-w-[1200px] mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#20382c]">
            地段與周邊
          </h2>
          <p className="mt-2 text-gray-700">
            座落雲林縣斗南鎮莊敬街，鄰近學區與主要幹道，靜巷純住宅區，生活機能與靜謐兼具。
          </p>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 地圖（可換成真實 Google Maps iframe 或第三方地圖） */}
            <div className="rounded-2xl overflow-hidden border">
              <iframe
                title="map"
                src="https://maps.google.com/maps?q=%E9%9B%B2%E6%9E%97%E7%B8%A3%E6%96%97%E5%8D%97%E9%8E%AE%E8%8E%8A%E6%95%AC%E8%A1%97&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-[320px]"
                loading="lazy"
              />
            </div>

            {/* 周邊摘要 */}
            <ul className="grid grid-cols-2 gap-3 text-sm">
              <li className="rounded-xl bg-white p-4 border">學區 3–8 分鐘</li>
              <li className="rounded-xl bg-white p-4 border">
                超商/市場 5–10 分鐘
              </li>
              <li className="rounded-xl bg-white p-4 border">
                快速道路 10–15 分鐘
              </li>
              <li className="rounded-xl bg-white p-4 border">靜巷低密度住宅</li>
            </ul>
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

export default project;
