"use client";

import Layout from "./Layout";
import Link from "next/link";
import React, { useState } from "react";

export default function About() {
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // "success" | "error"
  const [submitting, setSubmitting] = useState(false);

  const projects = [
    { id: "project1", label: "一青隱", image: "/images/S__28844101.jpg" },
    { id: "project2", label: "宜園大院", image: "/images/S__28844100.png" },
  ];

  return (
    <Layout>
      <section className="py-[10vh] px-4 md:px-12 lg:px-20 w-full xl:!w-[80%] 2xl:w-full max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start min-h-[600px]">
          {/* 左側：表單 */}
          <div className="w-full px-4 max-w-3xl mx-auto md:mx-0 h-full flex items-start">
            <div className="w-full">
              <div className="mb-4">
                <span className="text-sm tracking-widest text-gray-600">
                  Form
                </span>
                <h3 className="text-xl font-bold">聯絡表單</h3>
              </div>

              <form
                className="flex flex-col gap-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSubmitting(true);
                  setStatus("");

                  const form = e.currentTarget;
                  const fd = new FormData(form);

                  // 後端需要的欄位命名
                  const payload = {
                    name: (fd.get("username") || "").toString().trim(),
                    email: (fd.get("email") || "").toString().trim(),
                    phone: (fd.get("phone") || "").toString().trim(),
                    project: (fd.get("project") || "").toString(),
                    message: (fd.get("message") || "").toString().trim(),
                  };

                  try {
                    const res = await fetch("/api/subscribe", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(payload),
                    });

                    const data = await res.json().catch(() => ({}));

                    if (!res.ok) {
                      throw new Error(
                        data?.error || data?.detail || "提交失敗"
                      );
                    }

                    setStatus("您的需求已送出，請靜候人員聯絡您");
                    form.reset(); // ✅ 成功後重置表單
                  } catch (err) {
                    const errorMessage =
                      err instanceof Error
                        ? err.message
                        : "送出失敗，請稍後再試";
                    setStatus(errorMessage);
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {/* 姓名 */}
                <div className="w-full">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-800"
                  >
                    姓名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    autoComplete="name"
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-3 text-base leading-6 placeholder:text-gray-400 outline-none focus:outline-none focus:ring-0 focus:border-black disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* 聯絡電話 */}
                <div className="w-full">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-800"
                  >
                    聯絡電話 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-3 text-base leading-6 placeholder:text-gray-400 outline-none focus:outline-none focus:ring-0 focus:border-black disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Email（改成必填） */}
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-800"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="example@mail.com"
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-3 text-base leading-6 placeholder:text-gray-400 outline-none focus:outline-none focus:ring-0 focus:border-black disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* 建案選擇 */}
                <div className="flex flex-col gap-3">
                  <label className="text-base font-semibold text-gray-800">
                    您對哪個建案有興趣
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((p) => (
                      <label
                        key={p.id}
                        className="relative cursor-pointer group transition-transform hover:scale-[1.02]"
                        title={p.label}
                      >
                        <input
                          type="radio"
                          name="project"
                          value={p.label}
                          className="hidden peer"
                          required
                        />
                        <div className="rounded-xl border-2 border-gray-300 overflow-hidden shadow-sm group-hover:shadow-md peer-checked:border-black peer-checked:shadow-lg transition-all duration-200">
                          <img
                            src={p.image}
                            alt={p.label}
                            className="w-full h-[400px] sm:h-auto object-cover"
                          />
                          <div className="p-4 text-center text-base font-medium text-gray-800 bg-white">
                            {p.label}
                          </div>
                        </div>
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full border-2 border-white bg-black opacity-0 peer-checked:opacity-100 transition" />
                      </label>
                    ))}
                  </div>
                </div>

                {/* 訊息（選填） */}
                <div className="flex flex-col gap-1 mt-5 w-full">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-gray-800"
                  >
                    諮詢內容
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm outline-none focus:outline-none focus:ring-0 focus:border-black resize-none"
                    placeholder="請簡述您的需求或想了解的重點…（選填）"
                  />
                </div>

                {/* 按鈕 + 訊息 */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium transition ${
                        submitting
                          ? "bg-gray-400 cursor-not-allowed text-white"
                          : "bg-black text-white hover:opacity-90"
                      }`}
                    >
                      {submitting ? "送出中…" : "送出"}
                    </button>
                    <button
                      type="reset"
                      disabled={submitting}
                      onClick={() => {
                        setStatus("");
                        setStatusType("");
                      }}
                      className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-medium hover:bg-gray-50 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      清除
                    </button>
                  </div>

                  {status && (
                    <p
                      className={`mt-2 text-sm font-medium ${
                        statusType === "success"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {status}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* 右側：地圖（維持不變） */}
          <div className="flex flex-col px-4 gap-12">
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-sm tracking-widest text-gray-600">
                  Location
                </span>
                <h3 className="text-xl font-bold">Map</h3>
              </div>
              <div className="w-full overflow-hidden rounded-lg">
                <div className="relative w-full aspect-[3/2] max-h-[670px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3639.9665782451734!2d120.67564991235373!3d24.172904872332158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x44766439ed9d2f13%3A0x7915785e2ed054c3!2z5a6c5ZyS5bu66Kit6IKh5Lu95pyJ6ZmQ5YWs5Y-4!5e0!3m2!1szh-TW!2stw!4v1749193687174!5m2!1szh-TW!2stw"
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="text-sm text-gray-700 space-y-2">
                <p className="font-semibold">YI-YUAN</p>
                <p>宜園建設</p>
              </div>
              <div className="text-right">
                <Link
                  href="/about"
                  className="border-b border-black text-sm tracking-widest hover:opacity-80"
                >
                  About Yi Yuan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
