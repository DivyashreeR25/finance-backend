const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { getAIInsights } = require("../controllers/aiController");

/**
 * @swagger
 * /api/ai/insights:
 *   get:
 *     summary: Get AI financial insights
 *     tags: [AI]
 *     responses:
 *       200:
 *         description: AI insights generated
 */
router.get("/insights", protect, getAIInsights);

module.exports = router;