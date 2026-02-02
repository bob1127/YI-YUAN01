// pages/api/subscribe.js
import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // 從環境變數讀取 (更安全)
  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const DATACENTER = process.env.MAILCHIMP_SERVER_PREFIX; // 例如 us7
  const LIST_ID = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!API_KEY || !DATACENTER || !LIST_ID) {
    return res.status(500).json({ error: "系統設定錯誤 (Missing Environment Variables)" });
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

    const subscriberHash = crypto.createHash("md5").update(EMAIL).digest("hex");
    const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/${subscriberHash}`;

    const payload = {
      email_address: EMAIL,
      status_if_new: "subscribed",
      merge_fields: {
        FNAME,
        PHONE,
        PROJECT, 
        MESSAGE, 
      },
    };

    const mcRes = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `apikey ${API_KEY}`, // 這裡會自動代入環境變數
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await mcRes.json().catch(() => ({}));

    if (!mcRes.ok) {
      // 這裡如果失敗，會顯示 Mailchimp 回傳的錯誤
      const detail = data?.detail || "Mailchimp error";
      console.error("Mailchimp Error:", detail); // 在後端終端機印出錯誤以便除錯
      return res.status(mcRes.status).json({ error: detail });
    }

    return res
      .status(200)
      .json({ message: "您的需求已送出，請靜候人員聯絡您" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}