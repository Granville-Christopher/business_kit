const express = require("express");
const router = express.Router();
const sendKitEmail = require("../controller/emailcontroller");

router.get("/" ,(req, res) => {
    res.render("index");
})
router.post("/send-kit", sendKitEmail);

module.exports = router;