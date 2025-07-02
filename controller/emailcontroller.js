// controllers/emailController.js
const transporter = require("../config/nodemailer"); // your existing mail config

const sendKitEmail = async (req, res) => {
  const { email, fullname } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required." });
  }

  try {
    const mailOptions = {
      from: `"Granville Bucci" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Your Free AI Sales Kit 🎁",
      html: `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
      <h2 style="color: #3b82f6;">Hey ${fullname || "there"},</h2>

      <p>Thanks for signing up! As promised, here’s your free <strong>AI Sales Kit</strong> — everything you need to start turning conversations into cash:</p>

      <ul style="line-height: 1.7;">
        <li>✅ 3 client-winning funnels</li>
        <li>✅ 5 ChatGPT prompts</li>
        <li>✅ 1-page sales checklist</li>
      </ul>

      <div style="margin: 30px 0;">
        <a href="https://bit.ly/free-ai-kit" style="display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
          📥 Download Your Kit
        </a>
      </div>

      <p>Let me know if you’d like help turning this into your first $49–$500 sale. I’ll show you exactly how to do it.</p>

      <p style="margin-top: 40px;">Cheers,<br/><strong>Granville Bucci</strong></p>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Email sent!" });
  } catch (error) {
    console.error("❌ Email send error:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
};

module.exports = sendKitEmail;
