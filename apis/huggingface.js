import fetch from "node-fetch";

export const tokengenerator = async (req, res) => {
  try {
    const { question, no_ques } = req.body;

    if (!question || !no_ques) {
      return res.status(400).json({ error: "Missing question or number of questions" });
    }

    const prompt = `Generate ${no_ques} MCQ questions on ${question}.`;

    const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGING_API}`,  // ✅ KEY FROM RENDER ONLY
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/Meta-Llama-3-8B-Instruct",   // ✅ safe model
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: "Internal Error", details: err.message });
  }
};
