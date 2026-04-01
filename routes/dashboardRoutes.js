const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getSummary,
  getCategoryTotals,
  getRecentTransactions,
  getMonthlyTrends,
} = require("../controllers/dashboardController");

router.get("/summary", protect, getSummary);
router.get("/category-totals", protect, getCategoryTotals);
router.get("/recent", protect, getRecentTransactions);
router.get("/monthly-trends", protect, getMonthlyTrends);

module.exports = router;