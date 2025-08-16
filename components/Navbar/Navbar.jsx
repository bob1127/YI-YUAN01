"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const MenuBar = ({ closeMenu }) => {
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef(null);

  const navItems = [
    { label: "關於宜園 ABOUT", href: "/about" },
    { label: "建築經典 CLASSIC", href: "/project" },
    { label: "新案鑑賞 PROJECT", href: "/hot-sale" },
    { label: "工程進度 PROGRESS", href: "/news" },
    { label: "聯絡我們 CONTACT", href: "/contact" },
  ];

  const openMenu = () => setOpen(true);
  const closeAll = () => {
    setOpen(false);
    closeMenu?.();
  };

  // 更穩的捲動鎖定（相容 iOS）：用 position:fixed + 記錄/還原 scrollY
  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    const body = document.body;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";

    const t = setTimeout(() => firstLinkRef.current?.focus(), 10);
    const onKey = (e) => e.key === "Escape" && closeAll();
    window.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      // 還原滾動位置
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur border-b border-black/10">
      <div className="h-16 md:h-20 flex items-center">
        <div className="w-full mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" onClick={closeAll} aria-label="首頁">
              <Image
                src="/images/宜園建設LOGO-1.png"
                alt="logo"
                width={160}
                height={90}
                className="w-[120px] md:w-[130px] h-auto"
                priority
              />
            </Link>
          </div>

          {/* 桌機導覽 */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map(({ label, href }) => (
              <Link
                href={href}
                key={href}
                className="px-3 py-1 mx-2 text-sm border-y-1 border-gray-600 font-medium text-black hover:opacity-80 transition"
                onClick={closeAll}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* 桌機右側：Facebook */}
          <div className="hidden lg:flex items-center">
            <Link
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100063749781596"
              aria-label="Facebook"
              className="hover:opacity-80 transition"
            >
              <Image
                src="/images/facebook-icon.png"
                alt="facebook-icon"
                width={32}
                height={32}
                className="w-[28px] h-[28px]"
              />
            </Link>
          </div>

          {/* 手機：漢堡按鈕 */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 border border-black/10 text-black hover:bg-black/5 transition"
            onClick={openMenu}
            aria-label="開啟選單"
            aria-controls="mobile-menu"
            aria-expanded={open}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 手機選單：滿版白底覆蓋（超高 z-index，避免被其他 fixed 層蓋住） */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-[1000000] lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <aside
          role="dialog"
          aria-modal="true"
          className={`absolute inset-0 bg-white flex flex-col will-change-transform transition-transform duration-300 ease-out ${
            open ? "translate-y-0" : "translate-y-[100%]"
          }`}
          // 兼容 iOS Safari 動態網址列高度
          style={{
            height: "100dvh",
            paddingTop: "env(safe-area-inset-top)",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          {/* 頂部：Logo + 關閉 */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-black/10">
            <Link
              href="/"
              onClick={closeAll}
              className="flex items-center"
              aria-label="首頁"
            >
              <Image
                src="/images/宜園建設LOGO-1.png"
                alt="logo"
                width={140}
                height={80}
                className="w-[110px] h-auto"
                priority={false}
              />
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 border border-black/10 hover:bg-black/5 transition"
              onClick={closeAll}
              aria-label="關閉選單"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M6 6l12 12M18 6l-12 12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* 內容：可滾動的連結清單 */}
          <nav className="flex-1 overflow-y-auto py-2">
            {navItems.map(({ label, href }, idx) => (
              <Link
                href={href}
                key={href}
                ref={idx === 0 ? firstLinkRef : null}
                onClick={closeAll}
                className="block px-6 py-4 text-[16px] font-medium text-gray-900 border-b border-black/5 hover:bg-black/[0.035] focus:outline-none focus:bg-black/[0.06]"
              >
                {label}
              </Link>
            ))}

            {/* Facebook（置底額外項） */}
            <div className="px-6 py-4">
              <Link
                target="_blank"
                href="https://www.facebook.com/profile.php?id=100063749781596"
                className="inline-flex items-center gap-2 text-[16px] font-medium hover:opacity-80"
                onClick={closeAll}
              >
                <Image
                  src="/images/facebook-icon.png"
                  alt="facebook-icon"
                  width={22}
                  height={22}
                  className="w-[22px] h-[22px]"
                />
                Facebook
              </Link>
            </div>
          </nav>
        </aside>
      </div>
    </header>
  );
};

export default MenuBar;
