// pages/index.jsx
"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Layout from "./Layout";
import Enter from "../components/enter/enter";
import Image from "next/image";

export default function Home() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [showUnmute, setShowUnmute] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => setShowUnmute(true));
  }, []);

  const handleUnmute = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.muted = false;
      v.volume = 0.8;
      await v.play();
      setMuted(false);
      setShowUnmute(false);
    } catch {
      setShowUnmute(true);
    }
  };

  return (
    <Layout>
      <Enter />
      <div className="bg-white">
        {/* ===== HERO（影片：寬100%、高auto） ===== */}
        <section className="section-hero-title relative w-full  mb-[50px]">
          {/* 遮罩覆蓋在影片之上，但不阻擋點擊 */}
          <div className="pointer-events-none absolute inset-0 z-30 bg-black/20" />

          <video
            ref={videoRef}
            src="/videos/1130417_宜園建設-形象影片_Bcopy(大檔) - Compressed with FlexClip-2.mp4"
            autoPlay
            loop
            playsInline
            preload="auto"
            muted={muted}
            className="block w-full h-auto" /* 〈— 關鍵：寬100% 高auto */
          />

          {showUnmute && (
            <button
              onClick={handleUnmute}
              className="absolute bottom-6 right-6 z-40 px-4 py-2 rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/80 transition"
            >
              開啟聲音
            </button>
          )}
        </section>

        <section className="max-w-[1920px] mb-20 flex md:flex-row flex-col xl:w-[80%] md:w-[90%] w-full mx-auto">
          <div className="left w-full md:w-1/2 flex items-center justify-center flex-col">
            <div className="flex flex-col items-start ">
              <h2 className="text-[30px] xl:text-[50px]">實在的構築</h2>
              <p className="lg:text-[18px] text-[16px]">
                宜居的建築，承載著宜居的根
                <br />
                不一定最宏大，卻能帶來安心
                <br />
                傾聽，土地的聲音；細說，生命的故事
              </p>
              <br />
              <p className="lg:text-[18px] text-[16px]">
                A livable building carries the roots of livability
                <br />— not necessarily the grandest, yet it brings peace of
                mind
                <br />
                <br />
                Listening to the voice of the land, telling the stories of life
              </p>
            </div>
          </div>
          <div className="right w-full md:w-1/2 flex justify-center items-center">
            <Image
              src="/images/img093.png"
              alt=""
              width={800}
              height={1000}
              placeholder="empty"
              loading="lazy"
            />
          </div>
        </section>
      </div>
    </Layout>
  );
}
