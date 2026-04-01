const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { setBudget, getBudgets } = require("../controllers/budgetController");

/**
 * @swagger
 * /api/budgets:
 *   post:
 *     summary: Set budget for a category
 *     tags: [Budget]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *               limit:
 *                 type: number
 *     responses:
 *       200:
 *         description: Budget created
 */
router.post("/", protect, setBudget);
/**
 * @swagger
 * /api/budgets:
 *   get:
 *     summary: Get user budget
 *     tags: [Budget]
 *     responses:
 *       200:
 *         description: Budget fetched
 */
router.get("/", protect, getBudgets);

module.exports = router;