require("dotenv").config();
const axios = require("axios");

exports.generateQuiz = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1-0528:free",
        messages: [{ role: "user", content: message }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": process.env.YOUR_SITE_URL,
          "X-Title": process.env.YOUR_SITE_NAME,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = response.data.choices?.[0]?.message?.content;
    res.json({ aiResponse: reply || "No response from AI" });

    if (reply) {
      console.log(parseMCQs(reply));
    }
  } catch (err) {
    console.error("OpenRouter error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to connect to OpenRouter API" });
  }
};
