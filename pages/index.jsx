// pages/index.jsx
"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Layout from "./Layout";
import Enter from "../components/enter/enter";
import Image from "next/image";

export default function Home() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true); // 先以靜音自動播放以通過瀏覽器限制
  const [showUnmute, setShowUnmute] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // 嘗試靜音自動播放（最穩）
    v.muted = true;
    v.play().catch(() => {
      // 若連靜音自動播放都被擋，顯示控制鍵讓使用者手動播放
      setShowUnmute(true);
    });
  }, []);

  const handleUnmute = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.muted = false; // 取消靜音
      v.volume = 0.8; // 可調整預設音量
      await v.play(); // 使用者點擊 → 符合政策，可帶聲音播放
      setMuted(false);
      setShowUnmute(false);
    } catch (e) {
      // 若仍被阻擋，顯示控制列讓使用者手動操作
      setShowUnmute(true);
    }
  };

  return (
    <Layout>
      <Enter />
      <div className="bg-white">
        <section className="section-hero-title mb-[50px] aspect-[16/16] sm:aspect-[16/12] md:aspect-[16/6.5] overflow-hidden mt-0 md:mt-5 w-full relative">
          <div className="mask bg-black/20 w-full h-full top-0 left-0 absolute z-30" />

          {/* 影片：預設靜音自動播放，點一下即開聲音 */}
          <video
            ref={videoRef}
            src="/videos/1130417_宜園建設-形象影片_Bcopy(大檔) - Compressed with FlexClip-2.mp4"
            autoPlay
            loop
            playsInline
            preload="auto"
            muted={muted}
            className="absolute inset-0 mt-[60px] w-full h-full object-cover"
          />

          {/* Unmute 按鈕（僅在需要時顯示） */}
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
