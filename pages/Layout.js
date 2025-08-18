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

  const handleAddToCart = (product, quantity, selectedAttributes) => {
    const totalPrice = product.price * quantity;
    const variantId = getVariantId(selectedAttributes);

    setSidebarProduct({
      name: product.name,
      price: product.price,
      quantity,
      totalPrice,
      variant: selectedAttributes,
      variantId,
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
  <title>宜園建設｜實在的構築</title>
  <meta name="description" content="Speed-eSIM | International eSIM" />
  <meta name="keywords" content="產品, 購物, 優惠" />
  <meta name="author" content="" />

  {/* ✅ 網站 icon 設定 */}
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
</Head>

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