import fetch from "node-fetch";

export const tokengenerator = async (req, res) => {
  try {
    const { question, no_ques } = req.body;

    if (!question || !no_ques) {
      return res.status(400).json({ error: "Missing question or number of questions" });
    }

    const prompt = `Generate ${no_ques} multiple-choice questions on the topic ${question}. Format the output like this exactly: Question: [question text] A. [option 1] B. [option 2] C. [option 3] D. [option 4] Answer: [Correct option letter] NOTE:Before displaying the answer, check if any answer (or question/option) is in LaTeX format (like \(\frac{x}{2}\) or \sqrt{x}) — if yes, convert it into a normal readable math format (like x/2 or √x) Repeat this format for each question.;`

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
    console.log(data.choices[0].message.content)
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: "Internal Error", details: err.message });
  }
};
