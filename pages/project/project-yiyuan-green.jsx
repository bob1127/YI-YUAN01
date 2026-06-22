"use client";

import Layout from "../Layout";
import Image from "next/image";
import Link from "next/link";
import { BsTelephone, BsChatDots } from "react-icons/bs";

const HERO_IMAGE = "/images/project/宜園之青/官網圖片-建築經典.jpg";

const Project = () => {
  return (
    <Layout>
      <section className="pt-[150px] pb-10  bg-gray-50 ">
        <div className="w-[85%] max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 min-w-0">
            <div className="relative w-full min-w-0 aspect-[4/3] lg:aspect-[3/2] rounded overflow-hidden">
              <Image
                src={HERO_IMAGE}
                alt="宜園之青 建築外觀示意"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="lg:col-span-6 pl-0 lg:pl-8 min-w-0 flex justify-between flex-col">
            <div id="next-section" className="py-0 sm:py-2">
              <div className="flex flex-col mb-5">
                <h2 className="text-3xl mb-4">宜園之青</h2>
                <p className="text-[#337162] text-sm sm:text-base mb-2">
                  繁城新境 悠悠之青
                </p>
                <p className="text-gray-500 text-sm mb-8">
                  Home in Gentle Gold Waves
                </p>
                <h2 className="text-3xl">建案資訊：</h2>
              </div>

              <div className="grid grid-cols-1 max-w-[450px] gap-x-10 gap-y-3 text-sm sm:text-base">
                <div className="flex  gap-4">
                  <span className="text-gray-500">產品規劃</span>
                  <span className="text-gray-900">純質2房2衛</span>
                </div>
                <div className="flex  gap-4">
                  <span className="text-gray-500">建案特色</span>
                  <span className="text-gray-900">
                    風光宜居｜菁英最青睞的家
                  </span>
                </div>
                <div className="flex  gap-4">
                  <span className="text-gray-500">建築團隊</span>
                  <span className="text-gray-900">劉偉彥建築師事務所</span>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <span>3D外觀示意圖，本公司保有修改之權利.</span>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60]">
        <div className="flex gap-3">
          <Link
            href="tel:0912-345-678"
            className="inline-flex items-center gap-2 rounded-full bg-[#20382c] px-5 py-3 text-white shadow-lg hover:opacity-90 transition"
          >
            <BsTelephone /> 預約看屋
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[#20382c] border shadow hover:bg-emerald-50 transition"
          >
            <BsChatDots /> 線上諮詢
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Project;
