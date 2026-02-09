import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Navbar from "@/components/Navbar/Navbar.jsx";
import Banner from "@/components/banner";
import Footer from "../components/Footer/Footer1";
import Head from "next/head";
import Sidebar from "@/components/Sidebar.js";
import { UserProvider } from "../components/context/UserContext";
import { ReactLenis } from "@studio-freight/react-lenis";

export default function RootLayout({ children }) {
  const [sidebarProduct, setSidebarProduct] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ✅ 定義你的 GTM ID (方便管理)
  const GTM_ID = 'GTM-WWTSMJP8';

  const handleAddToCart = (product, quantity, selectedAttributes) => {
    const totalPrice = product.price * quantity;
    // const variantId = getVariantId(selectedAttributes); // 注意：原本這行有 missing helper，需確認 getVariantId 是否有引入

    setSidebarProduct({
      name: product.name,
      price: product.price,
      quantity,
      totalPrice,
      variant: selectedAttributes,
      // variantId,
    });

    setIsSidebarOpen(true);
  };

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 500,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <>
      <Head>
        <title>宜園建設｜實在的構築 · 信任與安心的居所</title>
        <meta name="description" content="Speed-eSIM | International eSIM" />
        <meta name="keywords" content="產品, 購物, 優惠" />
        <meta name="author" content="" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

        {/* Open Graph */}
        <meta property="og:title" content="Speed-eSIM | International eSIM" />
        <meta property="og:description" content="Speed-eSIM | International eSIM" />
        <meta property="og:image" content="/default-og-image.jpg" />
        <meta property="og:url" content="https://www.starislandbaby.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Speed-eSIM | International eSIM" />
        <meta name="twitter:description" content="Speed-eSIM | International eSIM" />
        <meta name="twitter:image" content="/default-og-image.jpg" />

        {/* ✅ 1. GTM Head Script (貼在 Head 內) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </Head>

      {/* ✅ 2. GTM Body NoScript (貼在 JSX return 的最上方) */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>

      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="light">
          <UserProvider>
            <Navbar />
            <Sidebar sidebarProduct={sidebarProduct} onAddToCart={handleAddToCart} />

            {/* ✅ 淡霧散開動畫區塊 */}
            <ReactLenis root>
              {children}
            </ReactLenis>
            <Banner />
            <Footer />

          </UserProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </>
  );
}