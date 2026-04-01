const express = require("express");
const router = express.Router();


const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} = require("../controllers/recordController");

/**
 * @swagger
 * /api/records:
 *   post:
 *     summary: Create a financial record
 *     tags: [Records]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Record created
 */
/**
 * @swagger
 * /api/records/{id}:
 *   put:
 *     summary: Update a record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Record updated
 */

/**
 * @swagger
 * /api/records/{id}:
 *   delete:
 *     summary: Delete a record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Record deleted
 */


// ADMIN ONLY
router.post("/", protect, authorizeRoles("admin"), createRecord);
router.delete("/:id", protect, authorizeRoles("admin"), deleteRecord);

// ADMIN + ANALYST
/**
 * @swagger
 * /api/records:
 *   get:
 *     summary: Get records with filter and pagination
 *     tags: [Records]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Records fetched
 */

router.get("/", protect, authorizeRoles("admin", "analyst"), getRecords);
router.put("/:id", protect, authorizeRoles("admin", "analyst"), updateRecord);

module.exports = router;