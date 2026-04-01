const Record = require("../models/Record");

// Dashboard Summary
const getSummary = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const records = await Record.find({ user: userId });

    let totalIncome = 0;
    let totalExpense = 0;

    records.forEach((r) => {
      if (r.type === "income") totalIncome += r.amount;
      else totalExpense += r.amount;
    });

    const netBalance = totalIncome - totalExpense;

    res.json({
      totalIncome,
      totalExpense,
      netBalance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSummary };

// Category-wise totals
const mongoose = require("mongoose");

const getCategoryTotals = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const data = await Record.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json(data);
  } catch (error) {
    console.log("Category totals error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get recent transactions
const getRecentTransactions = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const records = await Record.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get monthly trends
const getMonthlyTrends = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const data = await Record.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId), // 🔥 FIX
        },
      },
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: { "_id": 1 },
      },
    ]);

    res.json(data);
  } catch (error) {
    console.log("Monthly trends error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSummary,
  getCategoryTotals,
  getRecentTransactions,
  getMonthlyTrends,
};