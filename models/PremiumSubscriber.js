const mongoose = require("mongoose");

const premiumSubscriberSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("PremiumSubscriber", premiumSubscriberSchema);
