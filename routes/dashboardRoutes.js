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
 * /api/dashboard/summary:
 *   get:
 *     summary: Get overall financial summary
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Summary data fetched successfully
 */

/**
 * @swagger
 * /api/dashboard/category-totals:
 *   get:
 *     summary: Get category-wise totals
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category totals fetched successfully
 */

/**
 * @swagger
 * /api/dashboard/recent:
 *   get:
 *     summary: Get recent transactions
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent transactions fetched successfully
 */

/**
 * @swagger
 * /api/dashboard/monthly-trends:
 *   get:
 *     summary: Get monthly financial trends
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly trends fetched successfully
 */
router.get("/summary", protect, getSummary);
router.get("/category-totals", protect, getCategoryTotals);
router.get("/recent", protect, getRecentTransactions);
router.get("/monthly-trends", protect, getMonthlyTrends);

module.exports = router;