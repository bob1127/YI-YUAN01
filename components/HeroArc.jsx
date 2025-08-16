// HeroArcCrafts.jsx
"use client";
import { useEffect, useRef, useState } from "react";

export default function HeroArcCrafts({
  image = "/images/crafts-header.jpg",
  height = 905, // 你給的高度
  titleZh = "工學\n館",
  titleEn = "CRAFTS",
  subtitle = "Building is expressed in structure point of view\n of the art of science.",
  overlay = 0.28,
  onScrollTo, // 可傳入 callback 讓按鈕滾到某區
}) {
  const [offsetY, setOffsetY] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        setOffsetY(Math.min(y, 600)); // 限制視差位移
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleScroll = () => {
    if (typeof onScrollTo === "function") {
      onScrollTo();
      return;
    }
    // 預設滾到 Hero 之後的下一個區塊
    const el = sectionRef.current?.nextElementSibling;
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 12;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="header-box relative w-full overflow-hidden"
      style={{ height }}
    >
      {/* 背景：Ken Burns + 視差 */}
      <div className="img-bg absolute inset-0">
        <div
          className="bg-layer"
          style={{
            transform: `translateY(${offsetY * 0.2}px) scale(1.06)`,
            backgroundImage: `url(${image})`,
          }}
          aria-hidden="true"
        />
        {/* 遮罩讓字清楚 */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: `rgba(0,0,0,${overlay})` }}
          aria-hidden="true"
        />
      </div>

      {/* 右側標題區（跟你舊站位置&樣式接近） */}
      <div className="header-bottom absolute inset-x-0 bottom-0 z-[2]">
        <div className="title-box relative mx-auto w-[92%] max-w-[1200px] pb-10 md:pb-14 lg:pb-16">
          <h1
            className="title-zh whitespace-pre-line text-5xl font-bold leading-[1.05] text-white md:text-6xl lg:text-7xl"
            dangerouslySetInnerHTML={{
              __html: titleZh.replace(/\n/g, "<br/>"),
            }}
          />
          <em className="title-en block pt-3 text-5xl font-semibold leading-none tracking-widest text-white md:text-6xl lg:text-7xl">
            {titleEn}
          </em>
          <p
            className="mt-3 max-w-[560px] whitespace-pre-line text-sm leading-relaxed text-white/90 md:text-base"
            dangerouslySetInnerHTML={{
              __html: subtitle.replace(/\n/g, "<br/>"),
            }}
          />
        </div>

        {/* Scroll 按鈕 */}
        <button
          onClick={handleScroll}
          className="button-down group absolute right-[4%] -translate-y-2 translate-x-0 rounded-full bg-white/10 px-4 py-3 text-xs tracking-widest text-white backdrop-blur hover:bg-white/20"
          title="往下瀏覽"
        >
          SCROLL
          <i className="ml-2 inline-block align-middle transition-transform group-hover:translate-y-[2px]">
            ▼
          </i>
        </button>
      </div>

      {/* 底部圓弧挖洞（覆蓋成白色，形成上層挖洞視覺） */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-[3]">
        <ArcCutout fill="#ffffff" />
      </div>

      {/* 些微底部陰影，增加層次 */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-8 opacity-60"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0))",
        }}
      />

      {/* 元件內樣式 */}
      <style jsx>{`
        .bg-layer {
          position: absolute;
          inset: 0;
          background-position: center top;
          background-size: cover;
          will-change: transform;
          animation: kenburns 12s ease-in-out infinite alternate;
          filter: saturate(1) contrast(1.05);
        }

        @keyframes kenburns {
          0% {
            transform: translateY(0) scale(1.04);
          }
          100% {
            transform: translateY(-12px) scale(1.12);
          }
        }

        .title-box {
          text-align: left;
        }

        .button-down {
          bottom: 18px;
        }

        @media (min-width: 768px) {
          .button-down {
            bottom: 26px;
          }
          .title-box {
            padding-bottom: 72px;
          }
        }

        .title-zh {
          text-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
        }
        .title-en {
          text-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
        }
      `}</style>
    </section>
  );
}

/**
 * 更接近你提供截圖的弧度：
 * - 上直線在 0
 * - 底邊往下約 22（viewBox 高 100）
 * - 中央控制點較高，弧形更「尖」
 */
function ArcCutout({ fill = "#fff" }) {
  return (
    <svg
      viewBox="0 0 100 24"
      preserveAspectRatio="none"
      className="block h-[120px] w-full"
      aria-hidden="true"
    >
      {/* 上直線 → 右下 → 中央尖弧 → 左下 → 封口 */}
      <path
        d="
          M 0 0
          L 100 0
          L 100 18
          Q 50 3 0 18
          Z
        "
        fill={fill}
      />
    </svg>
  );
}
