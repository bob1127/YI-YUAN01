"use client";

import Link from "next/link";
import Image from "next/image";

const MenuBar = ({ closeMenu }) => {
  const navItems = [
    { label: "關於宜園 ABOUT", href: "/about" },
    { label: "建築經典 CLASSIC", href: "/project" },
    { label: "新案鑑賞 PROJECT", href: "/hot-sale" },
    { label: "工程進度 PROGRESS", href: "/news" },
    { label: "聯絡我們 CONTACT", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-black/10">
      <div className="h-16 md:h-20 flex items-center">
        <div className=" w-full mx-auto px-4 flex items-center">
          {/* Logo */}
          <div className="w-[15%] flex justify-center">
            <Link href="/home" onClick={() => closeMenu?.()}>
              <Image
                src="/images/logo.png"
                alt="logo"
                width={160}
                height={90}
                className="w-[130px] h-auto"
                priority
              />
            </Link>
          </div>

          {/* Nav Items */}
          <nav className="flex justify-center w-[70%]  items-center gap-2">
            {navItems.map(({ label, href }) => (
              <Link
                href={href}
                key={href}
                className="px-3 py-1 text-center border-t-1 border-b-1 border-gray-800 mx-4 text-sm font-medium text-black hover:opacity-80 transition"
                onClick={() => closeMenu?.()}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Facebook Icon */}
          <div className="ml-4 w-[15%] flex justify-center">
            <Link
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100063749781596"
              aria-label="Facebook"
            >
              <Image
                src="/images/facebook-icon.png"
                alt="facebook-icon"
                width={42}
                height={42}
                className="w-[32px] h-[32px]"
                priority={false}
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MenuBar;
