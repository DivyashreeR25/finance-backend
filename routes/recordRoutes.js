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

// ADMIN ONLY
router.post("/", protect, authorizeRoles("admin"), createRecord);
router.delete("/:id", protect, authorizeRoles("admin"), deleteRecord);

// ADMIN + ANALYST
router.get("/", protect, authorizeRoles("admin", "analyst"), getRecords);
router.put("/:id", protect, authorizeRoles("admin", "analyst"), updateRecord);

module.exports = router;