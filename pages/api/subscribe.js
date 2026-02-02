// pages/api/subscribe.js
import crypto from "crypto";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // 1. 取得環境變數 (請確認 .env.local 已設定 GMAIL_USER 與 GMAIL_PASS)
  const GMAIL_USER = process.env.GMAIL_USER;
  const GMAIL_PASS = process.env.GMAIL_PASS;
  
  // 指定收信信箱 (你的 Hinet 信箱)
  const RECEIVER_EMAIL = "Yi.yuan@msa.hinet.net";

  // Mailchimp 設定 (選填，若沒設定 key 則跳過)
  const MC_KEY = process.env.MAILCHIMP_API_KEY;
  const MC_SERVER = process.env.MAILCHIMP_SERVER_PREFIX;
  const MC_ID = process.env.MAILCHIMP_AUDIENCE_ID;

  try {
    // 2. 解析前端資料
    const { email, name, username, phone, project, message } = req.body || {};

    const EMAIL = (email || "").toString().trim().toLowerCase();
    // 前端 payload 送來的是 name，但也保留 username 兼容
    const FNAME = (name || username || "").toString().trim(); 
    const PHONE = (phone || "").toString().trim();
    const PROJECT = (project || "").toString().trim();
    const MESSAGE = (message || "").toString().trim();

    if (!EMAIL || !FNAME || !PHONE) {
      return res.status(400).json({ error: "請填寫姓名、電話與 Email" });
    }

    // ==========================================
    // 任務 A：寄送通知信到 Hinet (最優先執行)
    // ==========================================
    if (GMAIL_USER && GMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASS,
          },
        });

        const mailOptions = {
          from: `"建案諮詢表單" <${GMAIL_USER}>`, // 寄件人顯示名稱
          to: RECEIVER_EMAIL, // ★ 寄到 Yi.yuan@msa.hinet.net
          subject: `[新客戶諮詢] ${FNAME} - 對 ${PROJECT} 有興趣`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
              <h2 style="color: #333;">收到新的網站諮詢</h2>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
              <p><strong>客戶姓名：</strong> ${FNAME}</p>
              <p><strong>聯絡電話：</strong> ${PHONE}</p>
              <p><strong>Email：</strong> <a href="mailto:${EMAIL}">${EMAIL}</a></p>
              <p><strong>感興趣建案：</strong> ${PROJECT}</p>
              <br/>
              <p><strong>諮詢內容：</strong></p>
              <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${MESSAGE || "（未填寫詳細內容）"}</div>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`信件已成功發送至 ${RECEIVER_EMAIL}`);
      } catch (mailError) {
        console.error("寄信失敗:", mailError);
        // 如果連信都寄不出去，拋出錯誤讓前端知道
        throw new Error("系統忙碌中，通知信發送失敗");
      }
    } else {
      console.warn("未設定 Gmail 環境變數，跳過寄信步驟");
    }

    // ==========================================
    // 任務 B：存入 Mailchimp (次要，失敗不報錯)
    // ==========================================
    if (MC_KEY && MC_SERVER && MC_ID) {
      try {
        const subscriberHash = crypto.createHash("md5").update(EMAIL).digest("hex");
        const mcUrl = `https://${MC_SERVER}.api.mailchimp.com/3.0/lists/${MC_ID}/members/${subscriberHash}`;

        await fetch(mcUrl, {
          method: "PUT",
          headers: {
            Authorization: `apikey ${MC_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_address: EMAIL,
            status_if_new: "subscribed",
            merge_fields: {
              FNAME,
              PHONE,
              PROJECT,
              MESSAGE,
            },
          }),
        });
      } catch (mcError) {
        console.warn("Mailchimp 同步失敗 (但不影響寄信):", mcError);
      }
    }

    // 全部成功
    return res.status(200).json({ message: "您的需求已送出，我們將盡快聯繫您！" });

  } catch (err) {
    return res.status(500).json({ error: err.message || "Server error" });
  }
}