"use client";
import Layout from "./Layout";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { BsSearch } from "react-icons/bs";
import { motion } from "framer-motion";

const projects = [
  {
    href: "/project/project-yiyuan-green",
    image: "/images/project/宜園之青/官網圖片-建築經典.jpg",
    alt: "宜園之青",
    title: "宜園之青",
    subtitle: "繁城新境·悠悠之青",
    badge: "熱銷中",
    badgeClass: "bg-[#d33]",
  },
  {
    href: "/project/project-yiyuan",
    image: "/images/project/S__3497991_0.jpg",
    alt: "宜園大院",
    title: "宜園大院",
    subtitle: "13期·人車分道·極奢墅",
    badge: "熱銷中",
    badgeClass: "bg-[#d33]",
  },
  {
    href: "/project/project-yiching",
    image: "/images/project/S__31399941.jpg",
    alt: "一青隱",
    title: "一青隱",
    subtitle: "一境·青海·閒隱",
    badge: "熱銷中",
    badgeClass: "bg-[#d33]",
  },
  {
    href: "/project/project-chengjing06",
    image: "/images/project/宜園誠境6/1.webp",
    alt: "誠境6",
    title: "誠境6",
    subtitle: "景觀別墅·庭院·大露台",
    badge: "2020",
    badgeClass: "bg-[#485936]/80",
  },
  {
    href: "/project/project-chengjing05",
    image: "/images/project/宜園誠境5/1.webp",
    alt: "誠境5",
    title: "誠境5",
    subtitle: "匠心巨作·典藏誠境五期.",
    badge: "2018",
    badgeClass: "bg-[#485936]/80",
  },
  {
    href: "/project/project-chengjing02",
    image: "/images/project/宜園誠境2/1.webp",
    alt: "誠境2",
    title: "誠境2",
    subtitle: "匠心續作，典藏誠境二期",
    badge: "2016",
    badgeClass: "bg-[#485936]/80",
  },
  {
    href: "/project/project-YiYuanChengjing",
    image: "/images/project/宜園誠境/1.webp",
    alt: "宜園誠境",
    title: "宜園誠境",
    subtitle: "誠境首章｜境啟未來",
    badge: "2014",
    badgeClass: "bg-[#485936]/80",
  },
];

function ProjectCard({ href, image, alt, title, subtitle, badge, badgeClass }) {
  return (
    <Link href={href} className="group block min-w-0 h-full">
      <div className="project-item flex flex-col h-full overflow-hidden">
        <div className="project-card-media relative w-full aspect-[4/3] overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-[#5b5c5d] opacity-0 group-hover:opacity-25 z-20 transition duration-300" />

          <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none">
            <BsSearch className="text-white text-4xl opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out" />
            <span className="text-white text-sm mt-2 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out">
              More
            </span>
          </div>

          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover transform scale-100 transition-transform duration-1000 ease-in-out group-hover:scale-105"
            placeholder="empty"
            loading="lazy"
          />

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30">
            <div
              className={`w-32 h-16 ${badgeClass} rounded-t-full flex items-center justify-center shadow-lg`}
            >
              <span className="text-white font-semibold tracking-wide">
                {badge}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center p-8 mt-2">
          <h2 className="text-3xl mb-4 font-bold text-[#20382c]">{title}</h2>
          <p className="text-[#337162]">{subtitle}</p>
        </div>
      </div>
    </Link>
  );
}

const project = () => {
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
      <Head>
        <title>經典選粹 CLASSIC 貫徹更好的美好旅程 | 宜園建設</title>
      </Head>
      <section className="section-hero-title aspect-[16/16] sm:aspect-[16/12] md:aspect-[16/6.5] overflow-hidden mt-14 w-full relative">
        <div className="main-title absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
          <h1 className=" text-3xl text-center  text-nowrap  font-light sm:text-4xl 2xl:text-6xl text-white">
            CLASSIC <br></br>貫徹更好的美好旅程
          </h1>
        </div>

        <div className="mask bg-black/20 w-full h-full top-0 left-0 absolute z-30" />

        <Image
          src="/images/project/pexels-pixabay-327482.jpg"
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

      <div id="next-section" className="title py-1" />
      <section className="grid grid-cols-1 sm:grid-cols-3 w-full items-start">
        {projects.map((item) => (
          <ProjectCard key={item.href} {...item} />
        ))}
      </section>
    </Layout>
  );
};

export default project;
