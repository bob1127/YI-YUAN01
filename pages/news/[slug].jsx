// pages/news/[slug].jsx
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "../Layout";
import { decode } from "html-entities";

function getWpOrigin() {
  const raw = process.env.WP_API_URL || "";
  return raw.replace(/\/$/, "");
}
function getApiBase() {
  return `${getWpOrigin()}/wp-json`;
}

export default function NewsArticle({ post, elementorCss = [] }) {
  if (!post) {
    return (
      <Layout>
        <div className="py-20 text-center">找不到文章</div>
      </Layout>
    );
  }

  const wpOrigin = getWpOrigin();
  const title = decode(post?.title?.rendered || "未命名");
  const content = post?.content?.rendered || "";
  const featured =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
  const alt =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || "新聞圖片";
  const date = new Date(post.date);
  const rocYear = date.getFullYear() - 1911;
  const dateStr = `${rocYear}.${String(date.getMonth() + 1).padStart(2, "0")}`;

  const blockCss = `${wpOrigin}/wp-includes/css/dist/block-library/style.min.css`;
  const classicCss = `${wpOrigin}/wp-includes/css/classic-themes.min.css`;

  return (
    <Layout>
      <Head>
        <link rel="stylesheet" href={blockCss} />
        <link rel="stylesheet" href={classicCss} />
        {elementorCss.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}

        <style>{`
          html, body {
            scroll-behavior: smooth;
            -webkit-font-smoothing: antialiased;
          }
          body {
            will-change: scroll-position;
            overscroll-behavior-y: none;
          }
          img, video {
            will-change: transform;
          }
          .entry-content { color: #334155; max-width: 100%; overflow-x: hidden; }
          .entry-content p { margin: 1em 0; line-height: 1.9; font-size: 17px; }
          .entry-content h2 { font-size: 22px; font-weight: 700; margin: 1.5rem 0 .75rem; color: #0f172a; }
          .entry-content h3 { font-size: 19px; font-weight: 600; margin: 1.25rem 0 .5rem; color: #0f172a; }
          .entry-content a { color: #2563eb; transition: color .25s; }
          .entry-content a:hover { text-decoration: underline; color: #1d4ed8; }
          .entry-content ul, .entry-content ol { margin: 1em 0 1em 1.25em; line-height: 1.9; }
          .entry-content li { margin: .25em 0; }
          .entry-content blockquote { border-left: 4px solid #e2e8f0; margin: 1.25rem 0; padding: .25rem 1rem; color: #475569; }
          .entry-content figure { margin: 1.25rem 0 1.5rem; }
          .entry-content figure.wp-block-image img,
          .entry-content img { border-radius: .5rem; height: auto; box-shadow: 0 4px 14px rgba(0,0,0,.07); max-width: 100%; }
          .entry-content figcaption { text-align: center; font-size: .875rem; color: #64748b; margin-top: .5rem; }
          .entry-content table { border-collapse: collapse; margin: 1rem 0; }
          .entry-content table th, .entry-content table td { border: 1px solid #e2e8f0; padding: .5rem .75rem; }
          /* 移除 elementor swiper overflow 導致卡頓 */
          .elementor, .swiper, .elementor-section { will-change: auto !important; transform: none !important; }
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
              priority
              loading="eager"
              className="rounded-lg w-full h-auto shadow"
            />
            {alt && (
              <figcaption className="text-center text-sm text-slate-500 mt-2">
                {alt}
              </figcaption>
            )}
          </figure>
        )}

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

/* ========= SSG / ISR ========= */

export async function getStaticPaths() {
  const api = getApiBase();
  const res = await fetch(`${api}/wp/v2/posts?per_page=10&_fields=slug`);
  const posts = res.ok ? await res.json() : [];
  const paths = posts.map((p) => ({ params: { slug: p.slug } }));
  return { paths, fallback: "blocking" };
}

function extractElementorCss(html, wpOrigin) {
  const out = new Set();
  const linkRe =
    /<link\s[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/gi;
  let m;
  while ((m = linkRe.exec(html)) !== null) {
    let href = m[1];
    const hit =
      /\/elementor\/|\/eicons\/|\/swiper\//i.test(href) ||
      /\/uploads\/elementor\/css\/post-\d+\.css/i.test(href);
    if (!hit) continue;
    if (href.startsWith("//")) href = "https:" + href;
    if (/^https?:\/\//i.test(href) === false) {
      href = `${wpOrigin}${href.startsWith("/") ? "" : "/"}${href}`;
    }
    out.add(href);
  }
  return Array.from(out);
}

export async function getStaticProps({ params }) {
  const api = getApiBase();
  const wpOrigin = getWpOrigin();

  let post = null;
  let elementorCss = [];

  try {
    const res = await fetch(`${api}/wp/v2/posts?slug=${params.slug}&&_embed`);
    const data = res.ok ? await res.json() : [];
    post = data[0] || null;
  } catch {}

  try {
    const pageUrl = post?.link;
    if (pageUrl) {
      const hRes = await fetch(pageUrl);
      if (hRes.ok) {
        const html = await hRes.text();
        elementorCss = extractElementorCss(html, wpOrigin);
      }
    }
  } catch {}

  return {
    props: { post, elementorCss },
    revalidate: 60,
  };
}
