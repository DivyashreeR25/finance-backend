const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { getAIInsights } = require("../controllers/aiController");

router.get("/insights", protect, getAIInsights);

module.exports = router;