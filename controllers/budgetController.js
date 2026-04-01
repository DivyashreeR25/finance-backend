const Budget = require("../models/Budget");

// Set Budget
const setBudget = async (req, res) => {
  try {
    const { category, limit } = req.body;

    if (!category || !limit) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await Budget.findOne({
      user: req.user.id,
      category,
    });

    let budget;

    if (existing) {
      existing.limit = limit;
      budget = await existing.save();
    } else {
      budget = await Budget.create({
        user: req.user.id,
        category,
        limit,
      });
    }

    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Budgets
const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  setBudget,
  getBudgets,
};