import axios from "axios";
import Flow from "../models/Flow.js";

export const askAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "nvidia/nemotron-3-super-120b-a12b:free",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant. Answer in 1-2 short sentences. Do not use bullet points, asterisks (*), or markdown. Keep the answer concise and plain text.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const result = response.data.choices[0].message.content;

    res.json({ result });
  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      error: "AI request failed",
    });
  }
};

export const saveFlow = async (req, res) => {
  try {
    const { prompt, result } = req.body;

    if (!prompt || !result) {
      return res.status(400).json({ error: "Missing data" });
    }

    const newFlow = new Flow({ prompt, result });
    await newFlow.save();

    res.json({ message: "Saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Save failed" });
  }
};
