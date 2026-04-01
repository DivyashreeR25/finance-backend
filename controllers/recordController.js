const Record = require("../models/Record");

// Create Record
const Budget = require("../models/Budget");

const createRecord = async (req, res) => {
  try {
    const { amount, type, category } = req.body;

    if (!amount || !type || !category) {
      return res.status(400).json({ message: "All fields required" });
    }

    const record = await Record.create({
      ...req.body,
      user: req.user.id,
    });

    let warning = null;
    
    if (type === "expense") {
      const budget = await Budget.findOne({
        user: req.user.id,
        category,
      });

      console.log("User ID:", req.user.id);
      console.log("Category:", category);

      if (budget) {
        const mongoose = require("mongoose");

const totalSpent = await Record.aggregate([
  {
    $match: {
      user: new mongoose.Types.ObjectId(req.user.id), 
      category: category,
      type: "expense",
    },
  },
  {
    $group: {
      _id: null,
      total: { $sum: "$amount" },
    },
  },
]);

        console.log("Aggregation result:", totalSpent);

        const spent = totalSpent.length > 0 ? totalSpent[0].total : 0;

        console.log("Budget Limit:", budget.limit);
        console.log("Total Spent:", spent);

        if (spent > budget.limit) {
          warning = `Budget exceeded for ${category} 🚨`;
        }
      }
    }

    res.status(201).json({
      record,
      warning,
    });
  } catch (error) {
    console.error("Create Record Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createRecord };

// Get Records
const getRecords = async (req, res) => {
  try {
    console.log("Query params:", req.query);

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const filter = {
      user: req.user.id,
    };

    // Validate TYPE filter
    if (req.query.type) {
      if (!["income", "expense"].includes(req.query.type)) {
        return res.status(400).json({
          message: "Invalid type filter. Must be 'income' or 'expense'",
        });
      }
      filter.type = req.query.type;
    }

    // CATEGORY validation
    if (req.query.category !== undefined) {
      if (req.query.category.trim() === "") {
        return res.status(400).json({
          message: "Category cannot be empty",
        });
      }
      filter.category = req.query.category;
    }

    console.log("Final Filter:", filter);

    const records = await Record.find(filter)
      .sort({ createdAt: -1 }) // Sorting (latest first)
      .skip(skip)
      .limit(limit);

    const total = await Record.countDocuments(filter);

    res.json({
      total,
      page,
      limit,
      count: records.length,
      data: records,
    });
  } catch (error) {
    console.error("Get Records Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Update Record
const updateRecord = async (req, res) => {
  try {
    console.log("👤 req.user:", req.user);

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id || req.user._id;

    const record = await Record.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      req.body,
      { new: true }
    );

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(record);
  } catch (error) {
    console.log("Error updating record:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Delete Record
const deleteRecord = async (req, res) => {
  try {
    console.log("👤 req.user:", req.user);

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id || req.user._id;

    const record = await Record.findOneAndDelete({
      _id: req.params.id,
      user: userId,
    });

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.log("Error deleting record:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
};