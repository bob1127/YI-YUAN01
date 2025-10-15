// pages/news/[slug].jsx
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "../Layout";
import { decode } from "html-entities";

/* ---------- WP helpers ---------- */
function getWpOrigin() {
  const raw = process.env.WP_API_URL || "";
  return raw.replace(/\/$/, "");
}
function getApiBase() {
  return `${getWpOrigin()}/wp-json`;
}

/* 讓 <img> lazy/async；並剝除會造成卡頓的 inline 動畫/transform */
function sanitizeAndEnhanceContent(html = "") {
  if (!html) return html;

  // 1) 移除 <script>（安全）
  html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");

  // 2) 剝掉常見造成 jank 的 inline style: transform / transition / animation / filter / will-change
  html = html.replace(/style=(['"])(.*?)\1/gi, (m, q, s) => {
    // 拆解 style 屬性
    const keep = s
      .split(";")
      .map((kv) => kv.trim())
      .filter((kv) => {
        const k = kv.split(":")[0]?.trim().toLowerCase();
        return (
          k &&
          ![
            "transform",
            "transition",
            "animation",
            "filter",
            "will-change",
            "-webkit-transform",
            "-webkit-transition",
            "-webkit-animation",
            "backdrop-filter",
            "scroll-behavior",
          ].includes(k)
        );
      })
      .join("; ");
    if (!keep) return ""; // 全刪就移除 style 屬性
    return `style=${q}${keep}${q}`;
  });

  // 3) 移除會觸發動畫的 class
  html = html.replace(
    /\b(elementor-invisible|elementor-animate-[-\w]+|animated|fadeIn\w*|slideIn\w*|zoomIn\w*)\b/gi,
    ""
  );

  // 4) 移除動畫/互動相關 data 屬性（避免初始化）
  html = html.replace(/\sdata-[\w-]+=(['"]).*?\1/gi, "");

  // 5) 強制 <img> lazy + async + 不破版
  html = html
    // 若沒有 loading 屬性就加
    .replace(/<img\b(?![^>]*\bloading=)/gi, '<img loading="lazy" ')
    // 若沒有 decoding 屬性就加
    .replace(/<img\b(?![^>]*\bdecoding=)/gi, '<img decoding="async" ')
    // 圖片加上保護尺寸（避免破版與 reflow）
    .replace(
      /<img([^>]*?)style=(['"])(.*?)\2/gi,
      (_m, attrs, q, s) =>
        `<img${attrs}style=${q}${s};max-width:100%;height:auto;border-radius:8px${q}`
    )
    .replace(/<img((?!style=)[^>])*?>/gi, (m) => {
      if (/style=/.test(m)) return m;
      return m.replace(
        /<img/i,
        '<img style="max-width:100%;height:auto;border-radius:8px"'
      );
    });

  return html;
}

export default function NewsArticle({ post }) {
  if (!post) {
    return (
      <Layout>
        <div className="py-20 text-center">找不到文章</div>
      </Layout>
    );
  }

  const title = decode(post?.title?.rendered || "未命名");
  const rawContent = post?.content?.rendered || "";
  const content = sanitizeAndEnhanceContent(rawContent);

  const media = post?._embedded?.["wp:featuredmedia"]?.[0];
  const featured = media?.source_url || null;
  const alt =
    media?.alt_text || decode(media?.title?.rendered || "") || "新聞圖片";

  const d = new Date(post.date);
  const rocYear = d.getFullYear() - 1911;
  const dateStr = `${rocYear}.${String(d.getMonth() + 1).padStart(2, "0")}`;

  return (
    <Layout>
      <Head>
        {/* 僅保留你指定的 style（加上兩個保護：在不支援或手持裝置上關閉 content-visibility） */}
        <style>{`
          /* 避免全域平滑捲動影響裝置動量捲動與外掛 */
          html, body { -webkit-font-smoothing: antialiased; }

          /* 讓 offscreen 區塊等到捲到再渲染，超有感順暢 */
          .entry-content > * {
            content-visibility: auto;
            contain-intrinsic-size: 1000px;
          }

          /* 手機/平板（粗指標）或瀏覽器不支援時，關閉 content-visibility 以免 jank */
          @media (hover: none) and (pointer: coarse) {
            .entry-content > * { content-visibility: visible; }
          }
          @supports not (content-visibility: auto) {
            .entry-content > * { content-visibility: visible; }
          }

          .entry-content { color:#334155; max-width:100%; overflow-x:hidden; }
          .entry-content p { margin:1em 0; line-height:1.9; font-size:17px; }
          .entry-content h2 { font-size:22px; font-weight:700; margin:1.5rem 0 .75rem; color:#0f172a; }
          .entry-content h3 { font-size:19px; font-weight:600; margin:1.25rem 0 .5rem; color:#0f172a; }
          .entry-content a { color:#2563eb; transition:color .2s; }
          .entry-content a:hover { text-decoration:underline; color:#1d4ed8; }
          .entry-content ul, .entry-content ol { margin:1em 0 1em 1.25em; line-height:1.9; }
          .entry-content li { margin:.25em 0; }
          .entry-content blockquote { border-left:4px solid #e2e8f0; margin:1.25rem 0; padding:.25rem 1rem; color:#475569; }
          .entry-content figure { margin:1.25rem 0 1.5rem; }
          .entry-content img, .entry-content figure.wp-block-image img {
            border-radius:.5rem; box-shadow:0 4px 14px rgba(0,0,0,.07); max-width:100%; height:auto;
          }
          .entry-content figcaption { text-align:center; font-size:.875rem; color:#64748b; margin-top:.5rem; }
          .entry-content table { border-collapse:collapse; margin:1rem 0; }
          .entry-content table th, .entry-content table td { border:1px solid #e2e8f0; padding:.5rem .75rem; }

          /* 盡量避免外掛對滾動的 transform/overflow 干擾 */
          .elementor-section, .elementor-widget-container { will-change:auto; }
        `}</style>
      </Head>

      <article className="max-w-[900px] mx-auto px-4 sm:px-8 lg:px-0 py-12">
        <Link
          href="/news"
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 mb-4"
        >
          ← 返回列表
        </Link>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug mb-2">
          {title}
        </h1>
        <p className="text-sm text-slate-500 mb-6">更新：{dateStr}</p>

        {featured && (
          <figure className="mb-8">
            <Image
              src={featured}
              alt={alt}
              width={1600}
              height={1000}
              sizes="(max-width: 900px) 100vw, 900px"
              priority
              className="rounded-lg w-full h-auto shadow"
            />
            {alt && (
              <figcaption className="text-center text-sm text-slate-500 mt-2">
                {alt}
              </figcaption>
            )}
          </figure>
        )}

        {/* 內文（已剝除動畫/transform，img 也 lazy+async） */}
        <div
          className="entry-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className="mt-12 text-center">
          <Link
            href="/news"
            className="inline-block border border-slate-400 px-6 py-2 rounded-full text-sm hover:bg-slate-100 transition-all"
          >
            返回新聞列表
          </Link>
        </div>
      </article>
    </Layout>
  );
}

/* ---------- SSG / ISR ---------- */
export async function getStaticPaths() {
  const api = getApiBase();
  const res = await fetch(`${api}/wp/v2/posts?per_page=10&_fields=slug`);
  const posts = res.ok ? await res.json() : [];
  const paths = posts.map((p) => ({ params: { slug: p.slug } }));
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const api = getApiBase();

  let post = null;
  try {
    const res = await fetch(`${api}/wp/v2/posts?slug=${params.slug}&_embed`);
    const data = res.ok ? await res.json() : [];
    post = data[0] || null;
  } catch {}

  return {
    props: { post },
    revalidate: 60,
  };
}
