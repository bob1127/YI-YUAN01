"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import Layout from "./Layout";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function Photos() {
  const prefersReduced = useReducedMotion();

  // ===== Smooth scroll (hero CTA) =====
  const handleScroll = () => {
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

  // ===== 左欄相簿資料（可維持你的原圖片路徑與標題） =====
  const galleries = useMemo(
    () => [
      {
        sectionTitle: "宜園一青隱",
        date: "114.05",
        layout: "L2R1", // 左二右一
        items: [
          {
            src: "/images/news/樓版清洗.jpg",
            title: "樓版清洗",
            width: 1200,
            height: 800,
          },
          {
            src: "/images/news/樓板施作完成,灌漿前照片.jpg",
            title: "樓板施作完成，灌漿前照片",
            width: 1200,
            height: 800,
          },
          {
            src: "/images/news/正面外觀施工照片.jpg",
            title: "正面外觀施工照片",
            width: 1200,
            height: 1600,
          },
        ],
      },
      {
        sectionTitle: "宜園13期新案",
        date: "114.05",
        layout: "R1L2", // 右一左二
        items: [
          {
            src: "/images/news/土方開挖完成.jpg",
            title: "土方開挖完成",
            width: 1200,
            height: 1600,
          },
          {
            src: "/images/news/擋土柱鋼筋幫紮完成勘驗.jpg",
            title: "擋土柱鋼筋綁紮完成",
            width: 1200,
            height: 800,
          },
          {
            src: "/images/news/擋土柱施作-1.jpg",
            title: "擋土柱施作中",
            width: 1200,
            height: 800,
          },
        ],
      },
    ],
    []
  );

  // ====== 右欄「新聞中心」資料與分頁 ======
  const newsData = useMemo(
    () => [
      {
        id: "n1",
        title: "宜園建設推出極奢豪墅，坐擁捷運、百貨、水岸三重優勢",
        excerpt:
          "南台中13期重劃區因捷運文心南路軸線加持，逐步展現「富人聚落」潛力，鄰近8期、7期、單元四、單元五與南區，區位優勢鮮明。其中，宜園建設攜手國際知名建築大師劉偉彥",
        img: "/images/news/動土典禮/2-67ab1efd657f9.jpg",
        date: "114.05",
      },
      {
        id: "n2",
        title: "13期重劃區話題延燒，豪宅市場買氣升溫",
        excerpt:
          "重劃推進讓生活機能成形，區域價值持續攀升，軌道經濟效益逐步擴散，吸引置產族群目光。",
        img: "/images/news/動土典禮/2-67ab1efd657f9.jpg",
        date: "114.05",
      },
      {
        id: "n3",
        title: "景觀大道完工在即，串聯城市綠帶新樣貌",
        excerpt:
          "基地鄰近大面積綠意軸線與水岸景觀，提供宜居步行路徑，形塑低碳慢活圈。",
        img: "/images/news/動土典禮/2-67ab1efd657f9.jpg",
        date: "114.04",
      },
      {
        id: "n4",
        title: "品牌建築與國際設計合作，質感再升級",
        excerpt:
          "外觀量體以簡潔俐落的框架語彙，透過材質對比與光影層次，呈現永恆經典的當代風格。",
        img: "/images/news/動土典禮/2-67ab1efd657f9.jpg",
        date: "114.04",
      },
      {
        id: "n5",
        title: "基地動工典禮圓滿，工程安全品質雙把關",
        excerpt:
          "施工團隊落實工安管理與品質檢核，建立標準化SOP，以確保工程進度與品質。",
        img: "/images/news/動土典禮/2-67ab1efd657f9.jpg",
        date: "114.03",
      },
      {
        id: "n6",
        title: "公開接待會館啟用，體驗未來生活藍圖",
        excerpt:
          "以沉浸式動線導覽建築、環境與機能，展示多元格局與材質樣本，完整呈現產品力。",
        img: "/images/news/動土典禮/2-67ab1efd657f9.jpg",
        date: "114.03",
      },
      {
        id: "n7",
        title: "智慧宅配備升級，導入門禁宅安系統",
        excerpt:
          "社區公共空間與住家門禁採用多重驗證機制搭配訪客管理，兼顧便利與安全。",
        img: "/images/news/動土典禮/2-67ab1efd657f9.jpg",
        date: "114.02",
      },
      {
        id: "n8a",
        title: "交通樞紐加持，區域可及性大幅提升",
        excerpt:
          "軌道路網串聯核心生活圈，縮短通勤時間，帶動周邊商業服務與居住人口成長。",
        img: "/images/news/動土典禮/2-67ab1efd657f9.jpg",
        date: "114.01",
      },
      {
        id: "n9a",
        title: "宜園品牌誌發刊，分享建築與生活觀點",
        excerpt:
          "從基地選址、量體設計到材料細節，紀錄每個關鍵決策背後的思維與初衷。",
        img: "/images/news/動土典禮/2-67ab1efd657f9.jpg",
        date: "114.01",
      },
      {
        id: "n8b",
        title: "交通樞紐加持，區域可及性大幅提升",
        excerpt:
          "軌道路網串聯核心生活圈，縮短通勤時間，帶動周邊商業服務與居住人口成長。",
        img: "/images/news/動土典禮/2-67ab1efd657f9.jpg",
        date: "114.01",
      },
      {
        id: "n9b",
        title: "宜園品牌誌發刊，分享建築與生活觀點",
        excerpt:
          "從基地選址、量體設計到材料細節，紀錄每個關鍵決策背後的思維與初衷。",
        img: "/images/news/動土典禮/2-67ab1efd657f9.jpg",
        date: "114.01",
      },
    ],
    []
  );

  const ITEMS_PER_PAGE = 5; // 右欄每頁顯示 5 則
  const pageCount = Math.ceil(newsData.length / ITEMS_PER_PAGE);
  const [page, setPage] = useState(0);
  const [prevPage, setPrevPage] = useState(0);
  const direction = page > prevPage ? 1 : page < prevPage ? -1 : 0;

  const pagedItems = useMemo(() => {
    const start = page * ITEMS_PER_PAGE;
    return newsData.slice(start, start + ITEMS_PER_PAGE);
  }, [page, newsData]);

  const goToPage = (next) => {
    setPrevPage(page);
    const clamped = Math.max(0, Math.min(pageCount - 1, next));
    setPage(clamped);
  };
  const nextPage = () => goToPage(page + 1);
  const prevPageFn = () => goToPage(page - 1);

  // ====== Lightbox（彈出式幻燈片） ======
  const [lbOpen, setLbOpen] = useState(false);
  const [lbItems, setLbItems] = useState([]); // 當前群組圖片
  const [lbIndex, setLbIndex] = useState(0);
  const overlayRef = useRef(null);

  const openLightbox = useCallback((groupItems, startIndex = 0) => {
    setLbItems(groupItems);
    setLbIndex(startIndex);
    setLbOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLbOpen(false), []);
  const prevSlide = useCallback(
    () => setLbIndex((i) => (i - 1 + lbItems.length) % lbItems.length),
    [lbItems.length]
  );
  const nextSlide = useCallback(
    () => setLbIndex((i) => (i + 1) % lbItems.length),
    [lbItems.length]
  );

  // 鎖捲動 + 鍵盤控制
  useEffect(() => {
    if (!lbOpen) return;
    const { body } = document;
    const original = body.style.overflow;
    body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [lbOpen, closeLightbox, prevSlide, nextSlide]);

  // 觸控滑動
  const touchStartX = useRef(null);
  const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      dx > 0 ? prevSlide() : nextSlide();
    }
    touchStartX.current = null;
  };

  // 動畫 variants
  const pageVariants = {
    enter: (dir) =>
      prefersReduced
        ? { opacity: 0 }
        : { x: dir > 0 ? 40 : -40, opacity: 0, filter: "blur(6px)" },
    center: prefersReduced
      ? { opacity: 1, transition: { duration: 0.2 } }
      : {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          transition: { duration: 0.45, ease: [0.22, 0.7, 0, 1] },
        },
    exit: (dir) =>
      prefersReduced
        ? { opacity: 0, transition: { duration: 0.15 } }
        : {
            x: dir > 0 ? -40 : 40,
            opacity: 0,
            filter: "blur(6px)",
            transition: { duration: 0.35, ease: "easeInOut" },
          },
  };
  const listStagger = prefersReduced
    ? {}
    : { transition: { staggerChildren: 0.06, delayChildren: 0.04 } };
  const itemVariants = prefersReduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 8 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.35, ease: [0.22, 0.7, 0, 1] },
        },
      };

  return (
    <Layout>
      {/* ===== Hero ===== */}
      <section className="section-hero-title aspect-[16/16] sm:aspect-[16/12] md:aspect-[16/6.5] overflow-hidden mt-14 w-full relative">
        <div className="main-title absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
          <h1 className=" text-3xl text-center font-light sm:text-4xl 2xl:text-6xl text-white">
            NEWS
          </h1>
        </div>

        <div className="mask bg-black/20 w-full h-full top-0 left-0 absolute z-30" />

        <Image
          src="https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg"
          alt="banner"
          fill
          sizes="100vw"
          priority={false}
          className="object-cover object-center sm:object-right md:object-[80%_center]"
        />

        {/* Scroll Down CTA */}
        <motion.button
          type="button"
          onClick={handleScroll}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center z-30 cursor-pointer select-none"
          aria-label="Scroll down"
        >
          <div className="w-px h-16 bg-white/40 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-px h-full bg-white animate-scroll-line" />
          </div>
          <svg
            className="w-6 h-6 text-white mt-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-white text-sm mt-1"
          >
            Down
          </motion.span>
        </motion.button>

        {/* keyframes */}
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

      {/* 內容起點（給捲動用） */}
      <div id="next-section" />

      <section className="section-content py-10 lg:py-20">
        <div className="flex flex-col lg:flex-row max-w-[1920px] mx-auto">
          {/* ===== 左邊：工程進度（點圖開啟 Lightbox） ===== */}
          <div className="left w-full lg:w-1/2">
            {galleries.map((group, gi) => (
              <div key={gi} className="flex flex-col px-4 md:px-8 xl:px-16">
                {/* 區塊標題 */}
                <div className="title pt-10 mb-4 border-b flex justify-between w-full">
                  <h3 className="text-[22px]">{group.sectionTitle}</h3>
                  <span>更新日期：{group.date}</span>
                </div>

                {/* 相片區塊（兩種版型） */}
                {group.layout === "L2R1" ? (
                  <div className="news-img flex flex-col md:flex-row gap-6 items-stretch">
                    {/* 左側兩圖 */}
                    <div className="flex flex-col gap-6 md:w-1/2">
                      {[0, 1].map((idx) => {
                        const it = group.items[idx];
                        return (
                          <div
                            key={idx}
                            className="relative w-full h-[288px] overflow-hidden group"
                          >
                            <button
                              type="button"
                              onClick={() => openLightbox(group.items, idx)}
                              className="absolute inset-0 focus:outline-none"
                              aria-label={`放大檢視：${it.title}`}
                            >
                              <Image
                                src={it.src}
                                alt={it.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority={false}
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            </button>
                            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-r from-black/70 to-transparent flex items-center px-4 pointer-events-none">
                              <p className="text-white text-sm">{it.title}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* 右側一圖（高） */}
                    <div className="md:w-1/2">
                      {(() => {
                        const it = group.items[2];
                        return (
                          <div className="relative w-full h-[600px] overflow-hidden group">
                            <button
                              type="button"
                              onClick={() => openLightbox(group.items, 2)}
                              className="absolute inset-0 focus:outline-none"
                              aria-label={`放大檢視：${it.title}`}
                            >
                              <Image
                                src={it.src}
                                alt={it.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            </button>
                            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-r from-black/70 to-transparent flex items-center px-4 pointer-events-none">
                              <p className="text-white text-sm">{it.title}</p>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                ) : (
                  <div className="news-img flex flex-col md:flex-row gap-6 items-stretch">
                    {/* 右側一圖（高） */}
                    <div className="md:w-1/2 order-2 md:order-1">
                      {(() => {
                        const it = group.items[0];
                        return (
                          <div className="relative w-full h-[600px] overflow-hidden group">
                            <button
                              type="button"
                              onClick={() => openLightbox(group.items, 0)}
                              className="absolute inset-0 focus:outline-none"
                              aria-label={`放大檢視：${it.title}`}
                            >
                              <Image
                                src={it.src}
                                alt={it.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            </button>
                            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-r from-black/70 to-transparent flex items-center px-4 pointer-events-none">
                              <p className="text-white text-sm">{it.title}</p>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* 左側兩圖 */}
                    <div className="flex flex-col gap-6 md:w-1/2 order-1 md:order-2">
                      {[1, 2].map((idx) => {
                        const it = group.items[idx];
                        return (
                          <div
                            key={idx}
                            className="relative w-full h-[288px] overflow-hidden group"
                          >
                            <button
                              type="button"
                              onClick={() => openLightbox(group.items, idx)}
                              className="absolute inset-0 focus:outline-none"
                              aria-label={`放大檢視：${it.title}`}
                            >
                              <Image
                                src={it.src}
                                alt={it.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            </button>
                            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-r from-black/70 to-transparent flex items-center px-4 pointer-events-none">
                              <p className="text-white text-sm">{it.title}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ===== 右欄：新聞中心（含分頁切換） ===== */}
          <div className="right w-full lg:w-1/2">
            <div className="flex flex-col px-4 md:px-8 xl:px-16">
              <h2>新聞中心｜</h2>
            </div>

            <div className="flex flex-col px-4 md:px-8 xl:px-16">
              <div className="flex flex-col new-items">
                <div className="title pt-10 mb-2 border-b flex justify-between w-full">
                  <h3 className="text-[22px]">最新消息</h3>
                  <span>更新日期：114.05</span>
                </div>

                {/* 分頁內容 */}
                <div className="relative">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={`page-${page}`}
                      custom={direction}
                      variants={pageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      <motion.div
                        variants={{
                          show: { transition: listStagger.transition },
                        }}
                        initial="hidden"
                        animate="show"
                        className="flex flex-col gap-2"
                      >
                        {pagedItems.map((item, idx) => (
                          <motion.article
                            key={`${item.id}-${idx}`}
                            variants={itemVariants}
                            className="news-item bg-slate-100 flex p-2 items-center rounded-lg"
                          >
                            <div className="img w-[40%] overflow-hidden rounded-md">
                              <Image
                                src={item.img}
                                width={800}
                                height={600}
                                alt={item.title}
                                placeholder="empty"
                                loading="lazy"
                                className="w-full h-auto"
                              />
                            </div>
                            <div className="txt p-6 w-[60%]">
                              <h3 className="text-lg font-bold leading-snug">
                                {item.title.split("，")[0]}，<br />
                                {item.title.split("，")[1]}
                              </h3>
                              <p className="text-[14px] font-normal line-clamp-3 mt-2">
                                {item.excerpt}
                              </p>
                              <div className="flex pt-5 justify-between items-center">
                                <span className="text-xs text-slate-500">
                                  更新：{item.date}
                                </span>
                                <motion.a
                                  whileHover={{ x: 2 }}
                                  className="text-slate-900/80 underline underline-offset-4 cursor-pointer"
                                  href="#"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  閱讀更多
                                </motion.a>
                              </div>
                            </div>
                          </motion.article>
                        ))}
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* 分頁器 */}
                <div className="mt-4 flex items-center justify-center gap-2 select-none">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevPageFn}
                    disabled={page === 0}
                    className={`h-9 px-3 rounded-md border text-sm ${
                      page === 0
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-slate-100"
                    }`}
                    aria-label="上一頁"
                  >
                    ←
                  </motion.button>

                  {Array.from({ length: pageCount }).map((_, i) => {
                    const isActive = i === page;
                    return (
                      <motion.button
                        key={i}
                        type="button"
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={() => goToPage(i)}
                        className={`h-9 min-w-9 px-3 rounded-md text-sm border ${
                          isActive
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-white hover:bg-slate-100"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                        aria-label={`第 ${i + 1} 頁`}
                      >
                        {i + 1}
                      </motion.button>
                    );
                  })}

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextPage}
                    disabled={page === pageCount - 1}
                    className={`h-9 px-3 rounded-md border text-sm ${
                      page === pageCount - 1
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-slate-100"
                    }`}
                    aria-label="下一頁"
                  >
                    →
                  </motion.button>
                </div>

                {/* 小提示：左右鍵切頁（可選） */}
                <KeyboardPager
                  onLeft={prevPageFn}
                  onRight={nextPage}
                  enabledLeft={page > 0}
                  enabledRight={page < pageCount - 1}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Lightbox：彈出式幻燈片 ===== */}
      <AnimatePresence>
        {lbOpen && (
          <motion.div
            ref={overlayRef}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            onClick={(e) => {
              // 點背景關閉（避免點到內容就關掉）
              if (e.target === overlayRef.current) closeLightbox();
            }}
          >
            {/* 背景遮罩 */}
            <div className="absolute inset-0 bg-black/80" />

            {/* 內容容器（自適應） */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="圖片檢視"
              className="relative z-[101] w-[min(1200px,96vw)] h-[80vh] bg-black/0 flex items-center justify-center"
              initial={
                prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.98 }
              }
              animate={
                prefersReduced
                  ? { opacity: 1 }
                  : { opacity: 1, scale: 1, transition: { duration: 0.2 } }
              }
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.18 } }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {/* 圖片（object-contain 自適應） */}
              {lbItems[lbIndex] && (
                <div className="relative w-full h-full">
                  <Image
                    src={lbItems[lbIndex].src}
                    alt={lbItems[lbIndex].title}
                    fill
                    sizes="96vw"
                    className="object-contain select-none"
                    priority
                  />
                </div>
              )}

              {/* 上方工具列 */}
              <div className="absolute top-3 left-4 right-4 flex items-center justify-between text-white">
                <div className="text-sm opacity-80">
                  {lbIndex + 1} / {lbItems.length}
                </div>
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur px-3 py-1 text-sm"
                  aria-label="關閉"
                >
                  ✕
                </button>
              </div>

              {/* 下方標題 */}
              {lbItems[lbIndex]?.title && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 max-w-[90%] text-center text-white/90 text-sm bg-black/40 px-3 py-1 rounded">
                  {lbItems[lbIndex].title}
                </div>
              )}

              {/* 導航箭頭 */}
              {lbItems.length > 1 && (
                <>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      prevSlide();
                    }}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 text-white w-10 h-10 grid place-items-center"
                    aria-label="上一張"
                  >
                    ←
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      nextSlide();
                    }}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 text-white w-10 h-10 grid place-items-center"
                    aria-label="下一張"
                  >
                    →
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

/**
 * 允許用鍵盤左右鍵切換頁碼（右欄）
 */
function KeyboardPager({ onLeft, onRight, enabledLeft, enabledRight }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft" && enabledLeft) onLeft();
      if (e.key === "ArrowRight" && enabledRight) onRight();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onLeft, onRight, enabledLeft, enabledRight]);
  return null;
}
