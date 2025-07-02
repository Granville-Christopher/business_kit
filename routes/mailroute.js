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
    res.render("premiumkit");
})
router.get("/testimonial" ,(req, res) => {
    res.render("testimonials");
})
router.post("/send-kit", sendKitEmail);
router.post("/submit-testimonial", sendTestimonial);

const FreeKitSignup = require("../models/FreeKitSignup");

router.get("/admin", async (req, res) => {
  try {
    const freeKitSubscribers = await FreeKitSignup.find().sort({ createdAt: -1 }).lean();
    const testimonials = await require("../models/Testimonial").find().sort({ createdAt: -1 }).lean();
    // Premium kit buyers data not available yet
    res.render("admin/admin", { freeKitSubscribers, testimonials });
  } catch (error) {
    console.error("Error fetching admin data:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
