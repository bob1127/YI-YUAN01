"use client";

import Layout from "./Layout";
import React, { useState } from "react";
import Image from "next/image";

export default function About() {
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // "success" | "error"
  const [submitting, setSubmitting] = useState(false);

  const projects = [
    { id: "project1", label: "一青隱", image: "/images/S__28844101.jpg" },
    {
      id: "project2",
      label: "宜園大院",
      image: "/images/project/S__32890919_0.jpg",
    },
  ];

  return (
    <Layout>
      <section className="py-[90px] px-4 md:px-12 lg:px-20 w-full min-h-[80vh] flex flex-col justify-center items-center">
        <div className="w-full max-w-2xl mx-auto bg-white">
          <div className="mb-8 text-center">
            <span className="text-sm tracking-widest text-gray-600 uppercase">
              Form
            </span>
            <h3 className="text-2xl font-bold mt-2">聯絡表單</h3>
          </div>

          <form
            className="flex flex-col gap-6"
            onSubmit={async (e) => {
              e.preventDefault();
              setSubmitting(true);
              setStatus("");
              setStatusType("");

              const form = e.currentTarget;
              const fd = new FormData(form);

              // 準備送往後端的資料
              const payload = {
                name: (fd.get("username") || "").toString().trim(), // 對應後端的 FNAME
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
                  throw new Error(data?.error || data?.detail || "提交失敗，請稍後再試");
                }

                // 成功
                setStatus("您的需求已送出，請靜候人員聯絡您");
                setStatusType("success");
                form.reset(); // 清空表單
              } catch (err) {
                const errorMessage =
                  err instanceof Error ? err.message : "送出失敗，請稍後再試";
                setStatus(errorMessage);
                setStatusType("error");
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
                className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base leading-6 placeholder:text-gray-400 outline-none focus:border-black transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
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
                className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base leading-6 placeholder:text-gray-400 outline-none focus:border-black transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>

            {/* Email */}
            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-800"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="example@mail.com"
                className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base leading-6 placeholder:text-gray-400 outline-none focus:border-black transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>

            {/* 建案選擇 */}
            <div className="flex flex-col gap-3">
              <label className="text-base font-semibold text-gray-800">
                您對哪個建案有興趣
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
                {projects.map((p) => (
                  <label
                    key={p.id}
                    className="relative cursor-pointer group transition-transform hover:scale-[1.02] h-full"
                    title={p.label}
                  >
                    <input
                      type="radio"
                      name="project"
                      value={p.label}
                      className="hidden peer"
                      required
                    />

                    {/* 卡片本體 */}
                    <div className="flex h-full flex-col rounded-xl border-2 border-gray-300 overflow-hidden shadow-sm group-hover:shadow-md peer-checked:border-black peer-checked:shadow-lg transition-all duration-200">
                      <div className="relative w-full aspect-[4/3] md:aspect-[3/2]">
                        <Image
                          src={p.image}
                          alt={p.label}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                          priority={false}
                        />
                      </div>
                      <div className="p-4 text-center text-base font-medium text-gray-800 bg-white">
                        {p.label}
                      </div>
                    </div>

                    {/* 右上角打勾圓點 */}
                    <div className="absolute top-2 right-2 w-5 h-5 bg-black rounded-full text-white flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity">
                      ✓
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* 訊息 */}
            <div className="flex flex-col gap-1 w-full">
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
                className="w-full bg-white border border-gray-300 rounded-xl p-4 text-sm outline-none focus:border-black resize-none transition-colors"
                placeholder="請簡述您的需求或想了解的重點…（選填）"
              />
            </div>

            {/* 按鈕 + 訊息 */}
            <div className="flex flex-col gap-3 mt-2">
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className={`flex-1 inline-flex items-center justify-center rounded-xl px-6 py-4 text-base font-medium transition ${
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
                  className="px-8 inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white text-base font-medium hover:bg-gray-50 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  清除
                </button>
              </div>

              {status && (
                <p
                  className={`mt-2 text-center text-sm font-medium ${
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
      </section>
    </Layout>
  );
}