const Record = require("../models/Record");

const getAIInsights = async (req, res) => {
  try {
    const userId = req.user.id;

    const records = await Record.find({ user: userId });

    if (!records.length) {
      return res.json({ message: "No records to analyze" });
    }

    const summary = records.map((r) => ({
      amount: r.amount,
      type: r.type,
      category: r.category,
    }));

    const prompt = `
You are an expert financial analyst AI.

Analyze the user's financial data deeply and return ONLY valid JSON.

The response must be detailed, professional, and insightful.

Format:
{
  "spendingPattern": "Detailed explanation of income and expense behavior",
  "insights": "Deep observations about patterns, trends, consistency",
  "suggestion": "Actionable financial advice (budgeting, saving, investing)",
  "riskAnalysis": "Potential risks in financial behavior",
  "warning": "Any critical warning if applicable, else null"
}

Rules:
- Be detailed (at least 3–4 lines per field)
- No markdown, no explanation outside JSON
- No code blocks

Data:
${JSON.stringify(summary)}
`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    const data = await response.json();

    console.log("Groq Raw Response:", data);

    if (!response.ok) {
      return res.status(500).json({
        message: data.error?.message || "Groq API error",
      });
    }

    if (!data.choices || !data.choices.length) {
      return res.status(500).json({
        message: "Invalid AI response format",
        raw: data,
      });
    }

    let aiText = data.choices[0].message.content;

    console.log("AI Text Before Cleanup:", aiText);

    const jsonMatch = aiText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return res.json({
        success: false,
        raw: aiText,
      });
    }

    let parsed;

    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch (err) {
      return res.json({
        success: false,
        message: "Failed to parse AI JSON",
        raw: aiText,
      });
    }

    res.json({
      success: true,
      insights: parsed,
    });
  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAIInsights };