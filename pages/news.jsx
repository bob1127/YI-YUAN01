"use client";
import { useRef } from "react";
import Layout from "./Layout";
import React from "react";

import gsap from "gsap";

const Photos = () => {
  return (
    <Layout>
      <reactlenis root className>
        <section className="section-hero-title relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden">
          {/* 背景圖 */}
          <img
            src="/images/news/pexels-goldcircuits-4147343.jpg"
            alt="經典建築案例"
            loading="lazy"
            decoding="async"
            width="1920"
            height="1080"
            className="absolute top-0 left-0 w-full h-full object-cover"
            sizes="100vw"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />

          {/* 左上角文字 */}
          <div className="absolute top-[20%] left-[25%] z-50 p-6 sm:p-10 text-white">
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-wide drop-shadow-md">
              NEWS
            </h1>
          </div>
        </section>

        <section className="section-content py-10 lg:py-20">
          <div className=" flex flex-col lg:flex-row max-w-[1920px]  mx-auto">
            <div className="left w-full lg:w-1/2 ">
              {/* 區塊標題 */}
              <div className="flex flex-col px-4 md:px-8 xl:px-16">
                <h2>工程進度｜</h2>
              </div>

              {/* 第一區塊 */}
              <div className="flex flex-col px-4 md:px-8 xl:px-16">
                <div className="title pt-10 mb-4 border-b-1 flex justify-between w-full">
                  <h3 className="text-[22px]">宜園一青隱</h3>
                  <span>更新日期：114.05</span>
                </div>

                <div className="news-img flex flex-col md:flex-row gap-6 items-stretch">
                  {/* 左側兩圖 */}
                  <div className="flex flex-col gap-6 md:w-1/2">
                    {/* 上圖 */}
                    <div className="relative w-full h-[288px] overflow-hidden group">
                      <img
                        src="/images/news/樓版清洗.jpg"
                        alt="樓版清洗"
                        loading="lazy"
                        decoding="async"
                        width="1200"
                        height="800"
                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-r from-black/70 to-transparent flex items-center px-4">
                        <p className="text-white text-sm">樓版清洗</p>
                      </div>
                    </div>

                    {/* 下圖 */}
                    <div className="relative w-full h-[288px] overflow-hidden group">
                      <img
                        src="/images/news/樓板施作完成,灌漿前照片.jpg"
                        alt="樓板施作完成，灌漿前照片"
                        loading="lazy"
                        decoding="async"
                        width="1200"
                        height="800"
                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-r from-black/70 to-transparent flex items-center px-4">
                        <p className="text-white text-sm">
                          樓板施作完成，灌漿前照片
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 右側圖 */}
                  <div className="md:w-1/2">
                    <div className="relative w-full h-[600px] overflow-hidden group">
                      <img
                        src="/images/news/正面外觀施工照片.jpg"
                        alt="正面外觀施工照片"
                        loading="lazy"
                        decoding="async"
                        width="1200"
                        height="1600"
                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-r from-black/70 to-transparent flex items-center px-4">
                        <p className="text-white text-sm">正面外觀施工照片</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 第二區塊 */}
              <div className="flex flex-col px-4 md:px-8 xl:px-16">
                <div className="title pt-10 mb-4 border-b-1 flex justify-between w-full">
                  <h3 className="text-[22px]">宜園13期新案</h3>
                  <span>更新日期：114.05</span>
                </div>

                <div className="news-img flex flex-col md:flex-row gap-6 items-stretch">
                  {/* 右圖 */}
                  <div className="md:w-1/2">
                    <div className="relative w-full h-[600px] overflow-hidden group">
                      <img
                        src="/images/news/土方開挖完成.jpg"
                        alt="土方開挖完成"
                        loading="lazy"
                        decoding="async"
                        width="1200"
                        height="1600"
                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-r from-black/70 to-transparent flex items-center px-4">
                        <p className="text-white text-sm">土方開挖完成</p>
                      </div>
                    </div>
                  </div>

                  {/* 左側兩圖 */}
                  <div className="flex flex-col gap-6 md:w-1/2">
                    {/* 上圖 */}
                    <div className="relative w-full h-[288px] overflow-hidden group">
                      <img
                        src="/images/news/擋土柱鋼筋幫紮完成勘驗.jpg"
                        alt="擋土柱鋼筋綁紮完成"
                        loading="lazy"
                        decoding="async"
                        width="1200"
                        height="800"
                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-r from-black/70 to-transparent flex items-center px-4">
                        <p className="text-white text-sm">擋土柱鋼筋綁紮完成</p>
                      </div>
                    </div>

                    {/* 下圖 */}
                    <div className="relative w-full h-[288px] overflow-hidden group">
                      <img
                        src="/images/news/擋土柱施作-1.jpg"
                        alt="擋土柱施作中"
                        loading="lazy"
                        decoding="async"
                        width="1200"
                        height="800"
                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-r from-black/70 to-transparent flex items-center px-4">
                        <p className="text-white text-sm">擋土柱施作中</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 可選：右欄區塊 */}
            <div className="right w-1/2">
              {/* 區塊標題 */}
              <div className="flex flex-col px-4 md:px-8 xl:px-16">
                <h2>工程進度｜</h2>
              </div>

              {/* 第一區塊 */}
              <div className="flex flex-col px-4 md:px-8 xl:px-16">
                <div></div>
              </div>
            </div>
          </div>
        </section>
      </reactlenis>
    </Layout>
  );
};

export default Photos;
const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];
