// controllers/emailController.js
const transporter = require("../config/nodemailer"); // your existing mail config

const sendKitEmail = async (req, res) => {
  const { email, fullname } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required." });
  }

  try {
    const mailOptions = {
      from: `"Granville Bucci" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Your Free AI Sales Kit 🎁",
      html: `
        <p>Hey ${fullname || "there"},</p>
        <p>As promised — here’s your free <strong>AI Sales Kit</strong>:</p>
        <ul>
          <li>✅ 3 client-winning funnels</li>
          <li>✅ 5 ChatGPT prompts</li>
          <li>✅ 1-page sales checklist</li>
        </ul>
        <p><a href="https://bit.ly/free-ai-kit" style="color:#1e90ff;">📥 Click here to download your kit</a></p>
        <p>Let me know if you'd like help turning this into your first $49–$500 sale.</p>
        <p>Cheers,<br/>Granville</p>
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
