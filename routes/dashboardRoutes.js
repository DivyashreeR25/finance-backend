const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getSummary,
  getCategoryTotals,
  getRecentTransactions,
  getMonthlyTrends,
} = require("../controllers/dashboardController");

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get dashboard summary
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Dashboard data
 */
router.get("/summary", protect, getSummary);
router.get("/category-totals", protect, getCategoryTotals);
router.get("/recent", protect, getRecentTransactions);
router.get("/monthly-trends", protect, getMonthlyTrends);

module.exports = router;