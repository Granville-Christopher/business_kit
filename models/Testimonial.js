const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  testimonial: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
