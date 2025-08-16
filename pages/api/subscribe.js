// pages/api/subscribe.js
import crypto from "crypto";

const API_KEY = "13c31c4adedfe18364b0f6968397a557-us7"; // 你的 key
const DATACENTER = "us7";
const LIST_ID = "e16da303cc"; // 你的 Audience ID

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { email, username, name, phone, project, message } = req.body || {};

    const EMAIL = (email || "").toString().trim().toLowerCase();
    const FNAME = (name || username || "").toString().trim();
    const PHONE = (phone || "").toString().trim();
    const PROJECT = (project || "").toString().trim();
    const MESSAGE = (message || "").toString().trim();

    if (!EMAIL) {
      return res.status(400).json({ error: "請輸入 Email" });
    }

    // upsert 需要 md5(lowercase(email))
    const subscriberHash = crypto.createHash("md5").update(EMAIL).digest("hex");
    const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/${subscriberHash}`;

    const payload = {
      email_address: EMAIL,
      status_if_new: "subscribed",
      merge_fields: {
        FNAME,
        PHONE,
        PROJECT, // 後台需建立 Tag=PROJECT（Text）
        MESSAGE, // 後台可選 Tag=MESSAGE（Text）
      },
    };

    const mcRes = await fetch(url, {
      method: "PUT", // Upsert：新建或更新
      headers: {
        Authorization: `apikey ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await mcRes.json().catch(() => ({}));

    if (!mcRes.ok) {
      // 常見：merge field 未建立、email 格式錯誤等
      const detail =
        data?.detail ||
        (Array.isArray(data?.errors) && data.errors.map(e => e?.message).join("; ")) ||
        "Mailchimp error";
      return res.status(mcRes.status).json({ error: detail });
    }

    return res
      .status(200)
      .json({ message: "您的需求已送出，請靜候人員聯絡您", id: data?.id });
  } catch (err) {
    return res.status(500).json({ error: err?.message || "Server error" });
  }
}
