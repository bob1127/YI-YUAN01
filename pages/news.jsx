// pages/news.jsx
import { useEffect, useMemo, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Layout from "./Layout";

import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";

// ✅ 修正與增強：處理更多 HTML 實體符號，解決亂碼問題
function decodeEntities(str = "") {
  if (!str) return "";
  return str
    .replace(/&amp;/g, "&")
    .replace(/&#038;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "'") // 右單引號
    .replace(/&#8216;/g, "'") // 左單引號
    .replace(/&#8220;/g, '"') // 左雙引號
    .replace(/&#8221;/g, '"') // 右雙引號
    .replace(/&hellip;/g, "...") // 刪節號
    .replace(/&#8230;/g, "...") // 刪節號編碼
    .replace(/&nbsp;/g, " ") // 不換行空白
    .replace(/&#160;/g, " "); // 空白編碼
}

// ✅ 修正與增強：先移除標籤，再移除 WordPress 常見的 [...], 再解碼
function stripHtml(html = "") {
  if (!html) return "";
  // 1. 移除 HTML 標籤
  let text = html.replace(/<[^>]+>/g, "");
  // 2. 移除 WordPress 自動產生的 excerpt 後綴 (如 [&hellip;] 或 [...])
  text = text.replace(/\[&hellip;\]/g, "").replace(/\[\.\.\.\]/g, "");
  // 3. 解碼實體符號並去除頭尾空白
  return decodeEntities(text).trim();
}

function toRocMonth(iso) {
  const d = new Date(iso);
  const yy = d.getFullYear() - 1911;
  return `${yy}.${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export default function NewsPage({ galleriesFromCMS, posts }) {
  const prefersReduced = useReducedMotion();

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
    const DURATION_MS = 1200;
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const step = (now) => {
      const t = Math.min(1, (now - start) / DURATION_MS);
      window.scrollTo(0, startY + distance * ease(t));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const galleries = useMemo(() => galleriesFromCMS || [], [galleriesFromCMS]);

  const ITEMS_PER_PAGE = 6;
  const pageCount = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const [page, setPage] = useState(0);
  const [prevPage, setPrevPage] = useState(0);
  const direction = page > prevPage ? 1 : page < prevPage ? -1 : 0;

  const pagedItems = useMemo(() => {
    const start = page * ITEMS_PER_PAGE;
    return posts.slice(start, start + ITEMS_PER_PAGE);
  }, [page, posts]);

  const goToPage = (next) => {
    setPrevPage(page);
    setPage(Math.max(0, Math.min(pageCount - 1, next)));
  };
  const nextPage = () => goToPage(page + 1);
  const prevPageFn = () => goToPage(page - 1);

  // Lightbox（左欄）
  const [lbOpen, setLbOpen] = useState(false);
  const [slides, setSlides] = useState([]);
  const [lbIndex, setLbIndex] = useState(0);
  const openLightbox = useCallback((groupItems, startIndex = 0) => {
    const s = groupItems.map((it) => ({
      src: it.src,
      alt: it.alt,
      description: it.alt, // 用替代文字
      width: it.width || 1600,
      height: it.height || 1066,
    }));
    setSlides(s);
    setLbIndex(startIndex);
    setLbOpen(true);
  }, []);

  const pageVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      filter: "blur(6px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.45, ease: [0.22, 0.7, 0, 1] },
    },
    exit: (dir) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      filter: "blur(6px)",
      transition: { duration: 0.35, ease: "easeInOut" },
    }),
  };
  const listStagger = {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.22, 0.7, 0, 1] },
    },
  };

  return (
    <Layout>
      {/* Hero */}
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

      <div id="next-section" />

      <section className="section-content py-10 lg:py-20">
        <div className="flex flex-col lg:flex-row max-w-[1920px] mx-auto">
          {/* 左欄：工程進度 */}
          <div className="left w-full lg:w-1/2">
            <div className="flex flex-col px-4 md:px-8 xl:px-16">
              <h2>工程進度｜</h2>
            </div>

            {galleries.length === 0 && (
              <div className="px-4 md:px-8 xl:px-16 text-slate-500">
                尚無工程進度資料。
              </div>
            )}

            {galleries.map((group, gi) => (
              <div
                key={`${group.sectionTitle}-${gi}`}
                className="flex flex-col px-4 md:px-8 xl:px-16"
              >
                <div className="title pt-10 mb-4 border-b flex justify-between w-full">
                  <h3 className="text-[22px]">{group.sectionTitle}</h3>
                  {group.date && <span>更新日期：{group.date}</span>}
                </div>

                {group.layout === "L2R1" ? (
                  <div className="news-img flex flex-col md:flex-row gap-6 items-stretch">
                    <div className="flex flex-col gap-6 md:w-1/2">
                      {[0, 1].map((idx) => {
                        const it = group.items[idx];
                        if (!it) return null;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => openLightbox(group.items, idx)}
                            className="relative w-full h-[288px] overflow-hidden group text-left"
                            aria-label={`放大檢視：${it.alt || "工程照片"}`}
                          >
                            <Image
                              src={it.src}
                              alt={it.alt || "工程照片"}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-r from-black/70 to-transparent flex items-center px-4 pointer-events-none">
                              <p className="text-white text-sm">{it.alt}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    <div className="md:w-1/2">
                      {(() => {
                        const it = group.items[2];
                        if (!it) return null;
                        return (
                          <button
                            type="button"
                            onClick={() => openLightbox(group.items, 2)}
                            className="relative w-full h-[600px] overflow-hidden group text-left"
                            aria-label={`放大檢視：${it.alt || "工程照片"}`}
                          >
                            <Image
                              src={it.src}
                              alt={it.alt || "工程照片"}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-r from-black/70 to-transparent flex items-center px-4 pointer-events-none">
                              <p className="text-white text-sm">{it.alt}</p>
                            </div>
                          </button>
                        );
                      })()}
                    </div>
                  </div>
                ) : (
                  <div className="news-img flex flex-col md:flex-row gap-6 items-stretch">
                    <div className="md:w-1/2 order-2 md:order-1">
                      {(() => {
                        const it = group.items[0];
                        if (!it) return null;
                        return (
                          <button
                            type="button"
                            onClick={() => openLightbox(group.items, 0)}
                            className="relative w-full h-[600px] overflow-hidden group text-left"
                            aria-label={`放大檢視：${it.alt || "工程照片"}`}
                          >
                            <Image
                              src={it.src}
                              alt={it.alt || "工程照片"}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-r from-black/70 to-transparent flex items-center px-4 pointer-events-none">
                              <p className="text-white text-sm">{it.alt}</p>
                            </div>
                          </button>
                        );
                      })()}
                    </div>
                    <div className="flex flex-col gap-6 md:w-1/2 order-1 md:order-2">
                      {[1, 2].map((idx) => {
                        const it = group.items[idx];
                        if (!it) return null;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => openLightbox(group.items, idx)}
                            className="relative w-full h-[288px] overflow-hidden group text-left"
                            aria-label={`放大檢視：${it.alt || "工程照片"}`}
                          >
                            <Image
                              src={it.src}
                              alt={it.alt || "工程照片"}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-r from-black/70 to-transparent flex items-center px-4 pointer-events-none">
                              <p className="text-white text-sm">{it.alt}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 右欄 */}
          <div className="right w-full lg:w-1/2">
            <div className="flex flex-col px-4 md:px-8 xl:px-16">
              <h2>新聞中心｜</h2>
            </div>

            <div className="flex flex-col px-4 md:px-8 xl:px-16">
              <div className="flex flex-col new-items">
                <div className="title pt-10 mb-2 border-b flex justify-between w-full">
                  <h3 className="text-[22px]">最新消息</h3>
                  <span>更新日期：{posts[0]?.date ?? ""}</span>
                </div>

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
                            className="news-item relative bg-slate-100 min-h-[180px] my-[9px] flex py-[.56vmin] px-2 items-center rounded-lg overflow-hidden cursor-pointer hover:bg-slate-100/70"
                          >
                            <Link
                              href={`/news/${item.slug}`}
                              className="absolute inset-0 z-10"
                              aria-label={`閱讀更多：${item.title}`}
                            />
                            <div className="w-full flex flex-col sm:flex-row items-center">
                              <div className="w-full p-3 sm:w-[30%] overflow-hidden rounded-md flex-shrink-0 flex flex-col z-0">
                                <div className="relative w-full h-[180px] sm:h-[200px] md:h-[140px]">
                                  {item.img ? (
                                    <Image
                                      src={item.img}
                                      alt={item.alt || item.title}
                                      fill
                                      sizes="(max-width: 1024px) 40vw, 30vw"
                                      className="object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full bg-slate-200" />
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                                  {item.alt || item.excerpt}
                                </p>
                              </div>

                              <div className="txt p-4 w-full sm:w-[70%] z-0">
                                <h3 className="text-lg font-bold leading-snug">
                                  {item.title.split("，")[0]}
                                  {item.title.includes("，") ? "，" : ""}
                                  <br />
                                  {item.title.split("，")[1] ?? ""}
                                </h3>
                                {/* ✅ 這裡顯示處理過的乾淨文字 */}
                                <p className="text-[14px] font-normal line-clamp-3 mt-2">
                                  {item.excerpt}
                                </p>
                                <div className="flex pt-5 justify-between items-center">
                                  <span className="text-xs text-slate-500">
                                    更新：{item.date}
                                  </span>
                                  <motion.span whileHover={{ x: 2 }}>
                                    <span className="text-slate-900/80 underline underline-offset-4">
                                      閱讀更多
                                    </span>
                                  </motion.span>
                                </div>
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

      {/* Lightbox：左欄圖片 */}
      <Lightbox
        open={lbOpen}
        close={() => setLbOpen(false)}
        slides={slides}
        index={lbIndex}
        plugins={[Captions, Thumbnails, Zoom, Fullscreen]}
        animation={{ fade: 300, swipe: 400 }}
        controller={{ closeOnBackdropClick: true }}
        carousel={{ swipe: true, finite: false }}
        zoom={{ maxZoomPixelRatio: 2.2, scrollToZoom: true }}
        thumbnails={{
          position: "bottom",
          border: 0,
          gap: 8,
          width: 100,
          height: 64,
        }}
      />
    </Layout>
  );
}

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

/* ---------------- SSG + ISR：左欄(progress) + 右欄(posts) ---------------- */
export async function getStaticProps() {
  const base = process.env.WP_API_URL;

  const progressUrl = `${base}/wp-json/wp/v2/progress?acf_format=standard&per_page=10&orderby=date&order=desc`;
  const postsUrl = `${base}/wp-json/wp/v2/posts?per_page=30&orderby=date&order=desc&_embed`;

  // ✅ 修正：提取圖片的邏輯
  const extractImagesFromHTML = (html = "", fallbackTitle = "工程照片") => {
    const out = [];
    const figureRe = /<figure\b[^>]*>([\s\S]*?)<\/figure>/gi;
    let fm;
    while ((fm = figureRe.exec(html)) !== null) {
      const block = fm[1];
      const imgRe =
        /<img\b[^>]*src=["']([^"']+)["'][^>]*?(?:alt=["']([^"']*)["'])?[^>]*>/i;
      const im = imgRe.exec(block);
      if (!im) continue;
      const src = im[1];
      let alt = im[2] || "";
      if (!alt) {
        const capRe = /<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i;
        const cap = capRe.exec(block);
        if (cap && cap[1]) alt = stripHtml(cap[1]);
      }
      out.push({ src, alt: alt || fallbackTitle, width: 1600, height: 1066 });
      if (out.length >= 6) break;
    }
    if (!out.length) {
      const imgRe =
        /<img\b[^>]*src=["']([^"']+)["'][^>]*?(?:alt=["']([^"']*)["'])?[^>]*>/gi;
      let m;
      while ((m = imgRe.exec(html)) !== null) {
        const src = m[1];
        const alt = m[2] || fallbackTitle;
        out.push({ src, alt, width: 1600, height: 1066 });
        if (out.length >= 6) break;
      }
    }
    return out;
  };

  let galleriesFromCMS = [];
  let posts = [];

  try {
    const [progRes, postRes] = await Promise.all([
      fetch(progressUrl),
      fetch(postsUrl),
    ]);
    const progRows = progRes.ok ? await progRes.json() : [];
    const postRows = postRes.ok ? await postRes.json() : [];

    // progress → galleries
    galleriesFromCMS = progRows
      .map((p, idx) => {
        const title = decodeEntities(p?.title?.rendered || "工程進度");
        const contentHtml =
          typeof p?.content?.rendered === "string" ? p.content.rendered : "";
        let items = extractImagesFromHTML(contentHtml, title);
        if (!items.length) return null;

        let date = "";
        if (p?.acf?.update_month) date = p.acf.update_month;
        else if (p?.date) date = toRocMonth(p.date);

        const layout = idx % 2 === 0 ? "L2R1" : "R1L2";
        return { sectionTitle: title, date, layout, items: items.slice(0, 3) };
      })
      .filter(Boolean);

    // posts → 右欄資料
    posts = postRows.map((post) => {
      const media = post?._embedded?.["wp:featuredmedia"]?.[0];
      const img = media?.source_url || "";
      const alt =
        media?.alt_text ||
        stripHtml(media?.caption?.rendered || "") ||
        decodeEntities(media?.title?.rendered || "");
      return {
        id: post.id,
        slug: post.slug,
        title: decodeEntities(post.title?.rendered || ""),
        // ✅ 這裡會使用增強後的 stripHtml，解決亂碼和 [...], &hellip; 等問題
        excerpt: stripHtml(post.excerpt?.rendered || ""),
        date: toRocMonth(post.date),
        img,
        alt,
      };
    });
  } catch (e) {
    // ignore
  }

  return { props: { galleriesFromCMS, posts }, revalidate: 60 };
}
