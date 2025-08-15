"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import "./about.css";

import React, { useState } from "react";
import Image from "next/image";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`transition-opacity duration-700 ease-in-out ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        placeholder="empty"
        loading={priority ? "eager" : "lazy"}
        onLoadingComplete={() => setLoaded(true)}
        className={`object-cover w-full h-auto ${className}`}
      />
    </div>
  );
};

export default function About() {
  return (
    <ReactLenis root>
      <section className="section-hero pt-[10vh]">
        <div className="mb-[10vh] mx-auto w-[98%]">
          <h2 className="text-[4.5rem] font-normal">宜融</h2>
        </div>
        <div className="mx-auto w-[98%]">
          <div className="title">
            <div className="flex flex-col justify-start items-start">
              <div className="flex justify-center items-center">
                <h1 className="text-[3rem] font-normal">Thinking</h1>
                <span className="mx-3">/</span>
                <span className="text-[1.2rem] tracking-widest">建築思維</span>
              </div>
              <p className="max-w-[500px] mb-10 leading-loose tracking-widest">
                為實現客戶的夢想，我們始終重視對話。我們傾聽每一位客戶的需求，
                並根據個別的生活方式提供建議，共同建造理想的居所。透過共同的努力，我們提供安穩與滿足。
              </p>
            </div>
          </div>
          <div className="img overflow-hidden group">
            <ProgressiveImage
              alt="建築思維"
              src="https://niwahouzing.com/wp-content/themes/niwa/assets/images/about/img-about-head_pc.avif"
              width={2500}
              height={900}
              priority={true}
              className="group-hover:scale-110 duration-1000"
            />
          </div>
        </div>
      </section>
      <section className="description py-[10vh]">
        <div className="flex flex-col xl:flex-row">
          <div className="w-full mx-auto lg:w-[30%] p-10">
            <h3 className="text-[2.6rem]">實在的構築</h3>
          </div>
          <div className="w-full mx-auto lg:w-[70%] flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 p-4 sm:p-6 xl:p-10">
              <p className="leading-loose text-gray-700 max-w-full sm:max-w-[85%] tracking-widest">
                我們以「共同思考人生，共同創造」為口號，作為客戶人生的一部分，我們是共同建設的夥伴。住宅不僅僅是建築，而是讓家人能安心生活的寶貴場所。因此，我們會根據每個人的生活方式和價值觀，協助實現他們的夢想和希望。客戶的需求多樣且有時複雜，從新婚夫婦到育兒世代，再到迎接第二人生的人們，我們的使命是提供適合各個生活階段的住宅。
                <br />
                <br />
                我們傾聽客戶的聲音，提出最佳建議，竭盡全力共同創造理想的住宅。不妥協正是我們公司的最大優勢，但這有時對商業方面來說也是一個弱點
                <br />
                <br />
                許多人在要求我們時都這麼說：設計性與品質是相互妥協的關係，必須犧牲其中一個。
                我們相信，實現預算和品質是我們存在的理由，因此我們對年度接受的項目進行限制。
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col p-4 sm:p-6 xl:p-10">
              <p className="leading-loose text-gray-700 max-w-full sm:max-w-[85%] tracking-widest">
                我們始終致力於提供高品質的施工，並承諾提供可靠的服務。從使用的材料到施工方法，我們不斷追求細節，努力每天都能交付令客戶滿意的住屋。基於至今所建立的信任和實績，我們希望能夠持續發展，成為對社區有所貢獻的企業。我們將客戶之間的信任關係放在首位，並希望能建立長久的夥伴關係。最後，若想與我們共同打造理想的住家，請隨時與我們聯繫。真正任性的你，正是我們能提供幫助的對象。我們全體員工衷心期待您的來臨。
              </p>
              <div className="img mt-8">
                <ProgressiveImage
                  src="https://niwahouzing.com/wp-content/uploads/2024/10/6ac2397867767a902ce2217f0a58282f-18.jpg"
                  alt="內文圖片"
                  width={2500}
                  height={900}
                  priority={true}
                  className="group-hover:scale-110 duration-1000"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section_content sm:w-[80%] w-[85%] xl:w-[60%] mx-auto my-10">
        <div className="title sm:py-[20px] py-0 lg:py-[100px] border-b-1 border-gray-300">
          <h1 className="font-normal text-[2rem]">
            「不熱也不冷」 世界標準的房子。
          </h1>
          <p>
            被動設計是指最大限度地利用太陽、風等自然能源，創造舒適節能的居住環境的設計思想和設計方法。
          </p>
        </div>
        <div className="border-b-1 border-gray-300 py-[20px] my-5 lg:py-[100px]">
          <h2>被動設計的特點</h2>
          <div className="flex flex-col sm:flex-row gap-5">
            <ProgressiveImage
              src="/images/feature-passive-design01.png"
              alt="被動設計1"
              width={900}
              height={550}
            />
            <ProgressiveImage
              src="/images/feature-passive-design02.png"
              alt="被動設計2"
              width={900}
              height={550}
            />
          </div>
        </div>
        <div className="py-[20px] lg:py-[100px] my-5 border-b-1 border-gray-300">
          <h2>高氣密、高隔熱</h2>
          <div>
            <ProgressiveImage
              src="/images/feature-passive-design03.png"
              alt="高氣密高隔熱"
              width={1700}
              height={550}
            />
          </div>
        </div>
      </section>
    </ReactLenis>
  );
}
