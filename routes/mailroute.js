const express = require("express");
const router = express.Router();
const { sendKitEmail, sendTestimonial } = require("../controller/emailcontroller");
const Testimonial = require("../models/Testimonial");

router.get("/" ,(req, res) => {
    res.render("index");
})
router.get("/premiumkit" ,async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 }).limit(5).lean();
        res.render("bundle", { testimonials });
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        res.render("bundle", { testimonials: [] });
    }
})
router.get("/downloadpremiumkit" ,(req, res) => {
    res.render("premiumkitii");
})
router.get("/testimonial" ,(req, res) => {
    res.render("testimonials");
})
router.post("/send-kit", sendKitEmail);
router.post("/submit-testimonial", sendTestimonial);

const FreeKitSignup = require("../models/FreeKitSignup");
const PremiumSubscriber = require("../models/PremiumSubscriber");

router.get("/admin", async (req, res) => {
  try {
    const freeKitSubscribers = await FreeKitSignup.find().sort({ createdAt: -1 }).lean();
    const testimonials = await require("../models/Testimonial").find().sort({ createdAt: -1 }).lean();
    const premiumSubscribers = await PremiumSubscriber.find().sort({ createdAt: -1 }).lean();
    res.render("admin/admin", { freeKitSubscribers, testimonials, premiumSubscribers });
  } catch (error) {
    console.error("Error fetching admin data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/premium-subscribe", async (req, res) => {
  const { email, fullname } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required." });
  }
  try {
    const existing = await PremiumSubscriber.findOne({ email });
    if (!existing) {
      const newSubscriber = new PremiumSubscriber({ email, fullname });
      await newSubscriber.save();
    }
    res.status(200).json({ success: true, message: "Premium subscription saved." });
  } catch (error) {
    console.error("Error saving premium subscription:", error);
    res.status(500).json({ success: false, message: "Failed to save premium subscription." });
  }
});

module.exports = router;
