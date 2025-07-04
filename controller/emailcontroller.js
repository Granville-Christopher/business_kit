const transporter = require("../config/nodemailer"); 
const Testimonial = require("../models/Testimonial");
const FreeKitSignup = require("../models/FreeKitSignup");
const PremiumSubscriber = require("../models/PremiumSubscriber");

const sendKitEmail = async (req, res) => {
  const { email, fullname } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required." });
  }

  try {
    const mailOptions = {
      from: `"Granville Christopher" <${process.env.MAIL_USER}>`,
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

      <p style="margin: 40px 0 20px 0; font-size: 16px;">
        Want the <strong>full kit with 10x more tools</strong> to help you land clients faster?<br/>
        Upgrade now to get exclusive access to:
        <br><br>
        ✅ 12 ChatGPT Sales Prompts<br>
        ✅ Case Study Scripts & Templates<br>
        ✅ Cold DM and Email Frameworks<br>
        ✅ Outreach Templates for LinkedIn & Upwork<br>
        ✅ A Mini Offer Builder, Mistakes to Avoid, and more...
      </p>

      <div style="margin-bottom: 30px;">
        <a href="https://www.granvillechristopher.site/premiumkit" style="display: inline-block; background-color: #1e3a8a; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
          🚀 Upgrade to Premium – Just $7.99
        </a>
      </div>

      <p style="font-size: 15px; color: #555;">
        It's a one-time offer to give you everything you need to start landing clients with confidence — no fluff, no overwhelm.
      </p>

      <hr style="margin: 40px 0; border: none; border-top: 1px solid #ccc;" />

      <p style="font-size: 15px;">
        🙏 <strong>Your feedback matters</strong> — it helps us improve and lets others know this kit really works. If you found it helpful, would you mind leaving a quick review?
      </p>

      <div style="margin: 20px 0;">
        <a href="https://www.granvillechristopher.site/testimonial" style="display: inline-block; background-color: #3b82f6; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold;">
          ✍️ Leave a Testimonial
        </a>
      </div>

      <p style="margin-top: 40px;">Cheers,<br/><strong>Granville Christopher</strong></p>
    </div>
  `,
    };

    // Send email to user
    await transporter.sendMail(mailOptions);
    // Save signup info to database
    const existingSignup = await FreeKitSignup.findOne({ email });
    if (!existingSignup) {
      const newSignup = new FreeKitSignup({ fullname, email });
      await newSignup.save();
    }

    // Send notification email to admin
    const adminMailOptions = {
      from: `"Granville Christopher" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: "New AI Kit Signup",
      html: `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h2>New AI Kit Signup</h2>
        <p><strong>Name:</strong> ${fullname || "N/A"}</p>
        <p><strong>Email:</strong> ${email}</p>
      </div>
    `,
    };
    await transporter.sendMail(adminMailOptions);

    res.status(200).json({ success: true, message: "Email sent!" });
  } catch (error) {
    console.error("❌ Email send error:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
};

const sendTestimonial = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ success: false, message: "Request body is missing." });
  }
  const { name, testimonial } = req.body;

  if (!testimonial || !name) {
    return res
      .status(400)
      .json({ success: false, message: "Name and testimonial are required." });
  }

  try {
    // Save testimonial to database
    const newTestimonial = new Testimonial({ name, testimonial });
    await newTestimonial.save();

    const mailOptions = {
      from: `"Granville Christopher" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: "New Testimonial Received",
      html: `
      <div style="font-family: Arial, sans-serif; color:S #333; padding: 20px;">
        <h2 style="color: #3b82f6;">New Testimonial Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Testimonial:</strong> ${testimonial}</p>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Testimonial submitted!" });
  } catch (error) {
    console.error("❌ Testimonial send error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to submit testimonial." });
  }
};


const sendPremiumKitEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required." });
  }
  try {
    const mailOptions = {
      from: `"Granville Christopher" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Your Premium AI Client Kit",
      html: `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h2 style="color: #1e40af;">Hello,</h2>
        <p>Thank you for purchasing the Premium AI Client Kit! You can download your kit using the link below:</p>
        <div style="margin: 30px 0;">
          <a href="http://bit.ly/4ewGLJn" style="display: inline-block; background-color: #1e40af; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
            📥 Download Your Premium Kit
          </a>
        </div>
        <p>If you have any questions or need assistance, feel free to reply to this email.</p>
        <p style="margin-top: 40px;">Best regards,<br/><strong>Granville Christopher</strong></p>
      </div>
    `,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Premium kit email sent!" });
  } catch (error) {
    console.error("❌ Premium kit email send error:", error);
    res.status(500).json({ success: false, message: "Failed to send premium kit email." });
  }
};

module.exports = {
  sendKitEmail,
  sendTestimonial,
  sendPremiumKitEmail,
};
